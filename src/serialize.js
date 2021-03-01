// @flow
import Result, { Ok } from 'crocks/Result';
import bichain from 'crocks/pointfree/bichain';
import chain from 'crocks/pointfree/chain';
import constant from 'crocks/combinators/constant';
import ifElse from 'crocks/logic/ifElse';
import isNumber from 'crocks/predicates/isNumber';
import isString from 'crocks/predicates/isString';
import flip from 'crocks/combinators/flip';
import map from 'crocks/pointfree/map';
import sequence from 'crocks/pointfree/sequence';
import traverse from 'crocks/pointfree/traverse';

import { ensure, pipe, wrappedErr } from './util';
import * as util from './util';
import type { PredicateFn } from './util';
import {
  clickAction,
  dragAction,
  noneAction,
  releaseAction,
  waitAction,
  types as actType,
} from './actions';
import type {
  Action,
  Coord,
  ClickAction,
  DragAction,
} from './actions';
import type { Serializer } from './serializer';


type ResultType = typeof Result;

// Returns true if a string is empty, false otherwise
const isEmpty = (str: string | Array<any>): boolean => str.length === 0;
// Returns false if a string is empty, true otherwise
const notEmpty = (str: string | Array<any>): boolean => !isEmpty(str);

// Split a string at newline characters
const splitLines = (str: string): Array<string> => str.split(/\r?\n/);

// Split a string at '|' characters
const splitPipes = (str: string): Array<string> => str.split('|');

const NOX_SEPARATOR = 'ScRiPtSePaRaToR';
// Split strings in an array at Nox macro script separator tokens
const splitSeparators = (arr: Array<string>): Array<string> =>
  arr.flatMap((x) => x.split(NOX_SEPARATOR));

//
const tokenize: (string) => Array<string> = pipe(
    splitPipes,
    splitSeparators,
);


// any -> Err<Array<string>>
const parseErr = wrappedErr('unable to parse');

// string -> Result<Array<string>, number>
const tryParseInt: (string => ResultType) = pipe(
    flip(parseInt)(10),
    ifElse(isNumber, Ok, parseErr),
);

// parse a coordinate from a string array
const parseCoord = (arr: Array<string>): Coord => {
  // TODO: robustness
  return {
    x: parseInt(arr[0], 10),
    y: parseInt(arr[1], 10),
  };
};

const parseCoordErr = wrappedErr('invalid input');

// Array<string> -> Result<string, Coord>
const tryParseCoord: (arr: Array<string>) => ResultType = pipe(
    ifElse((a) => a.length > 1, Ok, parseCoordErr),
    chain(traverse(Result, tryParseInt)),
    map((arr) => ({
      x: arr[0],
      y: arr[1],
    })),
);

// actions
const MOUSE_DOWN = 'MULTI';
const MOUSE_RELEASE = 'MSBRL';
const KB_PRESS = 'KBDPR';
const KB_RELEASE = 'KBDFL';

const MSTATE_DOWN = '1';
const MOD_DRAG = '2';
const MOD_CLICK = '0';

// parse the action segment of a Nox macro string
const parseAction = (str: string): Action => {
  const parts = str.split(':');
  const word = parts.shift();

  switch (word) {
    case MOUSE_DOWN:
      const mouseState = parts.shift();
      if (mouseState === MSTATE_DOWN) {
        // mouse down
        const modifier = parts.shift();
        const coord = parseCoord(parts);

        if (modifier === MOD_CLICK) {
          // mouse down
          return clickAction(coord);
        }
        if (modifier === MOD_DRAG) {
          // mouse drag
          return dragAction(coord);
        }
      }

      return noneAction();

    case MOUSE_RELEASE:
      // mouse release
      return releaseAction();

    case KB_PRESS:
    case KB_RELEASE:
      break;

    default:
      console.log(`unrecognized action ${ word }`);
      throw new Error(`unrecognized action: ${ word }`);
  }

  return noneAction();
};

// convert token array to object
const tokenToObj = (arr: Array<string>): [number, Action, Coord] => {
  if (arr.length != 5) {
    console.log(arr);
    throw new Error(`unable to parse action: ${ JSON.stringify(arr) }`);
  }
  arr = arr.slice();
  // const isKeyboard = arr.shift() === 1;
  arr.shift();
  const resolution = {
    x: parseInt(arr.shift(), 10),
    y: parseInt(arr.shift(), 10),
  };
  const action = parseAction(arr.shift());
  const time = parseInt(arr.shift(), 10);

  return [
    time,
    action,
    resolution,
  ];
};

// attempt to parse an Action from the provided string. returns Ok if
// successful, err otherwise
const tryParseAction: (str: string) => Action = pipe(
    ensure(isString),
    bichain(wrappedErr('tryParseAction expected a string, got: '), Ok),
    map((str) => str.split(':')),
    chain((parts) => {
      const word = parts.shift();
      switch (word) {
        case MOUSE_DOWN:
          const mouseState = parts.shift();
          if (mouseState === MSTATE_DOWN) {
            // mouse down
            const modifier = parts.shift();
            const coord = parseCoord(parts);

            if (modifier === MOD_CLICK) {
              // mouse down
              return Ok(clickAction(coord));
            }
            if (modifier === MOD_DRAG) {
              // mouse drag
              return Ok(dragAction(coord));
            }
          }
          return Ok(noneAction());

        case MOUSE_RELEASE:
          // mouse release
          return Ok(releaseAction());

        case KB_PRESS:
        case KB_RELEASE:
          return Ok(noneAction());

        default:
          return wrappedErr(`unrecognized action:`)(word);
      }
    }),
);

const validTokens: PredicateFn<Array<string>> = (arr) => arr.length === 5;

const tokenErr = wrappedErr('unable to parse action:');

// convert token array to object
const tryTokenToObj: (arr: Array<string>) => ResultType = pipe(
    ifElse(validTokens, Ok, tokenErr),
    map((arr) => arr.slice(1)),
    map((arr) => {
      const resolution = tryParseCoord(arr.splice(0, 2));
      const action = tryParseAction(arr.shift());
      const time = tryParseInt(arr.shift());

      return [
        time,
        action,
        resolution,
      ];
    }),
    chain(sequence(Result)),
);

type ActionGenerator = Generator<Array<[Action, Coord]>, void, Array<string>>;

// Array<string> -> Array<[Action, Coord]>
const actionGenerator = function* (): ActionGenerator {
  let time = 0;
  const result = [];

  while (true) {
    const tokens = yield result.slice();
    result.length = 0;

    pipe(
        constant(tokens),
        tryTokenToObj,
        map(([actionTime, action, resolution]: [number, Action, Coord]) => {
          if (actionTime > time) {
            const duration = actionTime - time;
            result.push([waitAction(duration), resolution]);
            time += duration;
          }

          return [action, resolution];
        }),
        map((a: [Action, Coord]) => result.push(a)),
    )();
  }
};

type ParsedActions = Array<[Action, Coord]>;

// convert line tokens to Actions
const linesToActions = (lines: Array<Array<string>>): ParsedActions => {
  const gen = actionGenerator();
  console.log('gen created');

  return lines.reduce(
      (acc: ParsedActions, tokens: Array<string>) =>
        acc.concat(gen.next(tokens).value || []),
      gen.next().value || [],
  );
};

const tokenizeLines: (Array<string>) => Array<Array<string>> = pipe(
    util.trace('lines'),
    util.filter(notEmpty),
    util.map(tokenize),
    util.trace('tokenize'),
);

// deserialize a Nox macro
const deserialize: (lines: string) => ParsedActions = pipe(
    splitLines,
    tokenizeLines,
    linesToActions,
    util.trace('new linesToActions'),
    util.filter(([a, _]) => a.type !== actType.NONE),
    util.trace('deserialize'),
);

const basicLine = (
    resolution: Coord,
    time: number,
    actionText: string,
): string =>
  `0${ NOX_SEPARATOR }${ [resolution.x, resolution.y, actionText].join('|') }${ NOX_SEPARATOR }${ time }`;

// Serialize mouse down actions to Nox macro format
const mdownLine = (mod: string) => (
    resolution: Coord,
    time: number,
    action: ClickAction | DragAction,
): string => {
  const actionText = [MOUSE_DOWN, MSTATE_DOWN, mod, action.x, action.y].join(':');
  return basicLine(resolution, time, actionText);
};

// Serialize a Click to Nox macro format
const clickLine = mdownLine(MOD_CLICK);

// Serialize a Drag to Nox macro format
const mdragLine = mdownLine(MOD_DRAG);

// Serialize a Mouse Release to Nox macro format
const mreleaseLine = (resolution: Coord, time: number): string => {
  const actionText = [MOUSE_RELEASE, 0, 0].join(':');
  return basicLine(resolution, time, actionText);
};

// serialize Action array to Nox macro format
const serialize = (resolution: Coord, actions: Array<Action>): string => {
  const LINEBREAK = '\r\n';
  let time = 0;

  const res =
  actions.reduce(
      (acc: string, action: Action, ind: number) => {
        const linebreak = acc.length > 0
          ? LINEBREAK
          : '';

        switch (action.type) {
          case actType.CLICK:
            return [acc, clickLine(resolution, time, action)].join(linebreak);

          case actType.MDRAG:
            return [acc, mdragLine(resolution, time, action)].join(linebreak);

          case actType.MRELEASE:
            return [acc, mreleaseLine(resolution, time)].join(linebreak);

          case actType.WAIT:
            time += action.duration;
            break;
        }

        return acc;
      },
      '',
  );

  return res;
};

const noxSerializer = (): Serializer => {
  return Object.assign({}, {
    deserialize,
    serialize,
  });
};

// functions exported for testing
let test;
if (process.env.NODE_ENV === 'dev') {
  test = {
    clickLine,
    isEmpty,
    mreleaseLine,
    mdragLine,
    notEmpty,
    parseAction,
    parseCoord,
    splitLines,
    splitPipes,
    splitSeparators,
    tokenToObj,
    tryTokenToObj,
    tryParseAction,
    tryParseCoord,
    tryParseInt,
  };
}

export {
  deserialize,
  serialize,
  noxSerializer,
  test,
};

import {
  chain,
  Either,
  either,
  fromPredicate,
  left,
  right,
  map,
} from 'fp-ts/Either';
import {
  traverse as arrTraverse,
  map as arrMap,
} from 'fp-ts/Array';
import { sequenceT } from 'fp-ts/lib/Apply';
import { tupled } from 'fp-ts/function';

import {
  filter,
  flow,
  isEmpty,
  isNumber,
  isString,
  pipe,
  PredicateFn,
  wrappedErr,
} from '../util/';
import { WrappedErr } from '../util/wrappedErr';
import {
  clickAction,
  dragAction,
  noneAction,
  releaseAction,
  waitAction,
  types as actType,
  Action,
  Coord,
} from '../types';
import {
  KB_PRESS,
  KB_RELEASE,
  MOD_DRAG,
  MOD_CLICK,
  MOUSE_DOWN,
  MOUSE_RELEASE,
  MSTATE_DOWN,
  NOX_SEPARATOR,
} from './constants';


// Returns false if a string is empty, true otherwise
const notEmpty = (str: string | Array<unknown>): boolean => !isEmpty(str);

// Split a string at newline characters
const splitLines = (str: string): Array<string> => str.split(/\r?\n/);

// Split a string at '|' characters
const splitPipes = (str: string): Array<string> => str.split('|');

// Split strings in an array at Nox macro script separator tokens
const splitSeparators = (arr: Array<string>): Array<string> =>
  arr.flatMap((x) => x.split(NOX_SEPARATOR));

//
const tokenize: (str: string) => Array<string> = flow(
    splitPipes,
    splitSeparators,
);

// unknown -> Array<string>
const parseIntErr = wrappedErr('unable to parse');

// attempt to parse an integer from a string
const tryParseInt = (str: string): Either<WrappedErr, number> => pipe(
    parseInt(str, 10),
    fromPredicate(isNumber, parseIntErr),
);

const parseCoordErr = wrappedErr('invalid input');

// attempt to parse a coordinate from a string array
const tryParseCoord: (arr: Array<string>) => Either<WrappedErr, Coord> = flow(
    fromPredicate((a: Array<string>) => a.length > 1, parseCoordErr),
    chain(arrTraverse(either)(tryParseInt)),
    map((arr: Array<number>) => ({
      x: arr[0],
      y: arr[1],
    })),
);

const coordTo = (fn: (c: Coord) => Action) =>
  chain<WrappedErr, Coord, Action>(flow(
      fn,
      right,
  ));

const mouseDownAction = (parts: Array<string>): Either<WrappedErr, Action> => {
  const mouseState = parts.shift();

  if (mouseState === MSTATE_DOWN) {
    // mouse down
    const modifier = parts.shift();
    const coord = tryParseCoord(parts);

    switch (modifier) {
      case MOD_CLICK:
        // mouse down
        return coordTo(clickAction)(coord);
      case MOD_DRAG:
        // mouse drag
        return coordTo(dragAction)(coord);
    }
  }

  return right(noneAction());
};

// attempt to parse an Action from the provided string. returns Ok if
// successful, err otherwise
const tryParseAction: (str: string) => Either<WrappedErr, Action> = flow(
    fromPredicate(isString, wrappedErr('tryParseAction expected a string, got: ')),
    map((str: string) => str.split(':')),
    chain((parts: Array<string>) => {
      const word = parts.shift();
      switch (word) {
        case MOUSE_DOWN:
          // mouse click or drag
          return mouseDownAction(parts);

        case MOUSE_RELEASE:
          // mouse release
          return right(releaseAction());

        case KB_PRESS:
        case KB_RELEASE:
          // keyboard action
          return right(noneAction());

        default:
          return left(wrappedErr(`unrecognized action:`)(word));
      }
    }),
);

const validTokens: PredicateFn<Array<string>> = (arr) => arr.length === 5;

const tokenErr = wrappedErr('unable to parse action:');

const tryParseTokens = (arr: Array<string>): [
          Either<WrappedErr, number>,
          Either<WrappedErr, Action>,
          Either<WrappedErr, Coord>
      ] => {
  const resolution = tryParseCoord(arr.splice(0, 2));
  const action = tryParseAction(arr.shift() || '');
  const time = tryParseInt(arr.shift() || '');

  return [
    time,
    action,
    resolution,
  ];
};

const sequenceTEither = tupled(sequenceT(either));

type TryTokenObj = (arr: Array<string>) =>
  Either<WrappedErr, [number, Action, Coord]>

// convert token array to object
const tryTokenToObj: TryTokenObj = flow(
    fromPredicate(validTokens, tokenErr),
    map((arr: Array<string>) => arr.slice(1)),
    map(tryParseTokens),
    chain(sequenceTEither),
);

type ActionGenerator = Generator<Array<[Action, Coord]>, void, Array<string>>;

// Array<string> -> Array<[Action, Coord]>
const actionGenerator = function* (): ActionGenerator {
  let time = 0;
  const result: Array<[Action, Coord]> = [];

  while (true) {
    const tokens = yield result.slice();
    result.length = 0;

    pipe(
        tokens,
        tryTokenToObj,
        map(([actionTime, action, resolution]): [Action, Coord] => {
          if (actionTime > time) {
            const duration = actionTime - time;
            result.push([waitAction(duration), resolution]);
            time += duration;
          }

          return [action, resolution];
        }),
        map((a) => result.push(a)),
    );
  }
};

export type ParsedActions = Array<[Action, Coord]>;

// convert line tokens to Actions
const linesToActions = (lines: Array<Array<string>>): ParsedActions => {
  const gen = actionGenerator();

  return lines.reduce(
      (acc: ParsedActions, tokens: Array<string>) =>
        acc.concat(gen.next(tokens).value || []),
      gen.next().value || [],
  );
};

const tokenizeLines: (lines: Array<string>) => Array<Array<string>> = flow(
    filter((str) => !!str.length),
    arrMap(tokenize),
);

// deserialize a Nox macro
const deserialize: (lines: string) => ParsedActions = flow(
    splitLines,
    tokenizeLines,
    linesToActions,
    filter(([a]: [Action, Coord]) => a.type !== actType.NONE),
);

export {
  notEmpty,
  splitLines,
  splitPipes,
  splitSeparators,
  tryTokenToObj,
  tryParseAction,
  tryParseCoord,
  tryParseInt,
  deserialize,
};

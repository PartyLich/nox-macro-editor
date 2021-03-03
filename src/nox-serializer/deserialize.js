// @flow
import Result, { Ok } from 'crocks/Result';
import bichain from 'crocks/pointfree/bichain';
import chain from 'crocks/pointfree/chain';
import constant from 'crocks/combinators/constant';
import ifElse from 'crocks/logic/ifElse';
import isNumber from 'crocks/predicates/isNumber';
import isString from 'crocks/predicates/isString';
import filter from 'crocks/pointfree/filter';
import flip from 'crocks/combinators/flip';
import map from 'crocks/pointfree/map';
import sequence from 'crocks/pointfree/sequence';
import traverse from 'crocks/pointfree/traverse';

import { ensure, pipe, wrappedErr } from '../util';
import {
  clickAction,
  dragAction,
  noneAction,
  releaseAction,
  waitAction,
  types as actType,
} from '../actions';
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

import type { PredicateFn } from '../util/';
import type { Action, Coord } from '../actions';


type ResultType = typeof Result;

// Returns true if a string is empty, false otherwise
const isEmpty = (str: string | Array<mixed>): boolean => str.length === 0;

// Returns false if a string is empty, true otherwise
const notEmpty = (str: string | Array<mixed>): boolean => !isEmpty(str);

// Split a string at newline characters
const splitLines = (str: string): Array<string> => str.split(/\r?\n/);

// Split a string at '|' characters
const splitPipes = (str: string): Array<string> => str.split('|');

// Split strings in an array at Nox macro script separator tokens
const splitSeparators = (arr: Array<string>): Array<string> =>
  arr.flatMap((x) => x.split(NOX_SEPARATOR));

//
const tokenize: (string) => Array<string> = pipe(
    splitPipes,
    splitSeparators,
);


// mixed -> Err<Array<string>>
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
// (arr: Array<string>): Result<[number, Action, Coord]>
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

const tokenizeLines: (Array<string>) => Array<Array<string>> = pipe(
    filter(notEmpty),
    map(tokenize),
);

// deserialize a Nox macro
const deserialize: (lines: string) => ParsedActions = pipe(
    splitLines,
    tokenizeLines,
    linesToActions,
    filter(([a, _]: [Action, Coord]) => a.type !== actType.NONE),
);

export {
  isEmpty,
  notEmpty,
  parseCoord,
  splitLines,
  splitPipes,
  splitSeparators,
  tryTokenToObj,
  tryParseAction,
  tryParseCoord,
  tryParseInt,
  deserialize,
};

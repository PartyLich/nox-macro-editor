// @flow
import { pipe } from './util';
import * as util from './util';
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


// Returns true if a string is empty, false otherwise
export const isEmpty = (str: string | Array<any>): boolean => str.length === 0;
// Returns false if a string is empty, true otherwise
export const notEmpty = (str: string | Array<any>): boolean => !isEmpty(str);

// Split a string at newline characters
export const splitLines = (str: string): Array<string> => str.split(/\r?\n/);

// Split a string at '|' characters
export const splitPipes = (str: string): Array<string> => str.split('|');

const NOX_SEPARATOR = 'ScRiPtSePaRaToR';
// Split strings in an array at Nox macro script separator tokens
export const splitSeparators = (arr: Array<string>): Array<string> =>
  arr.flatMap((x) => x.split(NOX_SEPARATOR));

//
const tokenize: (string) => Array<string> = pipe(
    splitPipes,
    splitSeparators,
);

// parse a coordinate from a string array
const parseCoord = (arr: Array<string>): Coord => {
  // TODO: robustness
  return {
    x: parseInt(arr[0], 10),
    y: parseInt(arr[1], 10),
  };
};

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


// Array<string> -> Array<Action>
function* actionGenerator() {
  let time = 0;
  const result = [];

  while (true) {
    const tokens = yield result.slice();
    result.length = 0;

    const [actionTime, action] = tokenToObj(tokens);

    if (actionTime > time) {
      const duration = actionTime - time;
      result.push(waitAction(duration));
      time += duration;
    }

    result.push(action);
  }
}

// convert line tokens to Actions
const linesToActions = (lines: Array<Array<string>>): Array<Action> => {
  const gen = actionGenerator();
  console.log('gen created');

  return lines.reduce(
      (acc: Array<Action>, tokens: Array<string>) =>
        acc.concat(gen.next(tokens).value || []),
      gen.next().value || [],
  );
};

const tokenizeLines: (Array<string>) => Array<Array<string>> = pipe(
    util.trace('tokenize'),
    util.filter(notEmpty),
    util.map(tokenize),
    util.trace('tokenize'),
);

// deserialize a Nox macro
const deserialize: (lines: string) => Array<Action> = pipe(
    splitLines,
    tokenizeLines,
    linesToActions,
    util.filter((a) => a.type !== actType.NONE),
    util.trace('deserialize'),
);

const basicLine = (
    resolution: Coord,
    time: number,
    actionText: string,
): string =>
  `0${ NOX_SEPARATOR }${ [resolution.x, resolution.y, actionText].join('|') }${ NOX_SEPARATOR }${ time }`;

export const clickLine = (
    resolution: Coord,
    time: number,
    action: ClickAction,
): string => {
  const actionText = [MOUSE_DOWN, MSTATE_DOWN, MOD_CLICK, action.x, action.y].join(':');
  return basicLine(resolution, time, actionText);
};

export const mdragLine = (
    resolution: Coord,
    time: number,
    action: DragAction,
): string => {
  const actionText = [MOUSE_DOWN, MSTATE_DOWN, MOD_DRAG, action.x, action.y].join(':');
  return basicLine(resolution, time, actionText);
};

export const mreleaseLine = (resolution: Coord, time: number): string => {
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

export {
  deserialize,
  serialize,
};

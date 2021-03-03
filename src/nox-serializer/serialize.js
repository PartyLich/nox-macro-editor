// @flow
import {
  types as actType,
} from '../actions';
import {
  MOD_DRAG,
  MOD_CLICK,
  MOUSE_DOWN,
  MOUSE_RELEASE,
  MSTATE_DOWN,
  NOX_SEPARATOR,
} from './constants';

import type {
  Action,
  Coord,
  ClickAction,
  DragAction,
} from '../actions';


const basicLine = (
    resolution: Coord,
    time: number,
    actionText: string,
): string =>
  `0${ NOX_SEPARATOR }${ [resolution.x, resolution.y, actionText].join('|') }${ NOX_SEPARATOR }${ time }`;

type mousedown = (
    Coord,
    number,
    ClickAction | DragAction,
  ) => string;

type signature = (string) => mousedown;

// Serialize mouse down actions to Nox macro format
const mdownLine: signature = (mod: string) => (
    resolution: Coord,
    time: number,
    action: ClickAction | DragAction,
): string => {
  const actionText = [MOUSE_DOWN, MSTATE_DOWN, mod, action.x, action.y].join(':');
  return basicLine(resolution, time, actionText);
};

// Serialize a Click to Nox macro format
const clickLine: mousedown = mdownLine(MOD_CLICK);

// Serialize a Drag to Nox macro format
const mdragLine: mousedown = mdownLine(MOD_DRAG);

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

export {
  clickLine,
  mreleaseLine,
  mdragLine,
  serialize,
};

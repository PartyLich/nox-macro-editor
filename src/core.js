// @flow
import and from 'crocks/logic/and';
import chain from 'crocks/pointfree/chain';
import constant from 'crocks/combinators/constant';
import curry from 'crocks/helpers/curry';
import getProp from 'crocks/Maybe/getProp';
import isNumber from 'crocks/predicates/isNumber';
import maybeToArray from 'crocks/Maybe/maybeToArray';
import merge from 'crocks/pointfree/merge';
import option from 'crocks/pointfree/option';
import pipeK from 'crocks/helpers/pipeK';
import safe from 'crocks/Maybe/safe';
import safeLift from 'crocks/Maybe/safeLift';
import fanout from 'crocks/Pair/fanout';
import isEmpty from 'crocks/predicates/isEmpty';
import not from 'crocks/logic/not';

import {
  types,
  clickAction,
  dragAction,
  releaseAction,
  waitAction,
} from './actions';
import type { Action, Coord } from './actions';
import { deserialize } from './serialize';
import type { ParsedActions } from './serialize';
import { shallowEqual } from './core/';
import {
  inc,
  insert,
  isInBounds,
  map,
  pipe,
} from './util';
import type { PredicateFn } from './util';


const validIndex: PredicateFn<?number> = and(isNumber, isInBounds);

// Update an item in an Action array
const updateAction = (
    index: ?number,
    x: number,
    y: number,
    duration: number,
    arr: Array<Action>,
): Array<Action> => pipe(
    safe(validIndex),
    map((index: number) => {
      const res = arr.slice();
      switch (res[index].type) {
        case types.CLICK:
          res[index] = {
            ...res[index],
            x,
            y,
          };
          break;

        case types.MDRAG:
          res[index] = {
            ...res[index],
            x,
            y,
          };
          break;

        case types.MRELEASE:
          break;

        case types.WAIT:
          res[index] = {
            ...res[index],
            duration,
          };
          break;
      }

      return res;
    }),
    option(arr),
)(index);

const notZero: PredicateFn<number> = (x) => x !== 0;

const scale = (from: number, to: number, num: number): number => pipe(
    safe(and(isNumber, notZero)),
    map((from: number) => to / from),
    map((factor: number) => factor * num),
    option(0),
)(from);

// scale an action from one resolution (`fromRes`) to another (`toRes`)
const scaleAction = (fromRes: Coord, toRes: Coord) =>
  (action: Action): Action => {
    console.log('scaling action');
    switch (action.type) {
      case types.CLICK:
        return {
          ...action,
          x: scale(fromRes.x, toRes.x, action.x),
          y: scale(fromRes.y, toRes.y, action.y),
        };

      case types.MDRAG:
        return {
          ...action,
          x: scale(fromRes.x, toRes.x, action.x),
          y: scale(fromRes.y, toRes.y, action.y),
        };

      default:
        return action;
    }
  };

// ParsedActions -> Maybe<Coord>
const firstResolution = pipeK(
    getProp(0),
    getProp(1),
);

const getResolution: ParsedActions => Coord = pipe(
    firstResolution,
    option({ x: 0, y: 0 }),
);

const getActions: ParsedActions => Array<Action> = pipe(
    map(getProp(0)),
    chain(maybeToArray),
);

// import a macro, inserting its Actions after the selected index
const importFile = (setStateFn: (Array<Action>) => void) => (
    actions: Array<Action>,
    selected: ?number,
    resolution: Coord,
    fileText: string,
) => () => {
  if (!fileText.length) return;

  const ind: number = pipe(
      constant(selected),
      safeLift(isNumber, inc),
      option(actions.length),
  )();

  pipe(
      constant(fileText),
      deserialize,
      fanout(getResolution, getActions),
      merge((importedRes: Coord, importedActions: Array<Action>) => {
        if (!shallowEqual(resolution, importedRes)) {
          return importedActions.map(scaleAction(importedRes, resolution));
        }

        return importedActions;
      }),
      insert(actions, ind),
      setStateFn,
  )();
};

// load a macro, replacing all Actions with the file's content
const loadFile = (
    setActions: (Array<Action>) => void,
    setResolution: (Coord) => void,
    fileText: string,
): void => pipe(
    safe(not(isEmpty)),
    map(deserialize),
    map((actions: ParsedActions) => {
      const [, resolution] = actions[0];
      setResolution(resolution);
      return actions;
    }),
    map(map(([action: Action, _]) => action)),
    map(setActions),
)(fileText);

// add a new click (with mouse release)
const addClick = (coord: Coord, actions: Array<Action>, ind: number) => pipe(
    () => [
      clickAction(coord),
      waitAction(),
      releaseAction(),
    ],
    insert(actions, ind),
)();

// add a new drag (with mouse release)
const addDrag = (coord: Coord, actions: Array<Action>, ind: number) => pipe(
    () => [
      dragAction(coord),
      waitAction(16),
      releaseAction(),
    ],
    insert(actions, ind),
)();

// add a new wait
const addWait = (duration: number, actions: Array<Action>, ind: number) => pipe(
    () => [
      waitAction(duration),
    ],
    insert(actions, ind),
)();

// curry all the things
const cLoadFile: any = curry(loadFile);
const cImportFile: any = curry(importFile);
const cUpdateAction: any = curry(updateAction);
const cAddClick: any = curry(addClick);
const cAddDrag: any = curry(addDrag);
const cAddWait: any = curry(addWait);

// functions exported for testing
let test: {|
  scale: (from: number, to: number, num: number) => number,
|};
if (process.env.NODE_ENV === 'dev') {
  test = {
    scale,
  };
}

export {
  cAddClick as addClick,
  cAddDrag as addDrag,
  cAddWait as addWait,
  cImportFile as importFile,
  cLoadFile as loadFile,
  cUpdateAction as updateAction,
  test,
};

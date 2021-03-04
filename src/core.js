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

import {
  types,
  clickAction,
  dragAction,
  releaseAction,
  waitAction,
} from './actions';
import type { Action, Coord } from './actions';
import { deserialize, type ParsedActions } from './nox-serializer/deserialize';
import { scale, shallowEqual } from './core/';
import { inc, insert, isInBounds, map, pipe } from './util/';
import type { PredicateFn } from './util/';


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
const cImportFile: any = curry(importFile);
const cUpdateAction: any = curry(updateAction);
const cAddClick: any = curry(addClick);
const cAddDrag: any = curry(addDrag);
const cAddWait: any = curry(addWait);

export {
  cAddClick as addClick,
  cAddDrag as addDrag,
  cAddWait as addWait,
  cImportFile as importFile,
  cUpdateAction as updateAction,
};

// @flow
import and from 'crocks/logic/and';
import curry from 'crocks/helpers/curry';
import isNumber from 'crocks/predicates/isNumber';
import option from 'crocks/pointfree/option';
import safe from 'crocks/Maybe/safe';

import {
  types,
  clickAction,
  dragAction,
  releaseAction,
  waitAction,
} from './actions';
import type { Action, Coord } from './actions';
import { insert, isInBounds, map, pipe } from './util/';
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
const cUpdateAction: any = curry(updateAction);
const cAddClick: any = curry(addClick);
const cAddDrag: any = curry(addDrag);
const cAddWait: any = curry(addWait);

export {
  cAddClick as addClick,
  cAddDrag as addDrag,
  cAddWait as addWait,
  cUpdateAction as updateAction,
};

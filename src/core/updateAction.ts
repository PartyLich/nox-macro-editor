import and from 'crocks/logic/and';
import curry from 'crocks/helpers/curry';
import isNumber from 'crocks/predicates/isNumber';
import option from 'crocks/pointfree/option';
import safe from 'crocks/Maybe/safe';

import {
  types,
  Action,
  ClickAction,
  DragAction,
  WaitAction,
} from '../types';
import {
  isInBounds,
  map,
  pipe,
  PredicateFn,
} from '../util/';


const validIndex: PredicateFn<number | null | undefined> =
  and(isNumber, isInBounds);

// Update an item in an Action array
const updateAction = (
    index: number | null | undefined,
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
          res[index] = <ClickAction>{
            ...res[index],
            x,
            y,
          };
          break;

        case types.MDRAG:
          res[index] = <DragAction>{
            ...res[index],
            x,
            y,
          };
          break;

        case types.MRELEASE:
          break;

        case types.WAIT:
          res[index] = <WaitAction>{
            ...res[index],
            duration,
          };
          break;
      }

      return res;
    }),
    option(arr),
)(index);

// curry all the things
const cUpdateAction = curry(updateAction);

export default cUpdateAction;

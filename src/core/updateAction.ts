import { constant, pipe } from 'fp-ts/function';
import { map, getOrElse, fromPredicate as safe } from 'fp-ts/Option';

import {
  types,
  Action,
  ClickAction,
  DragAction,
  WaitAction,
} from '../types';
import { isInBounds, isNumber } from '../util/';


const validIndex = (arr: Array<unknown>) =>
  (val: number | null | undefined): val is number =>
    isNumber(val) && isInBounds(arr)(val);

// Update an item in an Action array
const updateAction = (
    index: number | null | undefined,
    x: number,
    y: number,
    duration: number,
) => (arr: Array<Action>): Array<Action> => pipe(
    index,
    safe(validIndex(arr)),
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
    getOrElse(constant(arr)),
);

export default updateAction;

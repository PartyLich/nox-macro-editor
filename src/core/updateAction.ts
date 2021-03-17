// @flow
import and from 'crocks/logic/and';
import curry from 'crocks/helpers/curry';
import isNumber from 'crocks/predicates/isNumber';
import option from 'crocks/pointfree/option';
import safe from 'crocks/Maybe/safe';

import { types } from '../actions';
import { isInBounds, map, pipe } from '../util/';

import type { Action } from '../actions';
import type { PredicateFn } from '../util/';


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

// curry all the things
const cUpdateAction: any = curry(updateAction);

export default cUpdateAction;

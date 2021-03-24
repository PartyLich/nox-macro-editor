import { flow } from '../util';

import { types, Action, Coord } from '../types';
import { scale } from './';


// scale a number and round the result to the nearest integer
const scaleInt = flow(
    scale,
    Math.round,
);

// scale an action from one resolution (`fromRes`) to another (`toRes`)
const scaleAction = (fromRes: Coord, toRes: Coord) =>
  (action: Action): Action => {
    console.log('scaling action');
    switch (action.type) {
      case types.CLICK:
        // intentional fallthrough
      case types.MDRAG:
        return {
          ...action,
          x: scaleInt(fromRes.x, toRes.x, action.x),
          y: scaleInt(fromRes.y, toRes.y, action.y),
        };

      default:
        return action;
    }
  };

export default scaleAction;

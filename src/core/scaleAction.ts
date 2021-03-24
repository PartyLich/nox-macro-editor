import { types, Action, Coord } from '../types';
import { scale } from './';


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

export default scaleAction;

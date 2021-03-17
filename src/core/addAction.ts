import curry from 'crocks/helpers/curry';

import {
  clickAction,
  dragAction,
  releaseAction,
  waitAction,
  Action,
  Coord,
} from '../types';
import { insert, pipe } from '../util/';


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
const cAddClick = curry(addClick);
const cAddDrag = curry(addDrag);
const cAddWait = curry(addWait);

export {
  cAddClick as addClick,
  cAddDrag as addDrag,
  cAddWait as addWait,
};

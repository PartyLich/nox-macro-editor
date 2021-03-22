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
const addClick = (coord?: Coord) => (actions: Array<Action>) =>
  (ind: number): Array<Action> => pipe(
      [
        clickAction(coord),
        waitAction(),
        releaseAction(),
      ],
      insert(actions, ind),
  );

// add a new drag (with mouse release)
const addDrag = (coord?: Coord) => (actions: Array<Action>) =>
  (ind: number): Array<Action> => pipe(
      [
        dragAction(coord),
        waitAction(16),
        releaseAction(),
      ],
      insert(actions, ind),
  );

// add a new wait
const addWait = (duration?: number) => (actions: Array<Action>) =>
  (ind: number): Array<Action> => pipe(
      [
        waitAction(duration),
      ],
      insert(actions, ind),
  );

// uncurry all the things
const nAddWait = (
    duration: number | undefined,
    actions: Array<Action>,
    ind: number,
): Array<Action> => addWait(duration)(actions)(ind);

const nAddClick = (
    coord: Coord | undefined,
    actions: Array<Action>,
    ind: number,
): Array<Action> => addClick(coord)(actions)(ind);

const nAddDrag = (
    coord: Coord | undefined,
    actions: Array<Action>,
    ind: number,
): Array<Action> => addDrag(coord)(actions)(ind);

export {
  addClick,
  addDrag,
  addWait,
  nAddWait,
  nAddClick,
  nAddDrag,
};

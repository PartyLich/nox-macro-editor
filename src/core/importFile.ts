import { constant, flow, pipe } from 'fp-ts/function';
import { bimap, fst, snd } from 'fp-ts/Tuple';
import { lookup, map as aMap } from 'fp-ts/lib/Array';
import {
  map,
  getOrElse,
  fromPredicate,
  Option,
} from 'fp-ts/Option';

import { types, Action, Coord } from '../types';
import { deserialize, ParsedActions } from '../nox-serializer/deserialize';
import { scale, shallowEqual } from './';
import { isNumber, inc, insert } from '../util/';


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

// try to get the first resolution Coord in the provided ParsedActions
const firstResolution: (actions: ParsedActions) => Option<Coord> = flow(
    lookup(0),
    map(snd),
);

// get the resolution of the provided ParsedActions or return a default Coord
const getResolution: (actions: ParsedActions) => Coord = flow(
    firstResolution,
    getOrElse(constant({ x: 0, y: 0 })),
);

// get the Actions array from the provided ParsedActions
const getActions: (actions: ParsedActions) => Array<Action> = flow(aMap(fst));

// import a macro, inserting its Actions after the selected index
const importFile = (setStateFn: (actions: Array<Action>) => void) => (
    actions: Array<Action>,
    selected: number | null | undefined,
    resolution: Coord,
    fileText: string,
) => (): void => {
  if (!fileText.length) return;

  const ind: number = pipe(
      selected,
      fromPredicate(isNumber),
      map(inc),
      getOrElse(constant(actions.length)),
  );

  pipe(
      fileText,
      deserialize,
      (a): [ParsedActions, ParsedActions] => [a, a],
      bimap(getActions, getResolution),
      ([importedRes, importedActions]) => {
        if (!shallowEqual(resolution, importedRes)) {
          return importedActions.map(scaleAction(importedRes, resolution));
        }

        return importedActions;
      },
      insert(actions, ind),
      setStateFn,
  );
};

export default importFile;

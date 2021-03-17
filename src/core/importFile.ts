import chain from 'crocks/pointfree/chain';
import constant from 'crocks/combinators/constant';
import curry from 'crocks/helpers/curry';
import getProp from 'crocks/Maybe/getProp';
import isNumber from 'crocks/predicates/isNumber';
import maybeToArray from 'crocks/Maybe/maybeToArray';
import merge from 'crocks/pointfree/merge';
import option from 'crocks/pointfree/option';
import pipeK from 'crocks/helpers/pipeK';
import safeLift from 'crocks/Maybe/safeLift';
import fanout from 'crocks/Pair/fanout';

import { types, Action, Coord } from '../types';
import { deserialize, ParsedActions } from '../nox-serializer/deserialize';
import { scale, shallowEqual } from './';
import { inc, insert, map, pipe } from '../util/';


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

const getResolution: (actions: ParsedActions) => Coord = pipe(
    firstResolution,
    option({ x: 0, y: 0 }),
);

const getActions: (actions: ParsedActions) => Array<Action> = pipe(
    map(getProp(0)),
    chain(maybeToArray),
);

// import a macro, inserting its Actions after the selected index
const importFile = (setStateFn: (actions: Array<Action>) => void) => (
    actions: Array<Action>,
    selected: number | null | undefined,
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

// curry all the things
const cImportFile = curry(importFile);

export default cImportFile;

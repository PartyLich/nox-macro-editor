// @flow
import and from 'crocks/logic/and';
import curry from 'crocks/helpers/curry';
import isNumber from 'crocks/predicates/isNumber';
import option from 'crocks/pointfree/option';
import safe from 'crocks/Maybe/safe';
import isEmpty from 'crocks/predicates/isEmpty';

import not from 'crocks/logic/not';

import {
  types,
  clickAction,
  dragAction,
  releaseAction,
  waitAction,
} from './actions';
import type { Action, Coord } from './actions';
import { deserialize } from './serialize';
import type { ParsedActions } from './serialize';
import {
  insert,
  map,
  pipe,
} from './util';
import type { PredicateFn } from './util';


// Update an item in an Action array
const updateAction = (
    index: ?number,
    x: number,
    y: number,
    duration: number,
    arr: Array<Action>,
): Array<Action> => {
  if (
    index == undefined ||
    index < 0 ||
    index >= arr.length
  ) return arr;

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
};

// shallow object comparison. true if `b` contains all the keys of `a` with
// matching values
const shallowEqual = (a: Object, b: Object): boolean => Object.keys(a).reduce(
    (acc: boolean, key: string) => acc && (a[key] === b[key]),
    true,
);

const notZero: PredicateFn<number> = (x) => x !== 0;

const scale = (from: number, to: number, num: number): number => pipe(
    safe(and(isNumber, notZero)),
    map((from: number) => to / from),
    map((factor: number) => factor * num),
    option(0),
)(from);

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
    }

    return action;
  };

// import a macro, inserting its Actions after the selected index
const importFile = (setStateFn: function) => (
    actions: Array<Action>,
    selected: ?number,
    resolution: Coord,
    fileText: string,
) => () => {
  if (!fileText.length) return;

  const ind = (selected == null)
      ? actions.length
      : selected + 1;

  pipe(
      deserialize,
      (_actions) => {
        const importedActions = _actions.map(([action, _]) => action);

        const [, importedRes] = _actions[0];
        if (!shallowEqual(resolution, importedRes)) {
          return importedActions.map(scaleAction(importedRes, resolution));
        }

        return importedActions;
      },
      insert(actions, ind),
      setStateFn,
  )(fileText);
};

// load a macro, replacing all Actions with the file's content
const loadFile = (
    setActions: (Array<Action>) => void,
    setResolution: (Coord) => void,
    fileText: string,
): void => pipe(
    safe(not(isEmpty)),
    map(deserialize),
    map((actions: ParsedActions) => {
      const [, resolution] = actions[0];
      setResolution(resolution);
      return actions;
    }),
    map(map(([action: Action, _]) => action)),
    map(setActions),
)(fileText);

// add a new click (with mouse release)
const addClick = (
    coord: Coord,
    actions: Array<Action>,
    ind: number,
) => {
  const click = Array.of(
      clickAction(coord),
      waitAction(),
      releaseAction(),
  );
  return insert(actions, ind)(click);
};

// add a new drag (with mouse release)
const addDrag = (
    coord: Coord,
    actions: Array<Action>,
    ind: number,
) => {
  const drag = [
    dragAction(coord),
    waitAction(16),
    releaseAction(),
  ];
  return insert(actions, ind)(drag);
};

// add a new wait
const addWait = (duration: number, actions: Array<Action>, ind: number) => {
  const wait = [
    waitAction(duration),
  ];
  return insert(actions, ind)(wait);
};

// curry all the things
const cLoadFile: any = curry(loadFile);
const cImportFile: any = curry(importFile);
const cUpdateAction: any = curry(updateAction);
const cAddClick: any = curry(addClick);
const cAddDrag: any = curry(addDrag);
const cAddWait: any = curry(addWait);

// functions exported for testing
let test: {|
  scale: (from: number, to: number, num: number) => number,
  shallowEqual: (a: any, b: any) => boolean,
|};
if (process.env.NODE_ENV === 'dev') {
  test = {
    scale,
    shallowEqual,
  };
}

export {
  cAddClick as addClick,
  cAddDrag as addDrag,
  cAddWait as addWait,
  cImportFile as importFile,
  cLoadFile as loadFile,
  cUpdateAction as updateAction,
  test,
};

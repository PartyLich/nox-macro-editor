// @flow
const curry = require('fn-curry');

import { types } from './actions';
import type { Action, Coord } from './actions';
import { deserialize } from './serialize';
import {
  insert,
  map,
  pipe,
} from './util';


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
const shallowEqual = (a, b): boolean => Object.keys(a).reduce(
    (acc, key) => a[key] === b[key], true,
);

const scale = (from: number, to: number, num: number): number => {
  const factor = to / from;

  return num * factor;
};

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
const importFile = (setStateFn: function ) => (
    actions: Array<Action>,
    selected: ?number,
    resolution: Coord,
    fileText: string,
) => () => {
  if (!fileText.length) return;

  const ind = (selected === null)
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
    setActions: function,
    setResolution: function,
    fileText: string,
) => () => {
  if (!fileText.length) return;

  pipe(
      deserialize,
      (actions) => {
        const [, resolution] = actions[0];
        setResolution(resolution);
        return actions;
      },
      map(([action, _]) => action),
      setActions,
  )(fileText);
};

// curry all the things
const cLoadFile = curry(loadFile);
const cImportFile = curry(importFile);
const cUpdateAction = curry(updateAction);

export {
  cLoadFile as loadFile,
  cImportFile as importFile,
  cUpdateAction as updateAction,
};

// @flow
import type { Action, Coord } from './actions';
import type { Serializer } from './serializer';

import {
  addClick,
  addDrag,
  addWait,
  importFile,
  updateAction,
} from './core';
import { loadFile } from './core/';
import { pipe, reorder, removeAt } from './util/';
import Pubsub from './pubsub';


export interface Editor {
  actions(): Array<Action>;
  resolution(): Coord;
  addDrag: (coord: Coord) => (index: number) => void;
  addClick: (coord: Coord) => (index: number) => void;
  addWait: (duration: number) => (index: number) => void;
  loadFile(fileText: string): void;
  importFile(fileText: string, index: ?number): void;
  serialize(): string;
  updateAction(x: number, y: number, duration: number, index: ?number): void;
  removeAction(index: number): number;
  reorder(from: number, to: number): void;
  subscribe: (() => void) => (()=>void)
}

type signature = (Serializer) => ((initialState?: Array<Action>) => Editor);

const makeEditor: signature = (serializer) => (initialState = []) => {
  let actions: Array<Action> = initialState.slice();
  let resolution: Coord = { x: 900, y: 1600 };
  const { publish, subscribe } = Pubsub();

  const setActions = (_actions: Array<Action>) => {
    actions = _actions.slice();
    publish();
  };

  const setResolution = (_res: Coord) => {
    resolution = { ..._res };
    publish();
  };

  return Object.assign({}, {
    actions: () => actions.slice(),

    resolution: () => ({ ...resolution }),

    addDrag: (coord) => pipe(
        addDrag(coord, actions),
        setActions,
    ),

    addClick: (coord) => pipe(
        addClick(coord, actions),
        setActions,
    ),

    addWait: (duration) => pipe(
        addWait(duration, actions),
        setActions,
    ),

    loadFile: loadFile(setActions, setResolution),

    importFile: (fileText, index) => {
      if (!actions.length) {
        loadFile(setActions, setResolution, fileText);
        return;
      }

      importFile(setActions)(
          actions,
          index,
          resolution,
          fileText,
      )();
    },

    removeAction: (ind) => {
      setActions(removeAt(ind, actions));
      return ind;
    },

    updateAction: (x, y, duration, index) => pipe(
        updateAction(index, x, y, duration),
        setActions,
    )(actions),

    reorder: (from, to) => {
      setActions(reorder(from, to)(actions));
    },

    serialize: () => serializer.serialize(resolution, actions),

    subscribe,
  });
};

export default makeEditor;

export {
  makeEditor,
};

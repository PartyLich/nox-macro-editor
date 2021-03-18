import { Action, Coord } from './types';
import { Serializer } from './serializer';

import {
  addClick,
  addDrag,
  addWait,
  importFile,
  loadFile,
  updateAction,
} from './core/';
import { pipe, reorder, removeAt } from './util/';
import Pubsub from './pubsub';


export interface Editor {
  actions: () => Array<Action>;
  resolution: () => Coord;
  addDrag: (coord: Coord) => (index: number) => void;
  addClick: (coord: Coord) => (index: number) => void;
  addWait: (duration: number) => (index: number) => void;
  loadFile: (fileText: string) => void;
  importFile: (fileText: string, index: number | null | undefined) => void;
  serialize: () => string;
  updateAction: (
    x: number,
    y: number,
    duration: number,
    index: number | null | undefined
  ) => void;
  removeAction: (index: number) => number;
  reorder: (from: number, to: number) => void;
  subscribe: (fn: () => void) => () => void;
}

type signature = (ser: Serializer) => (initialState?: Array<Action>) => Editor;

const makeEditor: signature = (serializer) => (initialState = []) => {
  let actions: Array<Action> = initialState.slice();
  let resolution: Coord = { x: 900, y: 1600 };
  const { publish, subscribe } = Pubsub<void>();

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

    addDrag: (coord: Coord) => pipe(
        addDrag(coord, actions),
        setActions,
    ),

    addClick: (coord: Coord) => pipe(
        addClick(coord, actions),
        setActions,
    ),

    addWait: (duration: number) => pipe(
        addWait(duration, actions),
        setActions,
    ),

    loadFile: loadFile(setActions, setResolution),

    importFile: (
        fileText: string,
        index: number | null | undefined,
    ) => {
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

    removeAction: (ind: number) => {
      setActions(removeAt(ind, actions));
      return ind;
    },

    updateAction: (
        x: number,
        y: number,
        duration: number,
        index: number | null | undefined,
    ) => pipe(
        updateAction(index, x, y, duration),
        setActions,
    )(actions),

    reorder: (from: number, to: number) => {
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

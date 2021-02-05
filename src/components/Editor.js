// @flow
import React, { useState } from 'react';

import {
  insert,
  map,
  pipe,
  reorder,
  removeAt,
  download,
} from '../util';
import { deserialize, serialize } from '../serialize';
import { ActionList, Controls } from '.';
import { types } from '../actions';
import type { Action, Coord } from '../actions';

import styles from './Editor.module.scss';


// convert file to text on selection
const onFileSelect = (setStateFn: function) => (evt) => {
  const fileList = evt.target.files;
  const file = fileList.item(0);
  if (!file) return;

  file
      .text()
      .then(setStateFn);
};

type UpdateActionType = (?number, number, number, number) => Array<Action>;
// Update an item in an Action array
const updateAction = (arr: Array<Action>): UpdateActionType =>
  (index, x, y, duration) => {
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
  const ind = (selected === null)
      ? actions.length
      : selected + 1;

  pipe(
      deserialize,
      (_actions) => {
        const actions = _actions.map(([action, _]) => action);

        const [, importedRes] = _actions[0];
        if (!shallowEqual(resolution, importedRes)) {
          return actions.map(scaleAction(importedRes, resolution));
        }

        return actions;
      },
      insert(actions, ind),
      setStateFn,
  )(fileText);
};

// load a macro, replacing all Actions with the file's content
const loadFile = (setActions: function, setResolution: function) =>
  (fileText: string) => () => pipe(
      deserialize,
      (actions) => {
        const [, resolution] = actions[0];
        setResolution(resolution);
        return actions;
      },
      map(([action, _]) => action),
      setActions,
  )(fileText);


const Editor = () => {
  const [actions: Array<Action>, setActions] = useState([]);
  const [selected: ?number, setSelected] = useState(null);
  const [fileText: string, setFileText] = useState('');
  const [resolution: Coord, setResolution] = useState({ x: 900, y: 1600 });

  // initiate download of the current Action list
  const saveFile = () => {
    const macro = serialize(resolution, actions);
    const filename = 'nox_macro';
    // it's a text file, but we don't want to add a default .txt extension
    download('application/octet-stream', macro, filename);
  };

  return (
    <>
      <div className={[styles.container, styles.controls].join(' ')}>
        <input type="file" onChange={onFileSelect(setFileText)} />
        <div className={styles.container}>
          <button onClick={loadFile(setActions, setResolution)(fileText)}
          >Load
          </button>
          <button onClick={
            // load if Action list is currently empty
            (!actions.length)
              ? loadFile(setActions, setResolution)(fileText)
              : importFile(setActions)(
                  actions,
                  selected,
                  resolution,
                  fileText,
              )
          }
          >Import
          </button>
          <button onClick={saveFile}
          >Save
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <ActionList {...{
          actions,
          selected,
          setSelected,
          reorder: (from: number, to: number) => {
            setActions(reorder(actions)(from, to));
            setSelected(to);
          },
          remove: (ind: number) => {
            setActions(removeAt(ind, actions));
            const nextItem = Math.min(ind, actions.length - 2);
            setSelected(nextItem);
          },
        }}
        />
        <Controls
          actions={actions}
          selected={selected}
          updateAction={(x, y, duration) => {
            setActions(
                updateAction(actions)(selected, x, y, duration),
            );
          }}
        />
      </div>
    </>
  );
};

export default Editor;

// @flow
import React, { useState } from 'react';

import {
  pipe,
  trace,
  reorder,
  download,
} from '../src/util';
import { deserialize, serialize } from '../src/serialize';
import { ActionList, Controls } from '.';
import { types } from '../src/actions.js';
import type { Action } from '../src/actions.js';

import styles from './Editor.module.scss';


const handleText: (function) => (string) => void = (setStateFn) => pipe(
    trace('handleText'),
    deserialize,
    (result) => {
      setStateFn(result);
      return result;
    },
);

const onFileSelect = (setStateFn) => (evt) => {
  const fileList = evt.target.files;

  fileList.item(0)
      .text()
      .then(handleText(setStateFn));
};

type UpdateActionType = (?number, number, number, number) => Array<Action>;
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


const Editor = () => {
  const [actions: Array<Action>, setActions] = useState([]);
  const [selected: ?number, setSelected] = useState(null);

  const saveFile = () => {
    const resolution = { x: 900, y: 1600 };
    const macro = serialize(resolution, actions);
    const filename = 'nox_macro';
    // it's a text file, but we don't want to add a default .txt extension
    download('application/octet-stream', macro, filename);
  };

  return (
    <>
      <input type="file" onChange={onFileSelect(setActions)} />
      <button
        onClick={ saveFile }
      >Save
      </button>
      <div className={styles.container}>
        <ActionList {...{
          actions,
          selected,
          setSelected,
          reorder: (from: number, to: number) => {
            setActions(reorder(actions)(from, to));
            setSelected(to);
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

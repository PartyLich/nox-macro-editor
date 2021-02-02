// @flow
import React, { useState } from 'react';

import {
  insert,
  pipe,
  reorder,
  download,
} from '../util';
import { deserialize, serialize } from '../serialize';
import { ActionList, Controls } from '.';
import { types } from '../actions';
import type { Action } from '../actions';

import styles from './Editor.module.scss';


const onFileSelect = (setStateFn) => (evt) => {
  const fileList = evt.target.files;
  const file = fileList.item(0);
  if (!file) return;

  file
      .text()
      .then(setStateFn);
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

// import a macro, inserting its Actions after the selected index
const importFile = (setStateFn: function ) =>
  (actions: Array<Action>, selected: ?number, fileText: string ) => () => {
    const ind = (selected === null)
      ? actions.length
      : selected + 1;

    pipe(
        deserialize,
        insert(actions, ind),
        setStateFn,
    )(fileText);
  };

// load a macro, replacing all Actions with the file's content
const loadFile = (setStateFn: function) => (fileText: string) => () => pipe(
    deserialize,
    setStateFn,
)(fileText);


const Editor = () => {
  const [actions: Array<Action>, setActions] = useState([]);
  const [selected: ?number, setSelected] = useState(null);
  const [fileText: string, setFileText] = useState('');

  const saveFile = () => {
    const resolution = { x: 900, y: 1600 };
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
          <button onClick={loadFile(setActions)(fileText)}
          >Load
          </button>
          <button onClick={importFile(setActions)(actions, selected, fileText)}
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

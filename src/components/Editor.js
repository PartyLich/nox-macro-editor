// @flow
import React, { useState } from 'react';

import {
  importFile,
  loadFile,
  updateAction,
} from '../core';
import {
  pipe,
  reorder,
  removeAt,
  download,
} from '../util';
import { serialize } from '../serialize';
import { ActionList, Controls } from '.';
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
          <button onClick={pipe(
              loadFile(setActions, setResolution)(fileText),
              setSelected,
          )}
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
            setActions(reorder(from, to)(actions));
            setSelected(to);
          },
          remove: (ind: number) => {
            setActions(removeAt(ind, actions));
            const nextItem = Math.min(ind, actions.length - 2);
            setSelected(nextItem);
          },
        }}
        />
        <Controls {...{
          actions,
          resolution,
          selected,
          updateAction: (x, y, duration) => {
            setActions(
                updateAction(actions)(selected, x, y, duration),
            );
          },
        }}
        />
      </div>
    </>
  );
};

export default Editor;

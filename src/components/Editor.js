// @flow
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SaveIcon from '@material-ui/icons/Save';

import {
  importFile,
  loadFile,
  updateAction,
  addClick,
  addDrag,
  addWait,
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

  // load macro then reset selection
  const loadHandler = pipe(
      loadFile(setActions, setResolution)(fileText),
      setSelected,
  );

  // load if Action list is currently empty
  const importHandler = (!actions.length)
              ? loadFile(setActions, setResolution)(fileText)
              : importFile(setActions)(
                  actions,
                  selected,
                  resolution,
                  fileText,
              );

  const getIndex = () => (selected == null)
      ? actions.length
      : selected + 1;

  const addClickHandler = (coord: Coord) => pipe(
      getIndex,
      addClick(coord, actions),
      setActions,
  );

  const addDragHandler = (coord: Coord) => pipe(
      getIndex,
      addDrag(coord, actions),
      setActions,
  );

  const addWaitHandler = (duration: number) => pipe(
      getIndex,
      addWait(duration, actions),
      setActions,
  );

  return (
    <>
      <div className={[styles.container, styles.controls].join(' ')}>
        <div>
          <input type="file" onChange={onFileSelect(setFileText)} />
        </div>
        <div className={styles.container}>
          <Button
            color="primary"
            onClick={loadHandler}
            variant="contained"
            size="small"
            startIcon={<InsertDriveFileIcon />}
          >Load
          </Button>
          <Box >
            <Button
              color="primary"
              onClick={importHandler}
              variant="contained"
              size="small"
              startIcon={<AddToPhotosIcon />}
            >Import
            </Button>
          </Box>
          <Box >
            <Button
              color="primary"
              onClick={saveFile}
              variant="contained"
              size="small"
              startIcon={<SaveIcon />}
            >Save
            </Button>
          </Box>
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
          updateAction: (x, y, duration) => pipe(
              updateAction(selected, x, y, duration),
              setActions,
          )(actions),
          addClick: addClickHandler,
          addWait: addWaitHandler,
          addDrag: addDragHandler,
        }}
        />
      </div>
    </>
  );
};

export default Editor;

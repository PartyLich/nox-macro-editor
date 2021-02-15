// @flow
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

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
import { ActionList, Controls, FileControls } from '.';
import type { Action, Coord } from '../actions';


// convert file to text on selection
const onFileSelect = (setStateFn: function) => (evt) => {
  const fileList = evt.target.files;
  const file = fileList.item(0);
  if (!file) {
    // reset file state
    setStateFn({
      text: '',
      name: '',
    });
    return;
  }

  file
      .text()
      .then((text) => setStateFn({
        text,
        name: file.name,
      }));
};


const Editor = () => {
  const [actions: Array<Action>, setActions] = useState([]);
  const [selected: ?number, setSelected] = useState(null);
  const [file: {text: string, name: string}, setFile] = useState({ text: '', name: '' });
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
      loadFile(setActions, setResolution)(file.text),
      setSelected,
  );

  // load if Action list is currently empty
  const importHandler = (!actions.length)
              ? loadFile(setActions, setResolution)(file.text)
              : importFile(setActions)(
                  actions,
                  selected,
                  resolution,
                  file.text,
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

  const handleRemove = (ind: number) => {
    setActions(removeAt(ind, actions));
    const nextItem = Math.min(ind, actions.length - 2);
    setSelected(nextItem);
  };

  const handleReorder = (from: number, to: number) => {
    setActions(reorder(from, to)(actions));
    setSelected(to);
  };

  const handleUpdate = (x, y, duration) => pipe(
      updateAction(selected, x, y, duration),
      setActions,
  )(actions);

  return (
    <>
      <FileControls {...{
        filename: file.name,
        onFileSelect: onFileSelect(setFile),
        handleLoad: loadHandler,
        handleImport: importHandler,
        saveFile,
      }}
      />
      <Grid
        container
        alignItems="flex-start"
        direction="row"
        spacing={2}
        wrap="nowrap"
      >
        <Grid item xs={10}>
          <ActionList {...{
            actions,
            selected,
            setSelected,
            reorder: handleReorder,
            remove: handleRemove,
          }}
          />
        </Grid>
        <Grid item xs={10}>
          <Controls {...{
            actions,
            resolution,
            selected,
            updateAction: handleUpdate,
            addClick: addClickHandler,
            addWait: addWaitHandler,
            addDrag: addDragHandler,
          }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Editor;

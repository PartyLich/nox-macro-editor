// @flow
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import {
  pipe,
  download,
} from '../util';
import { ActionList, Controls, FileControls } from '.';
import type { Action, Coord } from '../actions';
import type { Editor as EditorType } from '../editor';


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


type Props = {
  editor: EditorType,
  actions: Array<Action>,
  resolution: Coord,
  update: () => void,
};

const Editor = ({
  editor,
  actions,
  resolution,
  update,
}: Props) => {
  const [selected: ?number, setSelected] = useState(null);
  const [file: {text: string, name: string}, setFile] = useState({ text: '', name: '' });

  // initiate download of the current Action list
  const saveFile = () => {
    const macro = editor.serialize();
    const filename = 'nox_macro';
    // it's a text file, but we don't want to add a default .txt extension
    download('application/octet-stream', macro, filename);
  };

  // load macro then reset selection
  const handleLoad = pipe(
      () => editor.loadFile(file.text),
      setSelected,
      update,
  );

  const handleImport = pipe(
      () => editor.importFile(file.text, selected),
      update,
  );

  const getIndex = () => (selected == null)
      ? actions.length
      : selected + 1;

  const handleAddClick = (coord: Coord) => pipe(
      getIndex,
      editor.addClick(coord),
      update,
  );

  const handleAddDrag = (coord: Coord) => pipe(
      getIndex,
      editor.addDrag(coord),
      update,
  );

  const handleAddWait = (duration: number) => pipe(
      getIndex,
      editor.addWait(duration),
      update,
  );

  const getNextItem = (ind: number) => Math.min(ind, actions.length - 2);

  type HandleRemove = (ind: number) => void;

  const handleRemove: HandleRemove = pipe(
      editor.removeAction,
      getNextItem,
      setSelected,
      update,
  );

  const handleReorder = (from: number, to: number) => {
    editor.reorder(from, to);
    setSelected(to);
    update();
  };

  const handleUpdate = (x, y, duration) =>
    editor.updateAction(x, y, duration, selected);

  return (
    <>
      <FileControls {...{
        filename: file.name,
        onFileSelect: onFileSelect(setFile),
        handleLoad,
        handleImport,
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
            addClick: handleAddClick,
            addWait: handleAddWait,
            addDrag: handleAddDrag,
          }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Editor;

import * as React from 'react';
import { useState, ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';

import { download, flow } from '../util/';
import { ActionList, Controls, FileControls } from '.';
import { Action, Coord } from '../types';
import { Editor as EditorType } from '../editor';


type FileState = {
  text: string;
  name: string;
};

// convert file to text on selection
const onFileSelect = (setStateFn: (state: FileState) => void) =>
  (evt: React.SyntheticEvent<HTMLInputElement>) => {
    const fileList = evt.currentTarget.files;
    const file = fileList?.item(0);

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
  editor: EditorType;
  actions: Array<Action>;
  resolution: Coord;
};

type signature = (props: Props) => ReactElement;

const Editor: signature = ({
  editor,
  actions,
  resolution,
}) => {
  const [selected, setSelected] = useState<number | null | undefined>(null);
  const [file, setFile] = useState<FileState>({ text: '', name: '' });

  // initiate download of the current Action list
  const saveFile = () => {
    const macro = editor.serialize();
    const filename = 'nox_macro';
    // it's a text file, but we don't want to add a default .txt extension
    download('application/octet-stream', macro, filename);
  };

  // load macro then reset selection
  const handleLoad: () => void = flow(
      (): undefined => {
        editor.loadFile(file.text);
        // because loadFile is a void function... -_-
        return;
      },
      setSelected,
  );

  const handleImport = () => editor.importFile(file.text, selected);

  const getIndex = () => (selected == null)
      ? actions.length
      : selected + 1;

  const handleAddClick = (coord: Coord) => flow(
      getIndex,
      editor.addClick(coord),
  );

  const handleAddDrag = (coord: Coord) => flow(
      getIndex,
      editor.addDrag(coord),
  );

  const handleAddWait = (duration: number) => flow(
      getIndex,
      editor.addWait(duration),
  );

  const getNextItem = (ind: number) => Math.min(ind, actions.length - 2);

  type HandleRemove = (ind: number) => void;

  const handleRemove: HandleRemove = flow(
      editor.removeAction,
      getNextItem,
      setSelected,
  );

  const handleReorder = (from: number, to: number) => {
    editor.reorder(from, to);
    setSelected(to);
  };

  const handleUpdate = (x: number, y: number, duration: number) =>
    editor.updateAction(x, y, duration, selected);

  const handleResChange = (res: Coord) => () => {
    editor.changeResolution(res);
  };

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
            updateResolution: handleResChange,
          }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Editor;

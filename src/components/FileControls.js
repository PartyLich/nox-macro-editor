// @flow
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SaveIcon from '@material-ui/icons/Save';

import { ConfirmDialog, FileInput } from '.';
import { pipe } from '../util';

import styles from './FileControls.module.scss';


type Props = {
  filename: string,
  onFileSelect: function,
  handleLoad: () => void,
  handleImport: () => void,
  saveFile: () => void,
};

const FileControls = ({
  filename,
  onFileSelect,
  handleLoad,
  handleImport,
  saveFile,
}: Props) => {
  const DESCRIPTION = `Loading the selected file will overwrite any macro currently in the editor.`;
  const TITLE = 'Replace the current macro?';
  const [isAlertOpen, setAlertOpen] = useState(false);

  const closeAlert = () => setAlertOpen(false);

  const openAlert = () => setAlertOpen(true);

  const loadFile = pipe(
      handleLoad,
      closeAlert,
  );

  const noop = () => null;

  return (
    <div className={[styles.container, styles.controls].join(' ')}>
      <FileInput onChange={onFileSelect} />
      {Boolean(filename) &&
        <Typography variant="subtitle1">{filename}</Typography>
      }
      <div className={styles.container}>
        <Button
          color="primary"
          onClick={(filename) ? openAlert : noop}
          variant="contained"
          size="small"
          startIcon={<InsertDriveFileIcon />}
        >Load
        </Button>
        <Box >
          <Button
            color="primary"
            onClick={(filename) ? handleImport : noop}
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
      <ConfirmDialog
        title={TITLE}
        description={DESCRIPTION}
        handleYes={loadFile}
        handleNo={closeAlert}
        open={isAlertOpen}
      />
    </div>
  );
};

export default FileControls;

import * as React from 'react';
import { ReactElement, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SaveIcon from '@material-ui/icons/Save';

import { ConfirmDialog, FileInput } from '.';
import { flow } from '../util/';

import styles from './FileControls.module.scss';


type Props = {
  filename: string;
  onFileSelect: (evt: React.SyntheticEvent<HTMLInputElement>) => void;
  handleLoad: () => void;
  handleImport: () => void;
  saveFile: () => void;
};

type signature = (props: Props) => ReactElement<'div'>;

const FileControls: signature = ({
  filename,
  onFileSelect,
  handleLoad,
  handleImport,
  saveFile,
}) => {
  const DESCRIPTION = `Loading the selected file will overwrite any macro currently in the editor.`;
  const TITLE = 'Replace the current macro?';
  const [isAlertOpen, setAlertOpen] = useState(false);

  const closeAlert = () => setAlertOpen(false);

  const openAlert = () => setAlertOpen(true);

  const loadFile: () => void = flow(
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

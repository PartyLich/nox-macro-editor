// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useId } from 'react-id-generator';


type Props = {
  description: string,
  handleYes: () => void,
  handleNo: () => void,
  open: boolean,
  title: string,
};

const ConfirmDialog = ({
  description,
  handleYes,
  handleNo,
  open,
  title,
}: Props) => {
  const [titleId] = useId();
  const [descriptionId] = useId();

  return (
    <Dialog
      open={open}
      onClose={handleNo}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <DialogTitle
        id={titleId}
      >{title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id={descriptionId}
        >{description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleNo}
          color="primary"
        >Disagree
        </Button>
        <Button
          onClick={handleYes}
          color="primary"
          autoFocus
        >Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

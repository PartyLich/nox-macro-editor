// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
  return (
    <Dialog
      open={open}
      onClose={handleNo}
      // TODO: generate unique ids for accessibility
      // aria-labelledby={uniqueTitleId}
      // aria-describedby={uniqueDescId}
    >
      <DialogTitle
        // id={uniqueTitleId}
      >{title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          // id={uniqueDescId}
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

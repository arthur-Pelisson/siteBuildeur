'use client'

import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = ({message, title, btnOk, btnRefuse, callbackResponse, openDial}: any) => {
  const [open, setOpen] = React.useState(openDial);

  useEffect(() => {
    setOpen(openDial);
  }, [openDial])


  const handleClose = (res: boolean) => {
    console.log("res : ", res);
    callbackResponse(res);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>{btnRefuse}</Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            {btnOk}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AlertDialog;
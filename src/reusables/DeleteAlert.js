import React from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Slide
} from "@material-ui/core";

class DeleteAlert extends React.Component {
  render() {
    const { alertTitle, open, handleClose, handleYesAction } = this.props;
    return (
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{alertTitle}</DialogTitle>
        <DialogActions>
          <Button onClick={handleYesAction} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteAlert;

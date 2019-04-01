import React from "react";
import { Snackbar } from "@material-ui/core";
import MySnackbarContent from "../reusables/MySnackbarContent";

class MMLSnackbar extends React.Component {
  render() {
    const { open, hideDuration, handleClose, variant, message } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={hideDuration}
        onClose={handleClose}
      >
        <MySnackbarContent
          onClose={this.handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    );
  }
}

export default MMLSnackbar;

import React from "react";

import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

import {
  Modal,
  Slide,
  withStyles,
  Typography,
  Paper,
  IconButton
} from "@material-ui/core";
import styles from "../reusables/Styles";

function getModalStyle() {
  const top = 20;
  const left = 30;

  return {
    top: `${top}%`,
    margin: "auto",
    left: `${left}%`
  };
}

class MMLModal extends React.Component {
  render() {
    const {
      modalOpen,
      handleModalClose,
      classes,
      title,
      children
    } = this.props;
    console.log(modalOpen);
    return (
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        className={classes.paper}
        style={{
          justifyContent: "center",
          overflow: "scroll"
        }}
      >
        <Slide direction="up" in={modalOpen} mountOnEnter unmountOnExit>
          <Paper style={getModalStyle()}>
            <span
              style={{
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              <IconButton onClick={handleModalClose}>
                <Icon path={mdiClose} size={1} />
              </IconButton>
            </span>
            {children}
          </Paper>
        </Slide>
      </Modal>
    );
  }
}

export default withStyles(styles)(MMLModal);

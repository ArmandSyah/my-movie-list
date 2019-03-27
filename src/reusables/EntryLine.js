import React from "react";

import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { Grid, TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./Styles";

class EntryLine extends React.Component {
  render() {
    const { icon, ...children } = this.props;
    return (
      <Grid spacing={16} container alignItems={"center"}>
        <Grid item xs={1}>
          <Icon path={icon} />
        </Grid>
        <Grid item xs={11}>
          <TextField {...children} />
        </Grid>
      </Grid>
    );
  }
}

EntryLine.propTypes = {
  classes: PropTypes.object.isRequired,
  entryLineType: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default withStyles(styles)(EntryLine);

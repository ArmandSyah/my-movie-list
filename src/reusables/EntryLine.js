import React from "react";

import PropTypes from "prop-types";
import Icon from "@mdi/react";
import { Grid, TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./Styles";

class EntryLine extends React.Component {
  render() {
    const { icon, children } = this.props;
    return (
      <Grid spacing={16} container alignItems={"center"}>
        <Grid item xs={1}>
          <Icon path={icon} />
        </Grid>
        <Grid item xs={11}>
          <TextField
            {...children}
            //   id="email"
            //   name="email"
            //   label="Enter Your Email Address"
            //   margin="normal"
            //   variant="filled"
            //   value={email}
            //   onChange={this.handleEmailChange}
            //   onFocus={this.handleEmailFocus}
            //   onBlur={this.handleEmailBlur}
            //   error={!emailValid && email.length > 0 && !emailFocus}
            //   helperText={emailHelpMessage}
            //   fullWidth
            //   required
          />
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

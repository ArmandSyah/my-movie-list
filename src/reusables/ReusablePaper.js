import React from "react";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./Styles";

class ReusablePaper extends React.Component {
  render() {
    const { children, classes } = this.props;
    return <Paper className={classes.paper}>{children}</Paper>;
  }
}

export default withStyles(styles)(ReusablePaper);

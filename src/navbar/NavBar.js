import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { Search, PersonAdd, ExitToApp } from "@material-ui/icons";

import IconButton from "@material-ui/core/IconButton";

import styles from "../reusables/Styles";

class NavBar extends React.Component {
  render() {
    const { classes, handleCurrentPageChange } = this.props;
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Button onClick={handleCurrentPageChange("home")}>
              <Typography variant="title" color="inherit">
                MyMovieList
              </Typography>
            </Button>

            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
              <Tooltip title="Browse">
                <IconButton>
                  <Search style={{ paddingRight: "2px" }} />
                  Browse
                </IconButton>
              </Tooltip>

              <Tooltip title="Login">
                <IconButton onClick={handleCurrentPageChange("login")}>
                  <ExitToApp style={{ paddingRight: "2px" }} />
                  Login
                </IconButton>
              </Tooltip>

              <Tooltip title="Sign Up">
                <IconButton onClick={handleCurrentPageChange("signup")}>
                  <PersonAdd style={{ paddingRight: "2px" }} />
                  Sign up
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(NavBar);

// {/* {revealIcons && (

//             )} */}

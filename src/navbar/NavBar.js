import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import {
  Search,
  PersonAdd,
  ExitToApp,
  ViewList,
  PowerSettingsNew
} from "@material-ui/icons";

import IconButton from "@material-ui/core/IconButton";

import styles from "../reusables/Styles";

class NavBar extends React.Component {
  renderTooltipsNotLoggedIn() {
    const { classes, handleCurrentPageChange } = this.props;
    return (
      <div className={classes.sectionDesktop}>
        <Tooltip title="Browse">
          <IconButton
            onClick={handleCurrentPageChange("browse")}
            className={classes.navbarTooltip}
          >
            <Search style={{ paddingRight: "2px" }} />
            Browse
          </IconButton>
        </Tooltip>

        <Tooltip title="Login">
          <IconButton
            onClick={handleCurrentPageChange("login")}
            className={classes.navbarTooltip}
          >
            <ExitToApp style={{ paddingRight: "2px" }} />
            Login
          </IconButton>
        </Tooltip>

        <Tooltip title="Sign Up">
          <IconButton
            onClick={handleCurrentPageChange("signup")}
            className={classes.navbarTooltip}
          >
            <PersonAdd style={{ paddingRight: "2px" }} />
            Sign up
          </IconButton>
        </Tooltip>
      </div>
    );
  }

  renderTooltipsLoggedIn() {
    const {
      classes,
      handleCurrentPageChange,
      handleLogout,
      currentUser
    } = this.props;
    return (
      <div className={classes.sectionDesktop}>
        <Tooltip title="MyList">
          <IconButton
            onClick={handleCurrentPageChange("mylist")}
            className={classes.navbarTooltip}
          >
            <ViewList style={{ paddingRight: "2px" }} />
            MyList
          </IconButton>
        </Tooltip>
        <Tooltip title="Browse">
          <IconButton
            onClick={handleCurrentPageChange("browse")}
            className={classes.navbarTooltip}
          >
            <Search style={{ paddingRight: "2px" }} />
            Browse
          </IconButton>
        </Tooltip>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <Typography variant="title">
            Hello, {`${currentUser.username}:`}
          </Typography>
          <Tooltip title="Log out">
            <IconButton
              onClick={handleLogout}
              className={classes.navbarTooltip}
            >
              <PowerSettingsNew style={{ paddingRight: "2px" }} />
              Log out
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }

  render() {
    const { classes, handleCurrentPageChange, isLoggedIn } = this.props;
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar style={{ display: "flex", flexDirection: "row" }}>
            <Button
              onClick={handleCurrentPageChange("home")}
              style={{ borderRadius: "0px", borderRight: "0.15em solid black" }}
            >
              <Typography variant="title" color="inherit">
                MyMovieList
              </Typography>
            </Button>

            {/* <div className={classes.grow} /> */}
            <div style={{ flexGrow: 1 }}>
              {isLoggedIn
                ? this.renderTooltipsLoggedIn()
                : this.renderTooltipsNotLoggedIn()}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(NavBar);

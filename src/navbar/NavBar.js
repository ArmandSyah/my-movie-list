import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { TextField, InputAdornment, Menu, MenuItem } from "@material-ui/core";
import {
  Search,
  PersonAdd,
  ExitToApp,
  ViewList,
  AccountCircle
} from "@material-ui/icons";

import IconButton from "@material-ui/core/IconButton";

import styles from "../reusables/Styles";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    const { currentSearchText } = this.props;
    this.state = {
      searchValue: currentSearchText,
      anchorEl: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { currentSearchText } = props;
    return { searchValue: currentSearchText };
  }

  handleProfileIconClick = event => {
    console.log("Profile cliock");
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogoutAction = () => {
    const { handleLogout } = this.props;
    handleLogout();
    this.handleClose();
  };

  handleSearchOnChange = event => {
    this.setState({
      searchValue: event.target.value
    });
  };

  renderTooltipsNotLoggedIn() {
    const { searchValue } = this.state;
    const {
      classes,
      handleCurrentPageChange,
      handleSearchFromNavbar,
      handleEnteringSearchText
    } = this.props;
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

        <div
          style={{
            alignSelf: "center",
            flex: 1,
            display: "flex",
            justifyItems: "center"
          }}
        >
          <TextField
            id="search-field"
            variant="filled"
            type="text"
            value={searchValue}
            onChange={handleEnteringSearchText}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchFromNavbar(searchValue)}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              )
            }}
            style={{
              paddingLeft: "10px",
              paddingTop: "10px",
              paddingBottom: "10px"
            }}
          />
        </div>
      </div>
    );
  }

  renderTooltipsLoggedIn() {
    const { searchValue, anchorEl } = this.state;
    const {
      classes,
      handleCurrentPageChange,
      currentUser,
      handleSearchFromNavbar,
      handleEnteringSearchText
    } = this.props;
    return (
      <div className={classes.sectionDesktop}>
        <Tooltip title="MyList">
          <IconButton
            onClick={handleCurrentPageChange("myList")}
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
            alignSelf: "center",
            flex: 1,
            display: "flex",
            justifyItems: "center"
          }}
        >
          <TextField
            id="search-field"
            variant="filled"
            type="text"
            value={searchValue}
            onChange={handleEnteringSearchText}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchFromNavbar(searchValue)}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              )
            }}
            style={{
              paddingLeft: "10px",
              paddingTop: "10px",
              paddingBottom: "10px"
            }}
          />
        </div>

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
            Hello, {`${currentUser.username}`}
          </Typography>
          <IconButton onClick={this.handleProfileIconClick}>
            <AccountCircle style={{ paddingRight: "2px" }} />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleLogoutAction}>Log Out</MenuItem>
          </Menu>
        </div>
      </div>
    );
  }

  render() {
    const { handleCurrentPageChange, isLoggedIn } = this.props;
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

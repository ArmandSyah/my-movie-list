import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { mdiLockQuestion, mdiAccount } from "@mdi/js";

import styles from "../reusables/Styles";
import ReusablePaper from "../reusables/ReusablePaper";
import EntryLine from "../reusables/EntryLine";

import MMLSnackbar from "../snackbar/MMLSnackbar";

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    open: false,
    failedLogin: false,
    lingerFailedState: false
  };

  handleUsernameChange = e => {
    const username = e.target.value;

    this.setState({
      username: username
    });
  };

  handlePasswordChange = e => {
    const password = e.target.value;

    this.setState({
      password: password
    });
  };

  handleLoginClick = event => {
    const { username, password } = this.state;
    const { handleLogin, users } = this.props;
    const foundUsers = users.filter(
      user => user.username === username && user.password === password
    );
    if (foundUsers.length <= 0) {
      this.setState({ failedLogin: true, open: true, lingerFailedState: true });
      event.preventDefault();
      return;
    }
    const foundUser = foundUsers[0];
    handleLogin(foundUser.id)(event);
  };

  handleClose = reason => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false, failedLogin: false });
  };

  handleOnFocus = () => {
    this.setState({ lingerFailedState: false });
  };

  renderEntryFields() {
    const { username, password, lingerFailedState } = this.state;
    return (
      <div>
        <EntryLine
          icon={mdiAccount}
          id="username"
          name="username"
          label="Enter Your Username"
          margin="normal"
          variant="filled"
          value={username}
          error={lingerFailedState}
          onChange={this.handleUsernameChange}
          onFocus={this.handleOnFocus}
          fullWidth
          required
        />

        <EntryLine
          icon={mdiLockQuestion}
          id="password"
          name="password"
          type="password"
          label="Enter Your Password"
          margin="normal"
          variant="filled"
          value={password}
          error={lingerFailedState}
          onChange={this.handlePasswordChange}
          onFocus={this.handleOnFocus}
          fullWidth
          required
        />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { username, password, failedLogin, open } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <ReusablePaper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login to MyMovieList
          </Typography>

          <form className={classes.form}>
            {this.renderEntryFields()}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={username.length === 0 || password.length === 0}
              onClick={this.handleLoginClick}
              className={classes.submit}
            >
              Log in
            </Button>
          </form>
        </ReusablePaper>
        {failedLogin && (
          <MMLSnackbar
            open={open}
            hideDuration={2500}
            handleClose={this.handleClose}
            variant={"error"}
            message={"Log in failed. Username or Password incorrect"}
          />
        )}
      </main>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);

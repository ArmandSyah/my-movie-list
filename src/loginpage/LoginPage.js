import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { mdiLockQuestion, mdiAccount } from "@mdi/js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import styles from "../reusables/Styles";
import ReusablePaper from "../reusables/ReusablePaper";
import EntryLine from "../reusables/EntryLine";

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    usernameValid: false,
    usernameHelpMessage: "Type in a proper username",
    passwordValid: false,
    passwordHelpMessage:
      "Password must contain at least 8 characters minimum, 1 upper case, and at least 1 digit"
  };

  handleUsernameChange = e => {
    let { usernameValid, usernameHelpMessage } = this.state;
    const username = e.target.value;

    usernameValid = username.length > 0;

    if (usernameValid) {
      usernameHelpMessage = "Email is properly formatted";
    } else {
      usernameHelpMessage =
        "Type a proper email address (ex: example@test.com)";
    }

    this.setState({
      username: username,
      usernameValid: usernameValid,
      usernameHelpMessage: usernameHelpMessage
    });
  };

  handleUsernameFocus = e => {
    this.setState({ usernameFocus: true });
  };

  handleUsernameBlur = e => {
    this.setState({ usernameFocus: false });
  };

  handlePasswordChange = e => {
    let { passwordValid, passwordHelpMessage } = this.state;
    const password = e.target.value;

    passwordValid = passwordRegex.test(password);

    if (passwordValid) {
      passwordHelpMessage = "Password is valid";
    } else {
      if (password.length < 8) {
        passwordHelpMessage =
          "Password is currently less than the required 8 characters";
      } else if (!/^(?=.*[A-Z])/.test(password)) {
        passwordHelpMessage =
          "Password does not contain the required 1 uppercase letter";
      } else if (!/^(?=.*[0-9])/.test(password)) {
        passwordHelpMessage = "Password does not contain the required 1 digit";
      }
    }

    this.setState({
      password: password,
      passwordValid: passwordValid,
      passwordHelpMessage: passwordHelpMessage
    });
  };

  handlePasswordFocus = e => {
    this.setState({ passwordFocus: true });
  };

  handlePasswordBlur = e => {
    this.setState({ passwordFocus: false });
  };

  renderEntryFields() {
    const {
      username,
      usernameHelpMessage,
      usernameValid,
      usernameFocus,
      password,
      passwordValid,
      passwordFocus,
      passwordHelpMessage
    } = this.state;
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
          onChange={this.handleEmailChange}
          onFocus={this.handleEmailFocus}
          onBlur={this.handleEmailBlur}
          error={!usernameValid && username.length > 0 && !usernameFocus}
          helperText={usernameHelpMessage}
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
          onChange={this.handlePasswordChange}
          onFocus={this.handlePasswordFocus}
          onBlur={this.handlePasswordBlur}
          error={!passwordValid && password.length > 0 && !passwordFocus}
          helperText={passwordHelpMessage}
          fullWidth
          required
        />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { username, password, usernameValid, passwordValid } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <ReusablePaper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
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
              disabled={
                username.length === 0 ||
                password.length === 0 ||
                !usernameValid ||
                !passwordValid
              }
              onClick={this.props.handleLoginState}
              className={classes.submit}
            >
              Log in
            </Button>
          </form>
        </ReusablePaper>
      </main>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);

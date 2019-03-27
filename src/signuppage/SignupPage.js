import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { mdiEmail, mdiLockQuestion, mdiAccount } from "@mdi/js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import styles from "../reusables/Styles";
import ReusablePaper from "../reusables/ReusablePaper";
import EntryLine from "../reusables/EntryLine";

const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

class SignupPage extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
    usernameValid: false,
    usernameHelpMessage: "Type in a proper username",
    emailValid: false,
    emailHelpMessage: "Type in a proper email address (ex: example@test.com)",
    passwordValid: false,
    passwordHelpMessage:
      "Password must contain at least 8 characters minimum, 1 upper case, and at least 1 digit",
    confirmedPasswordValid: false,
    confirmedPasswordHelpMessage: "Re-type your password"
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

  handleEmailChange = e => {
    let { emailValid, emailHelpMessage } = this.state;
    const email = e.target.value;

    emailValid = emailRegex.test(email);

    if (emailValid) {
      emailHelpMessage = "Email is properly formatted";
    } else {
      emailHelpMessage = "Type a proper email address (ex: example@test.com)";
    }

    this.setState({
      email: email,
      emailValid: emailValid,
      emailHelpMessage: emailHelpMessage
    });
  };

  handleEmailFocus = e => {
    this.setState({ emailFocus: true });
  };

  handleEmailBlur = e => {
    this.setState({ emailFocus: false });
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

  handleConfirmedPasswordChange = e => {
    let {
      confirmedPasswordValid,
      confirmedPasswordHelpMessage,
      password
    } = this.state;
    const confirmedPassword = e.target.value;

    confirmedPasswordValid = password === confirmedPassword;

    if (confirmedPasswordValid) {
      confirmedPasswordHelpMessage = "Passwords match";
    } else {
      confirmedPasswordHelpMessage = "Passwords do not match";
    }

    this.setState({
      confirmedPassword: confirmedPassword,
      confirmedPasswordValid: confirmedPasswordValid,
      confirmedPasswordHelpMessage: confirmedPasswordHelpMessage
    });
  };

  handleConfirmedPasswordFocus = e => {
    this.setState({ confirmedPasswordFocus: true });
  };

  handleConfirmedPasswordBlur = e => {
    this.setState({ confirmedPasswordFocus: false });
  };

  renderEntryFields() {
    const {
      username,
      usernameHelpMessage,
      usernameValid,
      usernameFocus,
      email,
      password,
      confirmedPassword,
      emailValid,
      emailFocus,
      emailHelpMessage,
      passwordValid,
      passwordFocus,
      passwordHelpMessage,
      confirmedPasswordValid,
      confirmedPasswordFocus,
      confirmedPasswordHelpMessage
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
          icon={mdiEmail}
          id="email"
          name="email"
          label="Enter Your Email Address"
          margin="normal"
          variant="filled"
          value={email}
          onChange={this.handleEmailChange}
          onFocus={this.handleEmailFocus}
          onBlur={this.handleEmailBlur}
          error={!emailValid && email.length > 0 && !emailFocus}
          helperText={emailHelpMessage}
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

        <EntryLine
          icon={mdiLockQuestion}
          id="confirm-password"
          name="confirmPassword"
          label="Comfirm Your Password"
          margin="normal"
          type="password"
          variant="filled"
          value={confirmedPassword}
          onChange={this.handleConfirmedPasswordChange}
          onFocus={this.handleConfirmedPasswordFocus}
          onBlur={this.handleConfirmedPasswordBlur}
          error={
            !confirmedPasswordValid &&
            confirmedPassword.length > 0 &&
            !confirmedPasswordFocus
          }
          helperText={confirmedPasswordHelpMessage}
          fullWidth
          required
        />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      confirmedPassword,
      emailValid,
      passwordValid,
      confirmedPasswordValid
    } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <ReusablePaper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up to start tracking your shows
          </Typography>

          <form className={classes.form}>
            {this.renderEntryFields()}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={
                email.length === 0 ||
                password.length === 0 ||
                confirmedPassword.length === 0 ||
                !emailValid ||
                !passwordValid ||
                !confirmedPasswordValid
              }
              onClick={this.props.handleLoginState}
              className={classes.submit}
            >
              Create Account
            </Button>
          </form>
        </ReusablePaper>
      </main>
    );
  }
}

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignupPage);

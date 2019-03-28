import React, { Component } from "react";
import NavBar from "./navbar/NavBar";
import HomePage from "./homepage/HomePage";
import SignupPage from "./signuppage/SignupPage";
import LoginPage from "./loginpage/LoginPage";
import BrowsePage from "./browsepage/BrowsePage";
import "./App.css";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import customBackendData from "./backend.json";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4A86E8"
    },
    secondary: {
      main: "#6BCDFD"
    },
    background: { default: "#6BCDFD" }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentPage: "home"
    };
  }

  handleLoginState = event => {
    this.setState({ loggedIn: true });
    event.preventDefault();
  };

  handleCurrentPageChange = pageName => () => {
    this.setState({ currentPage: pageName });
  };

  render() {
    console.log(customBackendData.reviews[0]);
    const pages = {
      home: <HomePage />,
      signup: <SignupPage handleLoginState={this.handleLoginState} />,
      login: <LoginPage />,
      browse: <BrowsePage />
    };
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={theme}>
          <NavBar handleCurrentPageChange={this.handleCurrentPageChange} />
          {pages[this.state.currentPage]}
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;

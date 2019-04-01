import React, { Component } from "react";
import NavBar from "./navbar/NavBar";
import HomePage from "./homepage/HomePage";
import SignupPage from "./signuppage/SignupPage";
import LoginPage from "./loginpage/LoginPage";
import BrowsePage from "./browsepage/BrowsePage";
import MediaEntryPage from "./mediaentrypage/MediaEntryPage";
import "./App.css";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import customBackendData from "./backend.json";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7d80d1"
    },
    secondary: {
      main: "#9d9dc9"
    },
    background: { default: "#9d9dc9", paper: "#edebff" }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentPage: "home",
      backendData: customBackendData,
      currentSelectedMediaId: 4
    };
  }

  handleLoginState = event => {
    this.setState({ loggedIn: true });
    event.preventDefault();
  };

  handleCurrentPageChange = pageName => () => {
    this.setState({ currentPage: pageName });
  };

  handleEnteringMediaEntry = mediaEntryId => () => {
    this.setState({
      currentSelectedMediaId: mediaEntryId,
      currentPage: "mediaEntry"
    });
  };

  render() {
    const { backendData, currentSelectedMediaId } = this.state;
    const pages = {
      home: (
        <HomePage
          media={backendData.media}
          handleEnteringMediaEntry={this.handleEnteringMediaEntry}
        />
      ),
      signup: <SignupPage handleLoginState={this.handleLoginState} />,
      login: <LoginPage />,
      browse: (
        <BrowsePage
          customBackendData={backendData}
          handleEnteringMediaEntry={this.handleEnteringMediaEntry}
        />
      ),
      mediaEntry: (
        <MediaEntryPage
          media={backendData.media}
          mediaId={currentSelectedMediaId}
          reviews={backendData.reviews}
          users={backendData.users}
        />
      )
    };
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={theme}>
          <NavBar handleCurrentPageChange={this.handleCurrentPageChange} />
          {pages[this.state.currentPage]}
          {/* {pages["mediaEntry"]} */}
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;

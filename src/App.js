import React, { Component } from "react";
import NavBar from "./navbar/NavBar";
import HomePage from "./homepage/HomePage";
import SignupPage from "./signuppage/SignupPage";
import LoginPage from "./loginpage/LoginPage";
import BrowsePage from "./browsepage/BrowsePage";
import MediaEntryPage from "./mediaentrypage/MediaEntryPage";
import MyListPage from "./mylistpage/MyListPage";
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
      currentUserId: null,
      currentPage: "home",
      backendData: customBackendData,
      currentSelectedMediaId: 4,
      currentUser: null,
      currentUserListEntries: []
    };
  }

  handleCurrentPageChange = pageName => () => {
    this.setState({ currentPage: pageName });
  };

  handleEnteringMediaEntry = mediaEntryId => () => {
    this.setState({
      currentSelectedMediaId: mediaEntryId,
      currentPage: "mediaEntry"
    });
  };

  handleSignup = (email, username, password) => event => {
    const { backendData } = this.state;
    const randomUserId = Math.random() * (999999999 - 6) + 6;
    const userObject = { id: randomUserId, email, username, password };
    const users = backendData.users;
    users.push(userObject);

    this.setState({
      currentPage: "home",
      loggedIn: true,
      backendData: { ...backendData, users: users },
      currentUser: userObject
    });

    event.preventDefault();
  };

  handleLogin = userId => event => {
    const { backendData } = this.state;
    const foundUser = backendData.users.filter(user => user.id === userId)[0];
    const userListId = backendData.lists.filter(list => list.id === userId)[0]
      .id;
    const userListEntries = backendData.listEntries.filter(
      entry => entry.listId === userListId
    );
    this.setState({
      loggedIn: true,
      currentUserId: userId,
      currentPage: "home",
      currentUser: foundUser,
      currentUserListEntries: userListEntries
    });
    event.preventDefault();
  };

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      currentUserId: null,
      currentUser: null,
      currentPage: "home"
    });
  };

  render() {
    const {
      backendData,
      currentSelectedMediaId,
      loggedIn,
      currentUser,
      currentUserListEntries
    } = this.state;
    const pages = {
      home: (
        <HomePage
          media={backendData.media}
          handleEnteringMediaEntry={this.handleEnteringMediaEntry}
          currentUserListEntries={currentUserListEntries}
          isLoggedIn={loggedIn}
        />
      ),
      signup: <SignupPage handleSignup={this.handleSignup} />,
      login: (
        <LoginPage handleLogin={this.handleLogin} users={backendData.users} />
      ),
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
      ),
      myList: (
        <MyListPage
          currentUser={currentUser}
          listEntries={currentUserListEntries}
          media={backendData.media}
        />
      )
    };
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={theme}>
          <NavBar
            handleCurrentPageChange={this.handleCurrentPageChange}
            handleLogout={this.handleLogout}
            isLoggedIn={loggedIn}
            currentUser={currentUser}
          />
          {pages[this.state.currentPage]}
          {/* {pages["mediaEntry"]} */}
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;

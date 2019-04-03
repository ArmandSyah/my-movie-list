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
  breakpoints: {
    values: {
      lg: 1920,
      xl: 2560
    }
  },
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
      currentUserListEntries: [],
      currentSearchText: ""
    };
  }

  handleSearchFromNavbar = query => () => {
    this.setState({ currentPage: "browse", currentSearchText: query });
  };

  handleCurrentPageChange = pageName => () => {
    this.setState({ currentPage: pageName, currentSearchText: "" });
  };

  handleEnteringMediaEntry = mediaEntryId => () => {
    this.setState({
      currentSelectedMediaId: mediaEntryId,
      currentPage: "mediaEntry",
      currentSearchText: ""
    });
  };

  handleSignup = (email, username, password) => event => {
    const { backendData } = this.state;
    const randomUserId = Math.random() * (999999999 - 6) + 6;
    const randomListId = Math.random() * (999999999 - 6) + 6;
    const userObject = { id: randomUserId, email, username, password };
    const listObject = { id: randomListId, userId: randomUserId };
    const { users, lists } = backendData;
    users.push(userObject);
    lists.push(listObject);

    this.setState({
      currentPage: "home",
      loggedIn: true,
      backendData: { ...backendData, users: users, lists: lists },
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
      currentUserListEntries: userListEntries,
      currentSearchText: ""
    });
    event.preventDefault();
  };

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      currentUserId: null,
      currentUser: null,
      currentPage: "home",
      currentSearchText: ""
    });
  };

  handleAddReview = (score, reviewText) => {
    let { currentUserId, currentSelectedMediaId, backendData } = this.state;
    const randomReviewId = Math.random() * (999999999 - 6) + 6;
    const review = {
      id: randomReviewId,
      userId: currentUserId,
      mediaId: currentSelectedMediaId,
      reviewText,
      score
    };
    const reviews = backendData.reviews;
    reviews.push(review);
    backendData = { reviews, ...backendData };
    this.setState({ backendData });
  };

  handleAddToList = (status, score, progress) => {
    let { currentUserId, currentSelectedMediaId, backendData } = this.state;
    const randomListEntryId = Math.random() * (999999999 - 6) + 6;
    const userList = backendData.lists.filter(
      list => list.userId === currentUserId
    )[0];
    const listEntry = {
      id: randomListEntryId,
      listId: userList.id,
      mediaId: currentSelectedMediaId,
      progress: progress,
      score: score,
      status: status,
      lastUpdated: new Date(Date.now()).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };
    const { listEntries } = backendData;
    listEntries.push(listEntry);
    backendData = { listEntries, ...backendData };
    this.setState({
      backendData,
      currentUserListEntries: listEntries.filter(
        listEntry => listEntry.listId === userList.id
      )
    });
  };

  handleDeleteListEntry = listEntryId => {
    let { backendData, currentUserId } = this.state;
    const { lists, listEntries } = backendData;

    const userList = lists.filter(list => list.userId === currentUserId)[0];

    const updatedListEntries = listEntries.filter(
      listEntry => listEntry.id !== listEntryId
    );

    backendData = { ...backendData, listEntries: updatedListEntries };
    this.setState({
      backendData,
      currentUserListEntries: updatedListEntries.filter(
        listEntry => listEntry.listId === userList.id
      )
    });
  };

  handleEditToListEntry = (listEntryId, status, score, progress) => {
    let { backendData, currentUserId } = this.state;
    const { lists, listEntries } = backendData;

    const userList = lists.filter(list => list.userId === currentUserId)[0];

    const listEntryToUpdate = listEntries.filter(
      listEntry => listEntry.id === listEntryId
    )[0];

    const updatedListEntry = {
      ...listEntryToUpdate,
      status,
      score,
      progress,
      lastUpdated: new Date(Date.now()).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };
    const findUpdateIndex = listEntries.findIndex(
      listEntry => listEntry.id === listEntryId
    );
    listEntries[findUpdateIndex] = updatedListEntry;
    backendData = { ...backendData, listEntries };

    this.setState({
      backendData,
      currentUserListEntries: listEntries.filter(
        listEntry => listEntry.listId === userList.id
      )
    });
  };

  handleEditToReview = (reviewId, reviewText, score) => {
    let { backendData } = this.state;
    const { reviews } = backendData;

    const reviewToUpdate = reviews.filter(review => review.id === reviewId)[0];

    const updatedReview = { ...reviewToUpdate, reviewText, score };
    const findUpdateIndex = reviews.findIndex(review => review.id === reviewId);
    reviews[findUpdateIndex] = updatedReview;
    backendData = { ...backendData, reviews };
    this.setState({ backendData });
  };

  handleEnteringSearchText = event => {
    this.setState({
      currentSearchText: event.target.value
    });
  };

  render() {
    const {
      backendData,
      currentSelectedMediaId,
      loggedIn,
      currentUser,
      currentUserId,
      currentUserListEntries,
      currentSearchText
    } = this.state;
    const pages = {
      home: (
        <HomePage
          media={backendData.media}
          handleEnteringMediaEntry={this.handleEnteringMediaEntry}
          currentUserListEntries={currentUserListEntries}
          isLoggedIn={loggedIn}
          handleCurrentPageChange={this.handleCurrentPageChange}
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
          currentSearchText={currentSearchText}
        />
      ),
      mediaEntry: (
        <MediaEntryPage
          media={backendData.media}
          mediaId={currentSelectedMediaId}
          reviews={backendData.reviews}
          users={backendData.users}
          handleAddReview={this.handleAddReview}
          handleAddToList={this.handleAddToList}
          isLoggedIn={loggedIn}
          handleCurrentPageChange={this.handleCurrentPageChange}
          handleEditToListEntry={this.handleEditToListEntry}
          currentUserListEntries={currentUserListEntries}
          handleEditToReview={this.handleEditToReview}
          currentUserId={currentUserId}
        />
      ),
      myList: (
        <MyListPage
          currentUser={currentUser}
          listEntries={currentUserListEntries}
          media={backendData.media}
          handleDeleteListEntry={this.handleDeleteListEntry}
          handleEditToListEntry={this.handleEditToListEntry}
          handleEnteringMediaEntry={this.handleEnteringMediaEntry}
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
            handleEnteringSearchText={this.handleEnteringSearchText}
            handleSearchFromNavbar={this.handleSearchFromNavbar}
            currentSearchText={currentSearchText}
          />
          {pages[this.state.currentPage]}
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;

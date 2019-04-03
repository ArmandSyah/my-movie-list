import React from "react";

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  withStyles,
  Typography,
  Paper
} from "@material-ui/core";

import styles from "../reusables/Styles";

import ReviewModal from "./ReviewModal";
import AddToListModal from "./AddToListModal";

class MediaInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addListModalOpen: false,
      reviewModalOpen: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { mediaId, currentUserListEntries, reviews, currentUserId } = props;
    const foundEntry = currentUserListEntries.filter(
      listEntry => listEntry.mediaId === mediaId
    );
    const foundReview =
      currentUserId === null
        ? null
        : reviews.filter(
            review =>
              review.mediaId === mediaId && review.userId === currentUserId
          );
    const stateObject = {};

    if (foundEntry.length === 0) {
      stateObject["inUsersList"] = false;
      stateObject["listEntryId"] = null;
      stateObject["status"] = "Currently Watching";
      stateObject["score"] = 1;
      stateObject["progress"] = 1;
    } else {
      const entry = foundEntry[0];
      const { score, progress, status } = entry;
      stateObject["inUsersList"] = true;
      stateObject["listEntryId"] = entry.id;
      stateObject["status"] = status;
      stateObject["score"] = score;
      stateObject["progress"] = progress;
    }

    if (foundReview === null || foundReview.length === 0) {
      stateObject["reviewedByUser"] = false;
      stateObject["reviewId"] = null;
      stateObject["reviewText"] = "";
      stateObject["reviewScore"] = 1;
    } else {
      const review = foundReview[0];
      const { reviewText, score } = review;
      stateObject["reviewedByUser"] = true;
      stateObject["reviewId"] = review.id;
      stateObject["reviewText"] = reviewText;
      stateObject["reviewScore"] = score;
    }

    return stateObject;
  }

  handleReviewModalOpen = () => {
    this.setState({ reviewModalOpen: true });
  };

  handleReviewModalClose = () => {
    this.setState({ reviewModalOpen: false });
  };

  handleAddListModalOpen = () => {
    this.setState({ addListModalOpen: true });
  };

  handleAddListModalClose = () => {
    this.setState({ addListModalOpen: false });
  };

  renderButtons() {
    const { inUsersList, reviewedByUser } = this.state;
    const { isLoggedIn, handleCurrentPageChange } = this.props;

    if (!isLoggedIn) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "250px",
            alignItems: "center"
          }}
        >
          <Typography
            variant="subheading"
            align="center"
            style={{ marginBottom: "20px" }}
          >
            To start tracking this show, or reviewing it log in or sign up
          </Typography>
          <Button
            variant="contained"
            onClick={handleCurrentPageChange("login")}
            style={{ marginBottom: "20px" }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            onClick={handleCurrentPageChange("signup")}
          >
            Sign up
          </Button>
        </div>
      );
    }

    return (
      <div
        style={{ display: "flex", flexDirection: "column", maxWidth: "250px" }}
      >
        <Button
          variant="contained"
          onClick={this.handleAddListModalOpen}
          style={{ marginBottom: "20px" }}
        >
          {inUsersList ? "Edit this entry" : "Add to List"}
        </Button>
        <Button variant="contained" onClick={this.handleReviewModalOpen}>
          {reviewedByUser ? "Edit your review" : "Write Review"}
        </Button>
      </div>
    );
  }

  render() {
    const {
      reviewModalOpen,
      addListModalOpen,
      inUsersList,
      listEntryId,
      status,
      score,
      progress,
      reviewedByUser,
      reviewScore,
      reviewText,
      reviewId
    } = this.state;
    const {
      reviews,
      users,
      mediaEntry,
      handleAddReview,
      handleAddToList,
      handleEditToListEntry,
      handleEditToReview
    } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        {this.renderButtons()}
        <div
          style={{
            marginLeft: "5%",
            overflow: "auto",
            minWidth: "510px",
            maxWidth: "510px"
          }}
        >
          <Paper>
            <Typography variant="h4" style={{ padding: "2%" }}>
              Reviews
            </Typography>
            <Divider />
            <List>
              {reviews.length === 0 ? (
                <div>
                  <ListItem>
                    <ListItemText
                      primary={
                        "No reviews have been written yet. You can be the first one!"
                      }
                    />
                  </ListItem>
                </div>
              ) : (
                reviews.map((review, index) => {
                  const userId = review.userId;
                  const user = users.filter(u => u.id === userId)[0];
                  return (
                    <div>
                      <ListItem>
                        <ListItemText
                          primary={`${user.username} - Score: ${
                            review.score
                          }/10`}
                          secondary={`${review.reviewText}`}
                        />
                      </ListItem>
                      {index !== reviews.length - 1 && <Divider />}
                    </div>
                  );
                })
              )}
            </List>
          </Paper>
        </div>
        <div
          style={{
            marginLeft: "5%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Paper
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              maxWidth: "234px"
            }}
          >
            <Typography variant="h4" align="center">
              Score
            </Typography>
            <Typography variant="h5" align="center">{`${
              mediaEntry.averageScore
            }/10`}</Typography>
          </Paper>

          <Paper
            style={{ padding: "10px", marginTop: "20px", maxWidth: "234px" }}
          >
            <Typography variant="h4" style={{ padding: "10px" }}>
              Information
            </Typography>
            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <span>Type: {mediaEntry.type}</span>
              <span>Start Date: {mediaEntry["start date"]}</span>
              <span>End Date: {mediaEntry["end date"]}</span>
              <span>Duration: {mediaEntry.duration}</span>
              <span>Episodes: {mediaEntry.episodes}</span>
              <span>Genres: {mediaEntry.genres}</span>
            </div>
          </Paper>
        </div>
        <ReviewModal
          handleModalClose={this.handleReviewModalClose}
          modalOpen={reviewModalOpen}
          mediaEntry={mediaEntry}
          handleAddReview={handleAddReview}
          handleEditToReview={handleEditToReview}
          reviewedByUser={reviewedByUser}
          reviewScore={reviewScore}
          reviewText={reviewText}
          reviewId={reviewId}
        />
        <AddToListModal
          handleEditToListEntry={handleEditToListEntry}
          handleModalClose={this.handleAddListModalClose}
          modalOpen={addListModalOpen}
          mediaEntry={mediaEntry}
          handleAddToList={handleAddToList}
          inUsersList={inUsersList}
          status={status}
          score={score}
          progress={progress}
          listEntryId={listEntryId}
        />
      </div>
    );
  }
}

export default withStyles(styles)(MediaInfo);

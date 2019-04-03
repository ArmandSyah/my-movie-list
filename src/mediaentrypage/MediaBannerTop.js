import React from "react";

import { Typography, withStyles, Button } from "@material-ui/core";

import styles from "../reusables/Styles";

import ReviewModal from "./ReviewModal";
import AddToListModal from "./AddToListModal";

import MMLSnackbar from "../snackbar/MMLSnackbar";
import MediaInfo from "./MediaInfo";

class MediaBannerTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addListModalOpen: false,
      reviewModalOpen: false,
      addedToListSuccess: false,
      addedReviewSuccess: false,
      editListEntrySuccess: false,
      editReviewSuccess: false,
      openSnackbar: false
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

  handleAddToListSuccess = () => {
    this.setState({ addedToListSuccess: true, openSnackbar: true });
  };

  handledAddReviewSuccess = () => {
    this.setState({ addedReviewSuccess: true, openSnackbar: true });
  };

  handleEditListEntrySuccess = () => {
    this.setState({ editListEntrySuccess: true, openSnackbar: true });
  };

  handleEditReviewSuccess = () => {
    this.setState({ editReviewSuccess: true, openSnackbar: true });
  };

  handleClose = reason => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      addedToListSuccess: false,
      addedReviewSuccess: false,
      editListEntrySuccess: false,
      editReviewSuccess: false,
      openSnackbar: false
    });
  };

  renderButtons() {
    const { inUsersList, reviewedByUser } = this.state;
    const { isLoggedIn, handleCurrentPageChange } = this.props;

    if (!isLoggedIn) {
      return (
        <div
          style={{
            paddingTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "250px"
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
            style={{ marginBottom: "20px", minWidth: "250px" }}
          >
            Log In
          </Button>
          <Button
            variant="contained"
            onClick={handleCurrentPageChange("signup")}
            style={{ minWidth: "250px" }}
          >
            Sign up
          </Button>
        </div>
      );
    }

    return (
      <div
        style={{
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "250px"
        }}
      >
        <Button
          variant="contained"
          onClick={this.handleAddListModalOpen}
          style={{ marginBottom: "20px", minWidth: "250px" }}
        >
          {inUsersList ? "Edit this entry" : "Add to List"}
        </Button>
        <Button
          variant="contained"
          onClick={this.handleReviewModalOpen}
          style={{ minWidth: "250px" }}
        >
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
      reviewId,
      addedToListSuccess,
      addedReviewSuccess,
      editListEntrySuccess,
      editReviewSuccess,
      openSnackbar
    } = this.state;
    const {
      banner,
      cover,
      title,
      description,
      handleAddReview,
      handleAddToList,
      handleEditToListEntry,
      handleEditToReview,
      mediaEntry,
      users,
      reviews
    } = this.props;
    console.log(cover);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "100%",
            display: "block",
            width: "100%",
            height: "0",
            paddingBottom: "20%",
            position: "absolute",
            zIndex: 1
          }}
        />
        <div
          style={{
            display: "flex",
            width: "50%",
            height: "auto",
            position: "relative",
            zIndex: 2,
            paddingTop: "10%",
            alignSelf: "center"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              src={cover}
              style={{
                display: "block",
                maxWidth: "250px",
                maxHeight: "350px",
                width: "auto",
                height: "auto"
              }}
              alt="cover"
            />
            {this.renderButtons()}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "20%"
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              style={{ paddingTop: "10px", paddingLeft: "20px" }}
            >
              {title}
            </Typography>

            <Typography
              component="h1"
              variant="subheading"
              align="justify"
              style={{ paddingTop: "10px", paddingLeft: "20px" }}
            >
              {description}
            </Typography>
            <div
              style={{
                flexGrow: 3,
                paddingTop: "20px",
                paddingLeft: "20px"
              }}
            >
              <MediaInfo
                reviews={reviews}
                users={users}
                mediaEntry={mediaEntry}
              />
            </div>
          </div>
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
          handledAddReviewSuccess={this.handledAddReviewSuccess}
          handleEditReviewSuccess={this.handleEditReviewSuccess}
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
          handleAddToListSuccess={this.handleAddToListSuccess}
          handleEditListEntrySuccess={this.handleEditListEntrySuccess}
        />
        {(addedToListSuccess || editListEntrySuccess) && (
          <MMLSnackbar
            open={openSnackbar}
            hideDuration={2500}
            handleClose={this.handleClose}
            variant={"success"}
            message={
              addedToListSuccess
                ? `${mediaEntry.title} has been added to your list`
                : editListEntrySuccess && `${mediaEntry.title} has been edited`
            }
          />
        )}
        {(addedReviewSuccess || editReviewSuccess) && (
          <MMLSnackbar
            open={openSnackbar}
            hideDuration={2500}
            handleClose={this.handleClose}
            variant={"success"}
            message={
              addedReviewSuccess
                ? `Review added for ${mediaEntry.title}`
                : editReviewSuccess && `Review edited for ${mediaEntry.title}`
            }
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MediaBannerTop);

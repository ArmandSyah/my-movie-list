import React from "react";

import { CssBaseline, withStyles } from "@material-ui/core";

import MediaBannerTop from "./MediaBannerTop";
import MediaInfo from "./MediaInfo";

import styles from "../reusables/Styles";

class MediaEntryPage extends React.Component {
  render() {
    const {
      classes,
      mediaId,
      media,
      reviews,
      users,
      handleAddReview,
      handleAddToList,
      isLoggedIn,
      handleCurrentPageChange,
      handleEditToListEntry,
      currentUserListEntries,
      handleEditToReview,
      currentUserId
    } = this.props;
    const mediaEntry = media.filter(m => m.id === mediaId)[0];
    const { bannerImage, coverImage, title, description } = mediaEntry;
    const mediaReviews = reviews.filter(review => review.mediaId === mediaId);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <CssBaseline />
        <div style={{ flexGrow: 1 }}>
          <MediaBannerTop
            banner={bannerImage}
            cover={coverImage}
            title={title}
            description={description}
          />
        </div>
        <div
          style={{
            flexGrow: 3,
            paddingTop: "20px"
          }}
          className={classes.mediaInfoDiv}
        >
          <MediaInfo
            reviews={mediaReviews}
            users={users}
            mediaEntry={mediaEntry}
            handleAddReview={handleAddReview}
            handleAddToList={handleAddToList}
            isLoggedIn={isLoggedIn}
            handleCurrentPageChange={handleCurrentPageChange}
            handleEditToListEntry={handleEditToListEntry}
            currentUserListEntries={currentUserListEntries}
            mediaId={mediaId}
            handleEditToReview={handleEditToReview}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MediaEntryPage);

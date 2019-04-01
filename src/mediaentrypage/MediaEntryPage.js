import React from "react";

import { CssBaseline } from "@material-ui/core";

import MediaBannerTop from "./MediaBannerTop";
import MediaInfo from "./MediaInfo";

class MediaEntryPage extends React.Component {
  render() {
    const { mediaId, media, reviews, users } = this.props;
    const mediaEntry = media.filter(m => m.id === mediaId)[0];
    const { bannerImage, coverImage, title, description } = mediaEntry;
    const mediaReviews = reviews.filter(review => review.mediaId === mediaId);
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
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
            paddingTop: "20px",
            paddingLeft: "28%"
          }}
        >
          <MediaInfo
            reviews={mediaReviews}
            users={users}
            mediaEntry={mediaEntry}
          />
        </div>
      </div>
    );
  }
}

export default MediaEntryPage;

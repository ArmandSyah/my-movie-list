import React from "react";

import { Typography, Card, CardMedia, withStyles } from "@material-ui/core";

import ReusablePaper from "../reusables/ReusablePaper";
import styles from "../reusables/Styles";

class MediaBannerTop extends React.Component {
  render() {
    const { banner, cover, title, description, classes } = this.props;
    console.log(cover);
    return (
      <div>
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
            flexDirection: "row",
            width: "50%",
            height: "auto",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
            paddingTop: "10%"
          }}
        >
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
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MediaBannerTop);

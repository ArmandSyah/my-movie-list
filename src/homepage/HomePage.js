import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import CssBaseline from "@material-ui/core/CssBaseline";
import styles from "../reusables/Styles";
import Showcase from "../reusables/Showcase";
import Timeline from "../reusables/Timeline";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const { media } = this.props;

    const newestMedia = [...media];
    const mostPopularMedia = [...media];

    newestMedia.sort((a, b) => {
      const aDate = a["start date"];
      const bDate = b["start date"];

      return new Date(bDate) - new Date(aDate);
    });

    mostPopularMedia.sort((a, b) => {
      const aScore = a.averageScore;
      const bScore = b.averageScore;

      return bScore - aScore;
    });
    this.state = {
      newestMedia,
      mostPopularMedia
    };
  }
  render() {
    const { handleEnteringMediaEntry } = this.props;
    const { newestMedia, mostPopularMedia } = this.state;

    return (
      <main>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "25px",
              flex: 2
            }}
          >
            <Showcase
              title="Newest Release"
              tileData={newestMedia}
              handleEnteringMediaEntry={handleEnteringMediaEntry}
            />
            <Showcase
              title="Most Popular"
              tileData={mostPopularMedia}
              handleEnteringMediaEntry={handleEnteringMediaEntry}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              //   padding: "25px",
              flex: 1
            }}
          >
            <Timeline />
          </div>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(HomePage);

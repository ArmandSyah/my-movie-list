import React from "react";

import { CssBaseline, Typography, withStyles } from "@material-ui/core";

import styles from "../reusables/Styles";
import MyListOptionsPanel from "./MyListOptionsPanel";
import MyListResultsDisplay from "./MyListResultsDisplay";

class MyListPage extends React.Component {
  constructor(props) {
    super(props);
    const { listEntries, media } = this.props;
    const fusedListEntries = listEntries.map(entry => {
      const { mediaId, progress, score, status } = entry;
      const mediaEntry = media.filter(m => m.id === mediaId)[0];
      const { title, type, episodes, coverImage } = mediaEntry;
      return {
        title,
        score: `${score}/10`,
        progress: `${progress}/${episodes}`,
        type,
        status,
        coverImage
      };
    });
    this.state = {
      displayStatus: "all",
      sort: "score",
      fusedListEntries
    };
  }
  render() {
    const { displayStatus, sort, fusedListEntries } = this.state;
    const { classes, currentUser } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CssBaseline />
        <div style={{ paddingLeft: "35px" }}>
          <MyListOptionsPanel
            handleChange={this.handleChange}
            displayStatus={displayStatus}
            sort={sort}
          />
        </div>
        <div
          style={{
            flexGrow: 2,
            paddingTop: "2%",
            paddingLeft: "15%",
            paddingRight: "23%"
          }}
        >
          <div>
            <Typography component="h1" variant="h2" align="center">
              {`${currentUser.username}'s List`}
            </Typography>
            <form className={classes.form}>
              <MyListResultsDisplay listEntries={fusedListEntries} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MyListPage);

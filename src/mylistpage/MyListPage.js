import React from "react";

import { CssBaseline, Typography, withStyles } from "@material-ui/core";

import styles from "../reusables/Styles";
import MyListOptionsPanel from "./MyListOptionsPanel";
import MyListResultsDisplay from "./MyListResultsDisplay";

const setupFusedEntries = (listEntries, media) => {
  const fusedListEntries = listEntries.map(entry => {
    const { mediaId, progress, score, status, lastUpdated, id } = entry;
    const mediaEntry = media.filter(m => m.id === mediaId)[0];
    const { title, type, episodes, coverImage } = mediaEntry;
    return {
      id,
      title,
      score: `${score}/10`,
      progress: `${progress}/${episodes}`,
      type,
      status,
      coverImage,
      lastUpdated,
      realScore: score,
      realProgress: progress,
      totalEpisodes: episodes
    };
  });
  return fusedListEntries;
};

const filterResults = (results, displayStatus, sort) => {
  let currentResults = results;
  switch (displayStatus) {
    case "watching":
      currentResults = currentResults.filter(
        result => result.status === "Currently Watching"
      );
      break;
    case "finished":
      currentResults = currentResults.filter(
        result => result.status === "Finished"
      );
      break;
    case "dropped":
      currentResults = currentResults.filter(
        result => result.status === "Dropped"
      );
      break;
    case "all":
    default:
      break;
  }

  switch (sort) {
    case "name":
      currentResults.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();

        return bTitle > aTitle ? -1 : aTitle > bTitle ? 1 : 0;
      });
      break;
    case "date":
      currentResults.sort((a, b) => {
        const aDate = a.lastUpdated;
        const bDate = b.lastUpdated;

        return new Date(bDate) - new Date(aDate);
      });
      break;
    case "score":
      currentResults.sort((a, b) => {
        const aScore = a.realScore;
        const bScore = b.realScore;

        return bScore - aScore;
      });
      break;
    default:
      break;
  }
  return currentResults;
};

class MyListPage extends React.Component {
  constructor(props) {
    super(props);
    const displayStatus = "all";
    const sort = "score";

    this.state = {
      displayStatus,
      sort
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { listEntries, media } = props;
    const { displayStatus, sort } = state;
    const fusedListEntries = setupFusedEntries(listEntries, media);
    return {
      fusedListEntries,
      displayedListEntries: filterResults(fusedListEntries, displayStatus, sort)
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { fusedListEntries, displayStatus, sort } = this.state;
      this.setState({
        displayedListEntries: filterResults(
          fusedListEntries,
          displayStatus,
          sort
        )
      });
    });
  };

  render() {
    const { displayStatus, sort, displayedListEntries } = this.state;
    const {
      classes,
      currentUser,
      handleDeleteListEntry,
      handleEditToListEntry,
      media
    } = this.props;
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
            paddingLeft: "10%",
            paddingRight: "23%"
          }}
        >
          <div>
            <Typography component="h1" variant="h2" align="center">
              {`${currentUser.username}'s List`}
            </Typography>
            <form className={classes.form}>
              <MyListResultsDisplay
                listEntries={displayedListEntries}
                media={media}
                handleDeleteListEntry={handleDeleteListEntry}
                handleEditToListEntry={handleEditToListEntry}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MyListPage);

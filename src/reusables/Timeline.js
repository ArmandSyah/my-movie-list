import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { Typography, withStyles, CssBaseline, Button } from "@material-ui/core";
import { indigo, green, red } from "@material-ui/core/colors";
import styles from "./Styles";

const statusColor = {
  Finished: green[700],
  "Currently Watching": indigo[700],
  Dropped: red[700]
};

class ActivityRecord extends React.Component {
  render() {
    const { entry, media } = this.props;
    const { status, mediaId, lastUpdated } = entry;
    const mediaEntry = media.filter(m => m.id === mediaId)[0];
    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={lastUpdated}
        iconStyle={{ background: statusColor[status], color: "#fff" }}
      >
        <h4 className="vertical-timeline-element-title">{`${status} - ${
          mediaEntry.title
        }`}</h4>
      </VerticalTimelineElement>
    );
  }
}

class LogoutPreview extends React.Component {
  render() {
    const { handleCurrentPageChange } = this.props;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "30px",
          paddingLeft: "30px"
        }}
      >
        <CssBaseline />
        <Typography component="h1" variant="h4">
          Log in or Sign up, to see your Activity Timeline
        </Typography>
        <Button
          variant="contained"
          onClick={handleCurrentPageChange("login")}
          style={{ marginBottom: "20px", flex: "1 1 0", minWidth: "250px" }}
        >
          Log in
        </Button>
        <Button
          variant="contained"
          onClick={handleCurrentPageChange("signup")}
          style={{ marginBottom: "20px", flex: "1 1 0", minWidth: "250px" }}
        >
          Sign up
        </Button>
      </div>
    );
  }
}

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }

  componentDidMount() {
    const { currentUserListEntries, media } = this.props;
    currentUserListEntries.sort((a, b) => {
      const aDate = a["lastUpdated"];
      const bDate = b["lastUpdated"];

      return new Date(bDate) - new Date(aDate);
    });
    this.setState({
      records: currentUserListEntries.map(entry => (
        <ActivityRecord entry={entry} media={media} />
      ))
    });
  }

  renderRecords() {
    const { handleCurrentPageChange } = this.props;
    const { records } = this.state;
    if (records.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingTop: "30px",
            paddingLeft: "30px"
          }}
        >
          <CssBaseline />
          <Typography
            component="h1"
            variant="h4"
            style={{ paddingBottom: "30px" }}
          >
            Start looking for your favourite shows
          </Typography>
          <Button
            variant="contained"
            onClick={handleCurrentPageChange("browse")}
            style={{ marginBottom: "20px", flex: "1 1 0", minWidth: "250px" }}
          >
            Browse
          </Button>
        </div>
      );
    }

    return <VerticalTimeline layout="1-column">{records}</VerticalTimeline>;
  }

  render() {
    const { classes, isLoggedIn, handleCurrentPageChange } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography component="h1" variant="h2" align="center">
            Activity Timeline
          </Typography>
          {!isLoggedIn ? (
            <LogoutPreview handleCurrentPageChange={handleCurrentPageChange} />
          ) : (
            this.renderRecords()
          )}
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(Timeline);

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
import ReusablePaper from "../reusables/ReusablePaper";

class MediaInfo extends React.Component {
  render() {
    const { reviews, users, mediaEntry, classes } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button variant="contained" style={{ marginBottom: "20px" }}>
            Add to List
          </Button>
          <Button variant="contained">Write Review</Button>
        </div>
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
                            review.Score
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
      </div>
    );
  }
}

export default withStyles(styles)(MediaInfo);

import React from "react";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

import styles from "../reusables/Styles";

class ListMode extends React.Component {
  render() {
    const { classes, media, handleEnteringMediaEntry } = this.props;
    return (
      <div style={{ alignSelf: "stretch" }}>
        <div className={classes.demo}>
          <List>
            {media.map(m => (
              <div>
                <ListItem button onClick={handleEnteringMediaEntry(m.id)}>
                  <ListItemAvatar>
                    <Avatar
                      src={m.coverImage}
                      className={classes.avatar}
                      style={{ borderRadius: 0 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${m.title} - Score: ${m.averageScore}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ListMode);

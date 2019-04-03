import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Icon from "@mdi/react";
import { mdiViewGrid, mdiViewList } from "@mdi/js";

import styles from "../reusables/Styles";

import CardMode from "./CardMode";
import ListMode from "./ListMode";

class MyListResultsDisplay extends React.Component {
  state = {
    displayMode: "card"
  };

  handleDisplayModeButton = mode => () => {
    this.setState({ displayMode: mode });
  };

  render() {
    const { displayMode } = this.state;
    const {
      classes,
      listEntries,
      handleDeleteListEntry,
      handleEditToListEntry,
      handleEnteringMediaEntry,
      media
    } = this.props;
    return (
      <div
        style={{ paddingTop: "25px", display: "flex", flexDirection: "column" }}
      >
        <div style={{ paddingBottom: "15px", alignSelf: "flex-end" }}>
          <Button
            color={displayMode === "card" ? "primary" : "default"}
            onClick={this.handleDisplayModeButton("card")}
            variant="contained"
            className={classes.button}
            disableRipple
            disableFocusRipple
          >
            <Icon path={mdiViewGrid} size={1} />
          </Button>
          <Button
            color={displayMode === "list" ? "primary" : "default"}
            onClick={this.handleDisplayModeButton("list")}
            variant="contained"
            className={classes.button}
            disableRipple
            disableFocusRipple
          >
            <Icon path={mdiViewList} size={1} />
          </Button>
        </div>
        {displayMode === "card" ? (
          <CardMode
            listEntries={listEntries}
            handleDeleteListEntry={handleDeleteListEntry}
            handleEditToListEntry={handleEditToListEntry}
            handleEnteringMediaEntry={handleEnteringMediaEntry}
          />
        ) : (
          <ListMode
            listEntries={listEntries}
            handleDeleteListEntry={handleDeleteListEntry}
            handleEditToListEntry={handleEditToListEntry}
            handleEnteringMediaEntry={handleEnteringMediaEntry}
            media={media}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MyListResultsDisplay);

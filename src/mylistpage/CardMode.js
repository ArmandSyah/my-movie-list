import React from "react";
import { withStyles } from "@material-ui/core/styles";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

import { Delete, Edit } from "@material-ui/icons";

import MyListEditListEntryModal from "./MyListEditListEntryModal";
import styles from "../reusables/Styles";
import DeleteAlert from "../reusables/DeleteAlert";

import MMLSnackbar from "../snackbar/MMLSnackbar";

class CardMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteDialogOpen: false,
      editListEntryModalOpen: false,
      selectedListEntry: null,
      deleteFromListSuccess: false,
      editListEntrySuccess: false,
      openSnackbar: false,
      hover: false
    };
  }

  handleDeleteDialogOpen = selectedListEntry => () => {
    this.setState({ deleteDialogOpen: true, selectedListEntry });
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false, selectedListEntry: null });
  };

  handleYesActionForDelete = () => {
    const { selectedListEntry } = this.state;
    const { handleDeleteListEntry } = this.props;
    const { id } = selectedListEntry;
    this.setState({
      deleteDialogOpen: false,
      selectedListEntry: null,
      deleteFromListSuccess: true,
      openSnackbar: true
    });
    handleDeleteListEntry(id);
  };

  handleEditListEntryModalOpen = selectedListEntry => () => {
    this.setState({ editListEntryModalOpen: true, selectedListEntry });
  };

  handleEditListEntryModalClose = () => {
    this.setState({ editListEntryModalOpen: false, selectedListEntry: null });
  };

  handleEditListEntrySuccess = () => {
    this.setState({ editListEntrySuccess: true, openSnackbar: true });
  };

  handleClose = reason => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      deleteFromListSuccess: false,
      editListEntrySuccess: false,
      openSnackbar: false
    });
  };

  handleMouseOver = selectedListEntry => () => {
    this.setState({ hover: true, selectedListEntry });
  };

  handleMouseLeave = () => {
    this.setState({ hover: false, selectedListEntry: null });
  };

  render() {
    const {
      deleteDialogOpen,
      editListEntryModalOpen,
      selectedListEntry,
      deleteFromListSuccess,
      openSnackbar,
      editListEntrySuccess,
      hover
    } = this.state;
    const {
      classes,
      listEntries,
      handleEditToListEntry,
      handleEnteringMediaEntry
    } = this.props;

    return (
      <div className={classes.cardModeRoot}>
        <GridList cellHeight={180} spacing={15}>
          {listEntries.map(tile => {
            return (
              <GridListTile>
                <img src={tile.coverImage} alt={tile.title} />
                <GridListTileBar
                  title={
                    <div
                      onClick={handleEnteringMediaEntry(tile.mediaId)}
                      onMouseEnter={this.handleMouseOver(tile)}
                      onMouseLeave={this.handleMouseLeave}
                      style={{
                        cursor: "pointer",
                        color:
                          hover && selectedListEntry === tile
                            ? "#7d80d1"
                            : "inherit"
                      }}
                    >
                      {tile.title}
                    </div>
                  }
                  subtitle={
                    <div>
                      Score: {tile.score} - Progress: {tile.progress} - Type:{" "}
                      {tile.type} - Status: {tile.status}
                    </div>
                  }
                  actionIcon={
                    <div>
                      <IconButton className={classes.cardModeIcon}>
                        <Delete onClick={this.handleDeleteDialogOpen(tile)} />
                      </IconButton>
                      <IconButton className={classes.cardModeIcon}>
                        <Edit
                          onClick={this.handleEditListEntryModalOpen(tile)}
                        />
                      </IconButton>
                    </div>
                  }
                />
              </GridListTile>
            );
          })}
        </GridList>
        {deleteDialogOpen && (
          <DeleteAlert
            open={deleteDialogOpen}
            alertTitle={`Are you sure you wish to delete ${
              selectedListEntry.title
            }`}
            handleClose={this.handleDeleteDialogClose}
            handleYesAction={this.handleYesActionForDelete}
          />
        )}
        {editListEntryModalOpen && (
          <MyListEditListEntryModal
            listEntry={selectedListEntry}
            modalOpen={editListEntryModalOpen}
            handleModalClose={this.handleEditListEntryModalClose}
            handleEditToListEntry={handleEditToListEntry}
            handleEditListEntrySuccess={this.handleEditListEntrySuccess}
          />
        )}
        {deleteFromListSuccess && (
          <MMLSnackbar
            open={openSnackbar}
            hideDuration={2500}
            handleClose={this.handleClose}
            variant={"success"}
            message={"Entry has been deleted"}
          />
        )}
        {editListEntrySuccess && (
          <MMLSnackbar
            open={openSnackbar}
            hideDuration={2500}
            handleClose={this.handleClose}
            variant={"success"}
            message={"Entry has been editted"}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(CardMode);

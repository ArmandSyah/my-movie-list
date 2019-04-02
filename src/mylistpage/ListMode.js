import React from "react";

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  withStyles
} from "@material-ui/core";

import { Delete, Edit } from "@material-ui/icons";

import MyListEditListEntryModal from "./MyListEditListEntryModal";
import DeleteAlert from "../reusables/DeleteAlert";

import styles from "../reusables/Styles";

class ListRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteDialogOpen: false,
      editListEntryModalOpen: false
    };
  }

  handleDeleteDialogOpen = () => {
    this.setState({ deleteDialogOpen: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false });
  };

  handleYesActionForDelete = () => {
    const { handleDeleteListEntry, listEntry } = this.props;
    const { id } = listEntry;
    this.setState({ deleteDialogOpen: false });
    handleDeleteListEntry(id);
  };

  handleEditListEntryModalOpen = () => {
    this.setState({ editListEntryModalOpen: true });
  };

  handleEditListEntryModalClose = () => {
    this.setState({ editListEntryModalOpen: false });
  };

  renderActionButtons() {
    const { classes } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <IconButton className={classes.cardModeIcon}>
          <Delete onClick={this.handleDeleteDialogOpen} />
        </IconButton>
        <IconButton className={classes.cardModeIcon}>
          <Edit onClick={this.handleEditListEntryModalOpen} />
        </IconButton>
      </div>
    );
  }

  render() {
    const { deleteDialogOpen, editListEntryModalOpen } = this.state;
    const { listEntry, handleEditToListEntry } = this.props;
    return (
      <TableRow key={listEntry.title}>
        <TableCell>
          <img
            src={listEntry.coverImage}
            alt={"yes"}
            style={{ width: "58px", height: "37px" }}
          />
        </TableCell>
        <TableCell>{listEntry.title}</TableCell>
        <TableCell>{listEntry.score}</TableCell>
        <TableCell>{listEntry.progress}</TableCell>
        <TableCell>{listEntry.type}</TableCell>
        <TableCell>{listEntry.status}</TableCell>
        <TableCell>{listEntry.lastUpdated}</TableCell>
        <TableCell>{this.renderActionButtons()} </TableCell>
        <DeleteAlert
          open={deleteDialogOpen}
          alertTitle={`Are you sure you wish to delete ${listEntry.title}`}
          handleClose={this.handleDeleteDialogClose}
          handleYesAction={this.handleYesActionForDelete}
        />
        <MyListEditListEntryModal
          listEntry={listEntry}
          modalOpen={editListEntryModalOpen}
          handleModalClose={this.handleEditListEntryModalClose}
          handleEditToListEntry={handleEditToListEntry}
        />
      </TableRow>
    );
  }
}

const StyledListRow = withStyles(styles)(ListRow);

class ListMode extends React.Component {
  renderHeadings() {
    return (
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Title</TableCell>
          <TableCell>Score</TableCell>
          <TableCell>Progress</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Last Updated</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  renderBody() {
    const {
      listEntries,
      handleDeleteListEntry,
      handleEditToListEntry,
      media
    } = this.props;
    return (
      <TableBody>
        {listEntries.map(listEntry => (
          <StyledListRow
            listEntry={listEntry}
            handleDeleteListEntry={handleDeleteListEntry}
            handleEditToListEntry={handleEditToListEntry}
            media={media}
          />
        ))}
      </TableBody>
    );
  }

  render() {
    return (
      <Paper>
        <Table>
          {this.renderHeadings()}
          {this.renderBody()}
        </Table>
      </Paper>
    );
  }
}

export default ListMode;

import React from "react";

import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  FilledInput,
  MenuItem,
  withStyles,
  Button
} from "@material-ui/core";

import styles from "../reusables/Styles";
import MMLModal from "../reusables/MMLModal";

class ModalContent extends React.Component {
  constructor(props) {
    super(props);
    const { status, score, progress } = props;
    this.state = {
      status,
      score,
      progress
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleModalUpdate = () => {
    const { status, score, progress } = this.state;
    const { handleEditToListEntry, handleModalClose, listEntryId } = this.props;
    handleEditToListEntry(listEntryId, status, score, progress);
    handleModalClose();
  };

  render() {
    const { status, score, progress } = this.state;
    const { cover, title, episodes, classes } = this.props;
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "900px",
            height: "383px",
            position: "relative"
          }}
        >
          <img
            src={cover}
            style={{
              display: "block",
              maxWidth: "250px",
              maxHeight: "350px",
              width: "auto",
              height: "auto",
              paddingLeft: "15px",
              paddingBottom: "15px"
            }}
            alt="cover"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "20px",
              paddingRight: "20px",
              flexGrow: 1
            }}
          >
            <Typography component="h1" variant="title">
              {`Add ${title} to your list`}
            </Typography>

            <div style={{ paddingTop: "5px" }}>
              <Typography variant="subtitle1">Your Status</Typography>
              <FormControl
                variant="filled"
                style={{
                  width: "180px",
                  minWidth: 120,
                  fullWidth: true,
                  display: "flex"
                }}
              >
                <InputLabel htmlFor="filled-age-simple">Status</InputLabel>
                <Select
                  value={status}
                  onChange={this.handleChange}
                  input={<FilledInput name="status" id="filled-age-simple" />}
                >
                  <MenuItem value="Currently Watching">
                    Currently Watching
                  </MenuItem>
                  <MenuItem value="Finished">Finished</MenuItem>
                  <MenuItem value="Dropped">Dropped</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={{ paddingTop: "5px" }}>
              <Typography variant="subtitle1">Your Score</Typography>
              <FormControl
                variant="filled"
                style={{
                  width: "180px",
                  minWidth: 120,
                  fullWidth: true,
                  display: "flex"
                }}
              >
                <InputLabel htmlFor="filled-age-simple">Score</InputLabel>
                <Select
                  value={score}
                  onChange={this.handleChange}
                  input={<FilledInput name="score" id="filled-age-simple" />}
                >
                  {Array.from(Array(10), (_, x) => x + 1).map(num => (
                    <MenuItem value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div style={{ paddingTop: "5px" }}>
              <Typography variant="subtitle1">Your Progress</Typography>
              <FormControl
                variant="filled"
                style={{
                  width: "180px",
                  minWidth: 120,
                  fullWidth: true,
                  display: "flex"
                }}
              >
                <InputLabel htmlFor="filled-age-simple">Progress</InputLabel>
                <Select
                  value={progress}
                  onChange={this.handleChange}
                  input={<FilledInput name="progress" id="filled-age-simple" />}
                >
                  {Array.from(Array(episodes), (_, x) => x + 1).map(num => (
                    <MenuItem value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "flex-end"
              }}
            >
              <Button
                variant="contained"
                className={classes.button}
                onClick={this.handleModalUpdate}
                color="primary"
              >
                Edit your Entry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const StyledModalContent = withStyles(styles)(ModalContent);

class MyListEditListEntryModal extends React.Component {
  render() {
    const {
      listEntry,
      modalOpen,
      handleModalClose,
      handleEditToListEntry
    } = this.props;
    const {
      id,
      title,
      coverImage,
      totalEpisodes,
      status,
      realScore,
      realProgress
    } = listEntry;
    return (
      <MMLModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        title={title}
      >
        <StyledModalContent
          cover={coverImage}
          title={title}
          handleEditToListEntry={handleEditToListEntry}
          handleModalClose={handleModalClose}
          episodes={totalEpisodes}
          status={status}
          score={realScore}
          progress={realProgress}
          listEntryId={id}
        />
      </MMLModal>
    );
  }
}

export default MyListEditListEntryModal;

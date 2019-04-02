import React from "react";

import {
  Typography,
  TextField,
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
    this.state = {
      score: 1,
      reviewText: ""
    };
  }

  handleReviewTextOnChange = event => {
    this.setState({ reviewText: event.target.value });
  };

  handleScoreChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleModalUpdate = () => {
    const { score, reviewText } = this.state;
    const { handleAddReview, handleModalClose } = this.props;
    handleAddReview(score, reviewText);
    handleModalClose();
  };

  render() {
    const { score, reviewText } = this.state;
    const { cover, title, classes } = this.props;
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
              {`Add Review for ${title}`}
            </Typography>

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
                  onChange={this.handleScoreChange}
                  input={<FilledInput name="score" id="filled-age-simple" />}
                >
                  {" "}
                  {Array.from(Array(10), (_, x) => x + 1).map(num => (
                    <MenuItem value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div style={{ paddingTop: "5px" }}>
              <Typography variant="subtitle1">Your review</Typography>
              <TextField
                id="outlined-multiline-static"
                label="Review"
                multiline
                defaultValue="Default Value"
                margin="normal"
                variant="filled"
                error={reviewText.length === 0}
                helperText={
                  reviewText.length === 0
                    ? "Fill in review text, do not leave empty"
                    : ""
                }
                value={reviewText}
                onChange={this.handleReviewTextOnChange}
                fullWidth
                rows={6}
                rowsMax={6}
                style={{ marginTop: "8px" }}
              />
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
                disabled={reviewText.length === 0}
                color="primary"
              >
                Add Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const StyledModalContent = withStyles(styles)(ModalContent);

class ReviewModal extends React.Component {
  render() {
    const {
      mediaEntry,
      modalOpen,
      handleModalClose,
      handleAddReview
    } = this.props;
    const { id, coverImage, bannerImage, title } = mediaEntry;
    return (
      <MMLModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        title={title}
      >
        <StyledModalContent
          cover={coverImage}
          banner={bannerImage}
          title={title}
          handleAddReview={handleAddReview}
          handleModalClose={handleModalClose}
        />
      </MMLModal>
    );
  }
}

export default ReviewModal;

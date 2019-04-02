import React from "react";
import {
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FilledInput
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ReusablePaper from "../reusables/ReusablePaper";
import styles from "../reusables/Styles";

class MyListOptionsPanel extends React.Component {
  render() {
    const { handleChange, displayStatus, sort } = this.props;
    const { classes } = this.props;
    return (
      <form className={classes.optionRoot}>
        <ReusablePaper>
          <Typography component="h3" variant="h5">
            Options
          </Typography>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-simple">Display</InputLabel>
            <Select
              value={displayStatus}
              onChange={handleChange}
              input={<FilledInput name="type" id="filled-age-simple" />}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="watching">Currently Watching</MenuItem>
              <MenuItem value="finished">Finished</MenuItem>
              <MenuItem value="dropped">Dropped</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-simple">Sort</InputLabel>
            <Select
              value={sort}
              onChange={handleChange}
              input={<FilledInput name="sort" id="filled-age-simple" />}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="score">Score</MenuItem>
            </Select>
          </FormControl>
        </ReusablePaper>
      </form>
    );
  }
}

export default withStyles(styles)(MyListOptionsPanel);

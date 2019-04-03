import React from "react";
import ReusablePaper from "../reusables/ReusablePaper";
import {
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FilledInput
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "../reusables/Styles";

class OptionsPanel extends React.Component {
  render() {
    const { handleChange, type, sort } = this.props;
    const { classes } = this.props;
    console.log(type);
    return (
      <form className={classes.optionRoot}>
        <ReusablePaper>
          <Typography component="h3" variant="h5">
            Options
          </Typography>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-simple">Type</InputLabel>
            <Select
              value={type}
              onChange={handleChange}
              input={<FilledInput name="type" id="filled-age-simple" />}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="TV">TV</MenuItem>
              <MenuItem value="MOVIE">Movie</MenuItem>
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

export default withStyles(styles)(OptionsPanel);

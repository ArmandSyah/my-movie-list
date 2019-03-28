import React from "react";

import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  withStyles,
  CssBaseline
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import styles from "../reusables/Styles";
import ReusablePaper from "../reusables/ReusablePaper";

class BrowsePage extends React.Component {
  state = {
    searchValue: "",
    searchEmpty: false
  };

  handleSearchOnChange = event => {
    this.setState({
      searchEmpty: false,
      searchValue: event.target.value
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSearchOnClick();
      event.preventDefault();
    }
  };

  render() {
    const { searchEmpty, searchValue } = this.state;
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <div style={{ paddingTop: "15px" }}>
          <Typography component="h1" variant="h2" align="center">
            Browse
          </Typography>
          <form className={classes.form}>
            <TextField
              id="search-field"
              variant="filled"
              label="Search"
              type="text"
              fullWidth
              value={searchValue}
              onChange={this.handleSearchOnChange}
              onKeyPress={this.handleKeyPress}
              error={searchEmpty}
              helperText={
                searchEmpty ? "Please type a query into the search bar" : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.handleSearchOnClick}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </form>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(BrowsePage);

import React from "react";

import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  withStyles,
  CssBaseline,
  CircularProgress
} from "@material-ui/core";
import { Search, CenterFocusStrong } from "@material-ui/icons";
import styles from "../reusables/Styles";

import ResultsDisplayer from "./ResultsDisplayer";
import OptionsPanel from "./OptionsPanel";

class BrowsePage extends React.Component {
  constructor(props) {
    super(props);
    const { customBackendData } = this.props;
    this.state = {
      searchValue: "",
      searchEmpty: false,
      loading: false,
      success: false,
      open: false,
      media: customBackendData.media,
      searchResults: [],
      displayedResults: [],
      type: "all",
      sort: "name"
    };
  }

  filterResults(results) {
    const { type, sort } = this.state;
    let currentResults = results;
    switch (type) {
      case "tv":
        currentResults = currentResults.filter(result => result.type === "tv");
        break;
      case "movie":
        currentResults = currentResults.filter(
          result => result.type === "movie"
        );
        break;
      case "all":
      default:
        break;
    }

    switch (sort) {
      case "name":
        currentResults.sort((a, b) => {
          const aTitle = a.title.toLowerCase();
          const bTitle = b.title.toLowerCase();

          return bTitle > aTitle ? -1 : aTitle > bTitle ? 1 : 0;
        });
        break;
      case "date":
        currentResults.sort((a, b) => {
          const aDate = a["start date"];
          const bDate = b["start date"];

          return new Date(aDate) - new Date(bDate);
        });
        break;
      case "score":
        currentResults.sort((a, b) => {
          const aScore = a.averageScore;
          const bScore = b.averageScore;

          return bScore - aScore;
        });
        break;
      default:
        break;
    }
    return currentResults;
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleSearchOnClick = () => {
    const { searchValue, media } = this.state;

    if (searchValue.length === 0) {
      this.setState({ searchEmpty: true });
      return;
    }

    this.setState({ searchResults: [], searchClicked: false });

    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true
        },
        () => {
          this.timer = setTimeout(() => {
            const searchResults = media.filter(m =>
              m.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            console.log(searchResults);
            this.setState({
              loading: false,
              success: true,
              open: true,
              searchResults,
              displayedResults: this.filterResults(searchResults)
            });
          }, 1500);
        }
      );
    }
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

  handleChange = event => {
    console.log(event.target.value);
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { searchResults } = this.state;
      this.setState({ displayedResults: this.filterResults(searchResults) });
    });
  };

  render() {
    const {
      searchEmpty,
      searchValue,
      displayedResults,
      loading,
      type,
      sort
    } = this.state;
    const { classes, handleEnteringMediaEntry } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <CssBaseline />
        <div style={{ paddingLeft: "35px" }}>
          <OptionsPanel
            handleChange={this.handleChange}
            type={type}
            sort={sort}
          />
        </div>
        <div
          style={{
            flexGrow: 2,
            paddingTop: "2%",
            paddingLeft: "15%",
            paddingRight: "23%"
          }}
        >
          <div>
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
              <ResultsDisplayer
                media={displayedResults}
                handleEnteringMediaEntry={handleEnteringMediaEntry}
              />
              {loading && (
                <CircularProgress
                  size={48}
                  className={classes.buttonProgress}
                  color="secondary"
                />
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BrowsePage);

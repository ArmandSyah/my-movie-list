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
import { Search } from "@material-ui/icons";
import styles from "../reusables/Styles";

import OptionsPanel from "./OptionsPanel";
import ResultsDisplayer from "./ResultsDisplayer";

const filterResults = (results, type, sort) => {
  let currentResults = results;
  switch (type) {
    case "TV":
      currentResults = currentResults.filter(result => result.type === "TV");
      break;
    case "MOVIE":
      currentResults = currentResults.filter(result => result.type === "MOVIE");
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
};

class BrowsePage extends React.Component {
  constructor(props) {
    super(props);
    const { customBackendData, currentSearchText } = this.props;
    const { media } = customBackendData;

    const type = "all";
    const sort = "name";

    const searchResults =
      currentSearchText === ""
        ? []
        : customBackendData.media.filter(m =>
            m.title.toLowerCase().includes(currentSearchText.toLowerCase())
          );
    const displayedResults =
      currentSearchText === "" ? [] : filterResults(searchResults, type, sort);
    this.state = {
      searchValue: currentSearchText,
      searchEmpty: false,
      loading: false,
      success: false,
      open: false,
      media,
      searchResults,
      displayedResults,
      type,
      sort
    };
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

    this.setState({
      searchResults: [],
      displayedResults: [],
      searchClicked: false
    });

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
              displayedResults: filterResults(
                searchResults,
                this.state.type,
                this.state.sort
              )
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
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { searchResults } = this.state;
      this.setState({
        displayedResults: filterResults(
          searchResults,
          this.state.type,
          this.state.sort
        )
      });
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

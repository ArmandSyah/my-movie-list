import React, { Component } from "react";
import NavBar from "./reusables/NavBar";
import HomePage from "./homepage/HomePage";
import "./App.css";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4A86E8"
    },
    secondary: {
      main: "#6BCDFD"
    },
    background: { default: "#6BCDFD" }
  }
});

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={theme}>
          <NavBar />
          <HomePage />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;

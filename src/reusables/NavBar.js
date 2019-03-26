import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import styles from "./Styles";

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              MyMovieList
            </Typography>

            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(NavBar);

// {/* {revealIcons && (
//               <div className={classes.sectionDesktop}>
//                 <Tooltip title="Timeline">
//                   <IconButton
//                     color="inherit"
//                     onClick={handleCurrentPageChange("Timeline")}
//                   >
//                     <Timeline />
//                   </IconButton>
//                 </Tooltip>

//                 <Tooltip title="Search">
//                   <IconButton
//                     color="inherit"
//                     onClick={handleCurrentPageChange("Search")}
//                   >
//                     <Search />
//                   </IconButton>
//                 </Tooltip>

//                 <Tooltip title="Settings">
//                   <IconButton
//                     color="inherit"
//                     onClick={handleCurrentPageChange("Settings")}
//                   >
//                     <Settings />
//                   </IconButton>
//                 </Tooltip>

//                 <Tooltip title="Sign Out">
//                   <IconButton color="inherit" onClick={handleSignout}>
//                     <ExitToApp />
//                   </IconButton>
//                 </Tooltip>
//               </div>
//             )} */}

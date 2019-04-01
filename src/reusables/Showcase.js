import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import styles from "../reusables/Styles";
import { Typography } from "@material-ui/core";

class Showcase extends React.Component {
  render() {
    const { classes, title, tileData, handleEnteringMediaEntry } = this.props;
    return (
      <div className={classes.showcaseroot}>
        <Typography
          component="h1"
          variant="h2"
          align="left"
          style={{ paddingTop: "10px", paddingBottom: "20px" }}
        >
          {title}
        </Typography>
        <GridList className={classes.gridList} cols={2} cellHeight="360">
          {tileData.map(tile => (
            <GridListTile
              key={tile.coverImage}
              onClick={handleEnteringMediaEntry(tile.id)}
              style={{ cursor: "pointer" }}
            >
              <img src={tile.coverImage} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={
                  <span>
                    Score: {tile.averageScore}/10 - Date: {tile["start date"]} -
                    Type: {tile.type}
                  </span>
                }
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(Showcase);

import React from "react";
import { withStyles } from "@material-ui/core/styles";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import styles from "../reusables/Styles";

class Card extends GridListTile {
  state = {
    hover: false
  };

  handleOnMouseEnter = () => {
    this.setState({ hover: true });
  };

  handleOnMouseLeave = () => {
    this.setState({ hover: false });
  };

  render() {
    const { tile, classes } = this.props;
    return (
      <div
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        <img src={tile.coverImage} alt={tile.title} />
        <GridListTileBar
          title={tile.title}
          subtitle={
            <span>
              Score: {tile.score} - Progress: {tile.progress} - Type:
              {tile.type} - Status: {tile.status}
            </span>
          }
          actionIcon={
            <div>
              <IconButton className={classes.cardModeIcon}>
                <InfoIcon />
              </IconButton>
            </div>
          }
        />
      </div>
    );
  }
}

const MyListCard = withStyles(styles)(Card);

class CardMode extends React.Component {
  render() {
    const { classes, listEntries, handleEnteringMediaEntry } = this.props;
    return (
      <div className={classes.cardModeRoot}>
        <GridList cellHeight={180} spacing={15}>
          {listEntries.map(tile => (
            <GridListTile>
              <img src={tile.coverImage} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={
                  <span>
                    Score: {tile.score} - Progress: {tile.progress} - Type:
                    {tile.type} - Status: {tile.status}
                  </span>
                }
                actionIcon={
                  <div>
                    <IconButton className={classes.cardModeIcon}>
                      <InfoIcon />
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(CardMode);

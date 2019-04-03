import React from "react";
import { withStyles } from "@material-ui/core/styles";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import styles from "../reusables/Styles";

class CardMode extends React.Component {
  state = {
    hover: false,
    selectedListEntry: null
  };

  handleMouseOver = selectedListEntry => () => {
    this.setState({ hover: true, selectedListEntry });
  };

  handleMouseLeave = () => {
    this.setState({ hover: false, selectedListEntry: null });
  };
  render() {
    const { hover, selectedListEntry } = this.state;
    const { classes, media, handleEnteringMediaEntry } = this.props;
    return (
      <div className={classes.cardModeRoot}>
        <GridList cellHeight={180} spacing={15}>
          {media.map(tile => (
            <GridListTile key={tile.title}>
              <img src={tile.coverImage} alt={tile.title} />
              <GridListTileBar
                title={
                  <div
                    onClick={handleEnteringMediaEntry(tile.id)}
                    onMouseEnter={this.handleMouseOver(tile)}
                    onMouseLeave={this.handleMouseLeave}
                    style={{
                      cursor: "pointer",
                      color:
                        hover && selectedListEntry === tile
                          ? "#7d80d1"
                          : "inherit"
                    }}
                  >
                    {tile.title}
                  </div>
                }
                subtitle={
                  <span>
                    Score: {tile.averageScore}/10 - Start Date:{" "}
                    {tile["start date"]} - Type: {tile.type}
                  </span>
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

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import styles from "../reusables/Styles";
import { Typography } from "@material-ui/core";

class Showcase extends React.Component {
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
        <GridList className={classes.gridList} cols={2} cellHeight="625">
          {tileData.map(tile => (
            <GridListTile key={tile.coverImage}>
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
                    Score: {tile.averageScore}/10 - Date: {tile["start date"]} -
                    Type: {tile.type}
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

export default withStyles(styles)(Showcase);

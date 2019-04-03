import React from "react";
import { withStyles } from "@material-ui/core/styles";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import styles from "../reusables/Styles";

class CardMode extends React.Component {
  render() {
    const { classes, media, handleEnteringMediaEntry } = this.props;
    return (
      <div className={classes.cardModeRoot}>
        <GridList cellHeight={180} spacing={15}>
          {media.map(tile => (
            <GridListTile
              key={tile.title}
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
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles)(CardMode);

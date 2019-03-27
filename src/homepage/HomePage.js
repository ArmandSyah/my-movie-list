import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import CssBaseline from "@material-ui/core/CssBaseline";
import styles from "../reusables/Styles";
import Showcase from "../reusables/Showcase";
import Timeline from "../reusables/Timeline";

const tileData = [
  {
    img:
      "https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD",
    title: "image",
    author: "Armand"
  },
  {
    img:
      "https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD",
    title: "image",
    author: "Armand"
  },
  {
    img:
      "https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD",
    title: "image",
    author: "Armand"
  },
  {
    img:
      "https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD",
    title: "image",
    author: "Armand"
  },
  {
    img:
      "https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD",
    title: "image",
    author: "Armand"
  }
];

class HomePage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main>
        <CssBaseline />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "25px",
              flex: 2
            }}
          >
            <Showcase title="Newest Release" tileData={tileData} />
            <Showcase title="Most Popular" tileData={tileData} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              //   padding: "25px",
              flex: 1
            }}
          >
            <Timeline />
          </div>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(HomePage);

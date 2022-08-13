import React, { Component, Fragment } from "react";

import Movies from "./movies/Movies";
import Serials from "./serials/Serials";
import Anime from "./anime/Anime";

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Movies />
        <Serials />
        <Anime />
      </Fragment>
    );
  }
}

export default Dashboard;

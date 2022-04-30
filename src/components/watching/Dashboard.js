import React, { Component, Fragment } from "react";

import Movies from "./movies/Movies";
import Serials from "./serials/Serials";
import Anime from "./anime/Anime";
import VideoForm from "./watchio_components/VideoForm";

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <VideoForm />
        <Movies />
        <Serials />
        <Anime />
      </Fragment>
    );
  }
}

export default Dashboard;

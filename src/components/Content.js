import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import Header from "./layout/Header";
import Home from "./Home";
import WatchioDashboard from "./watching/Dashboard";
import GameioDashboard from "./gaming/Dashboard";
import ReadioDashboard from "./reading/Dashboard";
import ContentioDashboard from "./contenting/Dashboard";
import AudioDashboard from "./listening/Dashboard";

import Movies from "./watching/movies/Movies";
import Serials from "./watching/serials/Serials";
import Anime from "./watching/anime/Anime";
import ThemeChanger from "./layout/ThemeChanger";
import {
  ANIME_URL,
  AUDIO_URL,
  CONTENTIO_URL,
  GAMEIO_URL,
  MOVIES_URL,
  READIO_URL,
  SERIALS_URL,
  WATCHIO_URL,
} from "../util/urls";

class Content extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
  };

  render() {
    if (this.props.isLoading)
      return <div className="text-gray-100">Loading....</div>;

    return (
      <Router>
        <div
          className={`text-gray-100 ${this.props.theme} bg-gradient-to-t from-secondary to-tertiary min-h-screen`}
        >
          <ThemeChanger />
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path={WATCHIO_URL}>
              <WatchioDashboard />
            </Route>
            <Route exact path={MOVIES_URL}>
              <Movies />
            </Route>
            <Route exact path={SERIALS_URL}>
              <Serials />
            </Route>
            <Route exact path={ANIME_URL}>
              <Anime />
            </Route>
            <Route exact path={GAMEIO_URL}>
              <GameioDashboard />
            </Route>
            <Route exact path={READIO_URL}>
              <ReadioDashboard />
            </Route>
            <Route exact path={CONTENTIO_URL}>
              <ContentioDashboard />
            </Route>
            <Route exact path={AUDIO_URL}>
              <AudioDashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.page.isLoading,
  theme: state.page.theme,
});

export default connect(mapStateToProps, null)(Content);

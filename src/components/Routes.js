import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import {
  ANIME_URL,
  AUDIO_URL,
  CONTENTIO_URL,
  GAMEIO_URL,
  MOVIES_URL,
  READIO_URL,
  SERIALS_URL,
  WATCHIO_URL,
  HELPERS_URL,
} from "../util/frontend-urls";

const Home = React.lazy(() => import("./Home"));
const WatchioDashboard = React.lazy(() => import("./watching/Dashboard"));
const GameioDashboard = React.lazy(() => import("./gaming/Dashboard"));
const ReadioDashboard = React.lazy(() => import("./reading/Dashboard"));
const ContentioDashboard = React.lazy(() => import("./contenting/Dashboard"));
const AudioDashboard = React.lazy(() => import("./listening/Dashboard"));
const HelpersDashboard = React.lazy(() => import("./helpers/Dashboard"));
const Movies = React.lazy(() => import("./watching/movies/Movies"));
const Serials = React.lazy(() => import("./watching/serials/Serials"));
const Anime = React.lazy(() => import("./watching/anime/Anime"));

class Routes extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  renderLoading = () => <div>Loading ... </div>;

  render() {
    if (this.props.isLoading) return this.renderLoading();

    return (
      <Suspense fallback={this.renderLoading()}>
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
          <Route exact path={HELPERS_URL}>
            <HelpersDashboard />
          </Route>
        </Switch>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.page.isLoading,
});

export default connect(mapStateToProps, null)(Routes);

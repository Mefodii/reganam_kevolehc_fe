import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import {
  ANIME_URL,
  AUDIO_URL,
  CONTENTING_URL,
  GAMING_URL,
  MOVIES_URL,
  READING_URL,
  SERIALS_URL,
  WATCHING_URL,
  HELPERS_URL,
} from '../util/frontend-urls';
import { selectStatus as selectWatchingStatus } from '../features/watching/info/infoSlice';
import { selectStatus as selectContentingStatus } from '../features/contenting/info/infoSlice';
import { isAPIStatusRequestDone } from '../util/functions';

const Home = React.lazy(() => import('./Home'));
const WatchingDashboard = React.lazy(() => import('./watching/Dashboard'));
const GamingDashboard = React.lazy(() => import('./gaming/Dashboard'));
const ReadingDashboard = React.lazy(() => import('./reading/Dashboard'));
const ContentingDashboard = React.lazy(() => import('./contenting/Dashboard'));
const AudioDashboard = React.lazy(() => import('./listening/Dashboard'));
const HelpersDashboard = React.lazy(() => import('./helpers/Dashboard'));
const Movies = React.lazy(() => import('./watching/movies/Movies'));
const Serials = React.lazy(() => import('./watching/serials/Serials'));
const Anime = React.lazy(() => import('./watching/anime/Anime'));

class Routes extends Component {
  static propTypes = {
    watchingInfoStatus: PropTypes.string.isRequired,
    contentingInfoStatus: PropTypes.string.isRequired,
  };

  renderLoading = () => <div>Loading ... </div>;

  render() {
    const { watchingInfoStatus, contentingInfoStatus } = this.props;
    const isLoading = !(
      isAPIStatusRequestDone(watchingInfoStatus) &&
      isAPIStatusRequestDone(contentingInfoStatus)
    );
    if (isLoading) return this.renderLoading();

    return (
      <Suspense fallback={this.renderLoading()}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path={WATCHING_URL}>
            <WatchingDashboard />
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
          <Route exact path={GAMING_URL}>
            <GamingDashboard />
          </Route>
          <Route exact path={READING_URL}>
            <ReadingDashboard />
          </Route>
          <Route exact path={CONTENTING_URL}>
            <ContentingDashboard />
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
  watchingInfoStatus: selectWatchingStatus(state),
  contentingInfoStatus: selectContentingStatus(state),
});

export default connect(mapStateToProps, null)(Routes);

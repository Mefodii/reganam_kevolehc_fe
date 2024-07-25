import { Suspense, lazy } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import { FE_URL } from '../util/frontend-urls';
import { WatchingType } from '../api/api-utils';

const Home = lazy(() => import('../features/home/Home'));
const GamingDashboard = lazy(
  () => import('../features/gaming/layout/Dashboard')
);
const ReadingDashboard = lazy(
  () => import('../features/reading/layout/Dashboard')
);
const ContentingDashboard = lazy(
  () => import('../features/contenting/layout/Dashboard')
);
const ContentWatcherDashboard = lazy(
  () => import('../features/contenting/layout/ContentWatcherDashboard')
);
const ContentListDashboard = lazy(
  () => import('../features/contenting/layout/ContentListDashboard')
);
const TracksDashboard = lazy(
  () => import('../features/listening/layout/TracksDashboard')
);
const ArtistsDashboard = lazy(
  () => import('../features/listening/layout/ArtistsDashboard')
);
const HelpersDashboard = lazy(() => import('../features/helpers/Dashboard'));
const WatchingDashboard = lazy(
  () => import('../features/watching/layout/Dashboard')
);

const Routes = () => {
  const renderLoading = () => <div>Loading ... </div>;

  return (
    <Suspense fallback={renderLoading()}>
      <ReactRoutes>
        <Route path='/' element={<Home />} />
        <Route
          path={FE_URL.MOVIES}
          element={<WatchingDashboard watchingType={WatchingType.MOVIE} />}
        />
        <Route
          path={FE_URL.SERIALS}
          element={<WatchingDashboard watchingType={WatchingType.SERIAL} />}
        />
        <Route
          path={FE_URL.ANIME}
          element={<WatchingDashboard watchingType={WatchingType.ANIME} />}
        />
        <Route path={FE_URL.GAMING} element={<GamingDashboard />} />
        <Route path={FE_URL.READING} element={<ReadingDashboard />} />
        <Route path={FE_URL.CONTENTING}>
          <Route index={true} element={<ContentingDashboard />} />
          <Route
            path={`content_watcher/:id`}
            element={<ContentWatcherDashboard />}
          />
          <Route path={`content_list/:id`} element={<ContentListDashboard />} />
        </Route>
        <Route path={FE_URL.AUDIO_TRACKS} element={<TracksDashboard />} />
        <Route path={FE_URL.AUDIO_ARTISTS} element={<ArtistsDashboard />} />
        <Route path={FE_URL.HELPERS} element={<HelpersDashboard />} />
      </ReactRoutes>
    </Suspense>
  );
};

export default Routes;

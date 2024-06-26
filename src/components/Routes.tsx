import { Suspense, lazy } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import { FE_URL } from '../util/frontend-urls';

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
const AudioDashboard = lazy(
  () => import('../features/listening/layout/Dashboard')
);
const HelpersDashboard = lazy(() => import('../features/helpers/Dashboard'));
const Movies = lazy(() => import('../features/watching/layout/Movies'));
const Serials = lazy(() => import('../features/watching/layout/Serials'));
const Anime = lazy(() => import('../features/watching/layout/Anime'));

const Routes = () => {
  const renderLoading = () => <div>Loading ... </div>;

  return (
    <Suspense fallback={renderLoading()}>
      <ReactRoutes>
        <Route path='/' element={<Home />} />
        <Route path={FE_URL.MOVIES} element={<Movies />} />
        <Route path={FE_URL.SERIALS} element={<Serials />} />
        <Route path={FE_URL.ANIME} element={<Anime />} />
        <Route path={FE_URL.GAMING} element={<GamingDashboard />} />
        <Route path={FE_URL.READING} element={<ReadingDashboard />} />
        <Route path={FE_URL.CONTENTING}>
          <Route index={true} element={<ContentingDashboard />} />
          <Route
            path={`content_watcher/:id`}
            element={<ContentWatcherDashboard />}
          />
        </Route>
        <Route path={FE_URL.AUDIO} element={<AudioDashboard />} />
        <Route path={FE_URL.HELPERS} element={<HelpersDashboard />} />
      </ReactRoutes>
    </Suspense>
  );
};

export default Routes;

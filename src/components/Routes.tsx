import { Suspense, lazy } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { useAppSelector } from '../hooks';

import { FE_URL } from '../util/frontend-urls';
import { isAPIStatusRequestDone } from '../util/functions';

import { selectStatus as selectWatchingStatus } from '../features/watching/info/infoSlice';
import { selectStatus as selectContentingStatus } from '../features/contenting/info/infoSlice';

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
const AudioDashboard = lazy(
  () => import('../features/listening/layout/Dashboard')
);
const HelpersDashboard = lazy(() => import('../features/helpers/Dashboard'));
const WatchingDashboard = lazy(
  () => import('../features/watching/layout/Dashboard')
);
const Movies = lazy(() => import('../features/watching/layout/Movies'));
const Serials = lazy(() => import('../features/watching/layout/Serials'));
const Anime = lazy(() => import('../features/watching/layout/Anime'));

const Routes = () => {
  const watchingInfoStatus = useAppSelector(selectWatchingStatus);
  const contentingInfoStatus = useAppSelector(selectContentingStatus);

  const renderLoading = () => <div>Loading ... </div>;

  const isLoading = !(
    isAPIStatusRequestDone(watchingInfoStatus) &&
    isAPIStatusRequestDone(contentingInfoStatus)
  );
  if (isLoading) return renderLoading();

  return (
    <Suspense fallback={renderLoading()}>
      <ReactRoutes>
        <Route path='/' element={<Home />} />
        <Route path={FE_URL.WATCHING} element={<WatchingDashboard />} />
        <Route path={FE_URL.MOVIES} element={<Movies />} />
        <Route path={FE_URL.SERIALS} element={<Serials />} />
        <Route path={FE_URL.ANIME} element={<Anime />} />
        <Route path={FE_URL.GAMING} element={<GamingDashboard />} />
        <Route path={FE_URL.READING} element={<ReadingDashboard />} />
        <Route path={FE_URL.CONTENTING} element={<ContentingDashboard />} />
        <Route path={FE_URL.AUDIO} element={<AudioDashboard />} />
        <Route path={FE_URL.HELPERS} element={<HelpersDashboard />} />
      </ReactRoutes>
    </Suspense>
  );
};

export default Routes;

import { Suspense, lazy } from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { WatchingType } from '../api/api-utils';
import { FE_URL } from '../util/frontend-urls';

const Home = lazy(() =>
  import('../features/home/Home').then((module) => ({ default: module.Home }))
);
const GamingDashboard = lazy(() =>
  import('../features/gaming/layout/GamingDashboard').then((module) => ({
    default: module.GamingDashboard,
  }))
);
const ReadingDashboard = lazy(() =>
  import('../features/reading/layout/ReadingDashboard').then((module) => ({
    default: module.ReadingDashboard,
  }))
);
const ContentingDashboard = lazy(() =>
  import('../features/contenting/layout/ContentingDashboard').then(
    (module) => ({
      default: module.ContentingDashboard,
    })
  )
);
const ContentWatcherDashboard = lazy(() =>
  import('../features/contenting/layout/ContentWatcherDashboard').then(
    (module) => ({
      default: module.ContentWatcherDashboard,
    })
  )
);
const ContentListDashboard = lazy(() =>
  import('../features/contenting/layout/ContentListDashboard').then(
    (module) => ({ default: module.ContentListDashboard })
  )
);
const TracksDashboard = lazy(() =>
  import('../features/listening/layout/TracksDashboard').then((module) => ({
    default: module.TracksDashboard,
  }))
);
const ArtistsDashboard = lazy(() =>
  import('../features/listening/layout/ArtistsDashboard').then((module) => ({
    default: module.ArtistsDashboard,
  }))
);
const HelpersDashboard = lazy(() =>
  import('../features/helpers/HelpersDashboard').then((module) => ({
    default: module.HelpersDashboard,
  }))
);
const WatchingDashboard = lazy(() =>
  import('../features/watching/layout/Dashboard').then((module) => ({
    default: module.WatchingDashboard,
  }))
);

export const Routes = () => {
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

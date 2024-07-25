import { useEffect } from 'react';
import { LoadingOverlay } from '../../../components/generic';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fetchTracks,
  selectAllTracks,
  selectPageInfo,
} from '../tracks/tracksSlice';
import TracksTable from '../tracks/TracksTable';
import TrackSearch from '../tracks/TrackSearch';

export const TracksDashboard = () => {
  const dispatch = useAppDispatch();

  const tracks = useAppSelector(selectAllTracks);
  const tracksPageInfo = useAppSelector(selectPageInfo);

  useEffect(() => {
    const req = dispatch(fetchTracks({}));
    return () => {
      req.abort();
    };
  }, [dispatch]);

  if (!tracksPageInfo) return <LoadingOverlay />;

  return (
    <div className='flex flex-1 flex-col items-center mono-font'>
      <div className='flex flex-col rounded-xl shadow-md space-y-5 w-10/12 p-5 my-5 bg-theme-1 border-2 border-theme-3 overflow-hidden'>
        <TrackSearch />
        <TracksTable tracks={tracks} pageInfo={tracksPageInfo} />
      </div>
    </div>
  );
};

export default TracksDashboard;

import React, { useEffect } from 'react';
import { LoadingOverlay } from '../../../components/generic';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ArtistSearch } from '../artists/ArtistSearch';
import {
  fetchArtists,
  selectAllArtists,
  selectPageInfo,
} from '../artists/artistsSlice';
import { ArtistsTable } from '../artists/ArtistsTable';

export const ArtistsDashboard = React.memo(() => {
  const dispatch = useAppDispatch();

  const artists = useAppSelector(selectAllArtists);
  const artistsPageInfo = useAppSelector(selectPageInfo);

  useEffect(() => {
    const req = dispatch(fetchArtists({}));
    return () => {
      req.abort();
    };
  }, [dispatch]);

  if (!artistsPageInfo) return <LoadingOverlay />;

  return (
    <div className='flex flex-1 flex-col items-center mono-font'>
      <div className='flex flex-col rounded-xl shadow-md space-y-5 w-10/12 p-5 my-5 bg-theme-1 border-2 border-theme-3 overflow-hidden'>
        <ArtistSearch />
        <ArtistsTable artists={artists} pageInfo={artistsPageInfo} />
      </div>
    </div>
  );
});

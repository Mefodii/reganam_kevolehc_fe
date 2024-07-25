import React, { useState } from 'react';
import { Text } from '../../../components/form';
import { Button } from '../../../components/buttons';
import { SVGMagnifyingGlass } from '../../../components/svg';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchTracks, selectPageInfo } from './tracksSlice';

type TrackSearchProps = {};

const TrackSearch: React.FC<TrackSearchProps> = (props) => {
  const pageInfo = useAppSelector(selectPageInfo);

  const [trackSearch, setTrackSearch] = useState(
    pageInfo?.currentParams.trackSearch || ''
  );
  const dispatch = useAppDispatch();

  const handleTitleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (pageInfo?.currentParams.trackSearch === trackSearch) return;

    dispatch(
      fetchTracks({
        page: 1,
        trackSearch,
        caseSensitive: false,
      })
    );
  };

  return (
    <div className='w-full flex'>
      <div className='w-full border-2 border-theme-3 bg-theme-2 flex items-center px-4'>
        <Text
          simple
          name='searchTrack'
          onChange={(_, payload) => setTrackSearch(payload.value)}
          onKeyDown={handleTitleKeyDown}
          value={trackSearch}
        />
      </div>
      <Button onClick={handleSearch} className='select-none'>
        <SVGMagnifyingGlass svgClassName='w-5' />
        <div>Search</div>
      </Button>
    </div>
  );
};

export default React.memo(TrackSearch) as typeof TrackSearch;

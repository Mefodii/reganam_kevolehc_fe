import React, { useState } from 'react';
import { Button } from '../../../components/buttons';
import { Text } from '../../../components/form';
import { SVGMagnifyingGlass } from '../../../components/svg';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchArtists, selectPageInfo } from './artistsSlice';

type ArtistSearchProps = {};

export const ArtistSearch = React.memo((props: ArtistSearchProps) => {
  const pageInfo = useAppSelector(selectPageInfo);

  const [artistSearch, setArtistSearch] = useState(
    pageInfo?.currentParams.artistSearch || ''
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
    if (pageInfo?.currentParams.artistSearch === artistSearch) return;

    dispatch(
      fetchArtists({
        page: 1,
        artistSearch,
        caseSensitive: false,
      })
    );
  };

  return (
    <div className='w-full flex'>
      <div className='w-full border-2 border-theme-3 bg-theme-2 flex items-center px-4'>
        <Text
          simple
          name='searchArtist'
          onChange={(_, payload) => setArtistSearch(payload.value)}
          onKeyDown={handleTitleKeyDown}
          value={artistSearch}
        />
      </div>
      <Button onClick={handleSearch} className='select-none'>
        <SVGMagnifyingGlass svgClassName='w-5' />
        <div>Search</div>
      </Button>
    </div>
  );
});

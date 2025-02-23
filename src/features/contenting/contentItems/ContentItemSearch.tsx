import React, { useState } from 'react';
import { Button } from '../../../components/buttons';
import { Text } from '../../../components/form';
import { SVGMagnifyingGlass } from '../../../components/svg';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchContentItems, selectPageInfo } from './contentItemsSlice';

type ContentItemSearchProps = {};

export const ContentItemSearch = React.memo((props: ContentItemSearchProps) => {
  const pageInfo = useAppSelector(selectPageInfo);

  const [titleSearch, setTitleSearch] = useState(
    pageInfo?.currentParams.titleSearch || ''
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
    if (
      pageInfo === undefined ||
      pageInfo?.currentParams.titleSearch === titleSearch
    )
      return;

    dispatch(
      fetchContentItems({
        ...pageInfo.currentParams,
        page: 1,
        titleSearch,
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
          onChange={(_, payload) => setTitleSearch(payload.value)}
          onKeyDown={handleTitleKeyDown}
          value={titleSearch}
        />
      </div>
      <Button onClick={handleSearch} className='select-none'>
        <SVGMagnifyingGlass svgClassName='w-5' />
        <div>Search</div>
      </Button>
    </div>
  );
});

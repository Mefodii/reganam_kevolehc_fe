import React from 'react';
import { useAppSelector } from '../../../hooks';
import { contentFilter as filterModel } from '../../../models';
import { selectCategory, selectSource } from '../filters/filtersSlice';
import { ContentWatcherTable } from './ContentWatcherTable';

type ContentWatcherListProps = {
  contentWatchers: Model.ContentWatcherDM[];
};

export const ContentWatcherList = React.memo(
  ({ contentWatchers }: ContentWatcherListProps) => {
    const category = useAppSelector(selectCategory);
    const source = useAppSelector(selectSource);

    const filteredContentWatchers = filterModel.filterContentWatchers(
      contentWatchers,
      { category, source }
    );

    if (filteredContentWatchers.length === 0)
      return (
        <h2 className='w-full text-center text-xl uppercase font-bold m-4'>
          No Watchers for current filter
        </h2>
      );

    const renderH3 = (text: string, value?: string) => {
      if (!value) return;

      return (
        <h3 className='uppercase font-bold mb-4'>
          {text}: <span className='text-active-1 ml-2 text-sm'>{value}</span>
        </h3>
      );
    };

    return (
      <div className='flex w-full'>
        <div className='w-full flex flex-col items-center'>
          <h2 className='text-xl uppercase font-bold m-4'>Content Watchers</h2>
          {renderH3('Category', category)}
          {renderH3('Source', source)}

          <div className='flex flex-col rounded-xl shadow-md w-10/12 space-y-10 mb-28'>
            <ContentWatcherTable contentWatchers={filteredContentWatchers} />
          </div>
        </div>
      </div>
    );
  }
);

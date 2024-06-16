import React from 'react';
import { selectContentingFilters } from '../filters/filtersSlice';
import { useAppSelector } from '../../../hooks';
import { contentFilter as filterModel } from '../../../models';
import ContentWatcherTable from './ContentWatcherTable';

type ContentWatcherListProps = {
  contentWatchers: Model.ContentWatcherDM[];
};

const filter = (
  contentWatchers: Model.ContentWatcherDM[],
  category?: string,
  type?: string
) => {
  let filteredContentWatchers = filterModel.filterByCategory(
    contentWatchers,
    category
  );
  filteredContentWatchers = filterModel.filterBySourceType(
    filteredContentWatchers,
    type
  );
  return filteredContentWatchers;
};

const ContentWatcherList: React.FC<ContentWatcherListProps> = ({
  contentWatchers,
}) => {
  const { showWatchers, category, watcherType } = useAppSelector(
    selectContentingFilters
  );

  if (!showWatchers) return <></>;

  const filteredContentWatchers = filter(
    contentWatchers,
    category,
    watcherType
  );
  if (filteredContentWatchers.length === 0) return <></>;

  const renderH3 = (text: string, value?: string) => {
    if (!value) return;

    return (
      <h3 className='uppercase font-bold mb-4'>
        {text}: <span className='text-active-1 ml-2 text-sm'>{value}</span>
      </h3>
    );
  };

  return (
    <div className='w-full'>
      <div className='w-full flex flex-col items-center relative'>
        <h2 className='text-xl uppercase font-bold m-4'>Content Watchers</h2>
        {renderH3('Category', category)}
        {renderH3('Type', watcherType)}

        <div className='rounded-xl shadow-md w-10/12 space-y-10 mb-28'>
          <ContentWatcherTable contentWatchers={filteredContentWatchers} />
        </div>
      </div>
    </div>
  );
};

export default ContentWatcherList;

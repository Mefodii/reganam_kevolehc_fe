import React, { useCallback, useMemo, useState } from 'react';
import { WatchingType } from '../../../api/api-utils';
import { useAppSelector } from '../../../hooks';
import { watchingFilter as watchingFilterModel } from '../../../models';
import { selectWatchingFilter } from '../filters/filtersSlice';
import { Sidepanel } from '../layout/Sidepanel';
import { GroupItem } from './GroupItem';

type GroupListProps = {
  groups: Model.GroupDM[];
  watchingType: WatchingType;
  backgroundPicture: string;
};

export const GroupList = React.memo(
  ({ backgroundPicture, groups, watchingType }: GroupListProps) => {
    const watchingFilter = useAppSelector(selectWatchingFilter);
    const { showPosters } = watchingFilter;

    const filteredGroups = useMemo(
      () => watchingFilterModel.filterGroups(groups, watchingFilter),
      [groups, watchingFilter]
    );

    const [hideStartIndex, setHideStartIndex] = useState(-1);

    const handleHideGroups = useCallback(
      (group: Model.GroupDM) => {
        setHideStartIndex(filteredGroups.indexOf(group) - 5);
      },
      [filteredGroups]
    );

    return (
      <div className={`w-full flex flex-1 relative`}>
        <div className='w-full opacity-20 right-0 blur-sm fixed mr-4'>
          <img
            src={backgroundPicture}
            alt='Placeholder'
            className='w-full mr-4 rounded-lg'
            draggable='false'
          />
        </div>

        <div className='w-full flex flex-1 flex-col items-center relative overflow-auto'>
          <h2 className='text-xl uppercase font-bold m-4'>{`Welcome to ${watchingType}, fellow watcher`}</h2>
          <Sidepanel watchingType={watchingType} />

          <div className='flex flex-col rounded-xl shadow-md w-10/12 bg-theme-1 p-8'>
            {filteredGroups.map((group, i) => (
              <GroupItem
                group={group}
                key={group.id}
                showPoster={showPosters}
                hide={i <= hideStartIndex}
                onViewportIn={handleHideGroups}
                onViewportOut={handleHideGroups}
              ></GroupItem>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

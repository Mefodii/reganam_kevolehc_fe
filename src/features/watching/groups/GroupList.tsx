import GroupItem from './GroupItem';
import { watchingFilter as watchingFilterModel } from '../../../models';
import Sidepanel from '../layout/Sidepanel';

import { selectWatchingFilter } from '../filters/filtersSlice';
import { useAppSelector } from '../../../hooks';
import { WatchingType } from '../../../api/api-utils';

type GroupListProps = {
  groups: Model.GroupDM[];
  watchingType: WatchingType;
  backgroundPicture: string;
};

const GroupList: React.FC<GroupListProps> = ({
  backgroundPicture,
  groups,
  watchingType,
}) => {
  const watchingFilter = useAppSelector(selectWatchingFilter);
  const { showPosters } = watchingFilter;

  const filteredGroups = watchingFilterModel.filterGroups(
    groups,
    watchingFilter
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
          {filteredGroups.map((group) => (
            <GroupItem
              group={group}
              key={group.id}
              showPoster={showPosters}
            ></GroupItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupList;

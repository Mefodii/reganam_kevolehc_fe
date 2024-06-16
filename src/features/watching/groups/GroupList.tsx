import GroupItem from './GroupItem';
import { watchingFilter as watchingFilterModel } from '../../../models';
import Sidepanel from '../layout/Sidepanel';

import { selectWatchingFilter } from '../filters/filtersSlice';
import { useAppSelector } from '../../../hooks';
import { ContentContainer } from '../../../components/layout';
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
    <ContentContainer
      backgroundPicture={backgroundPicture}
      title={`Welcome to ${watchingType}, fellow watcher`}
    >
      <Sidepanel watchingType={watchingType} />

      <div className='content-container'>
        {filteredGroups.map((group) => (
          <GroupItem
            group={group}
            key={group.id}
            watchingType={watchingType}
            showPoster={showPosters}
          ></GroupItem>
        ))}
      </div>
    </ContentContainer>
  );
};

export default GroupList;

import React, { useState } from 'react';

import { CompactButton } from '../../../components/buttons';
import { SVGFilter, SVGPlusCircle } from '../../../components/svg';

import { useModal } from '../../../hooks';
import FilterForm from '../filters/FilterForm';
import GroupForm from '../groups/GroupForm';
import VideoForm from '../videos/VideoForm';
import { WatchingType } from '../../../api/api-utils';

type SidepanelProps = {
  watchingType: WatchingType;
};

const Sidepanel: React.FC<SidepanelProps> = ({ watchingType }) => {
  const [mouseIn, setMouseIn] = useState(false);

  const { openModal, closeModal } = useModal();

  const handleMouseEvent = (isMouseIn: boolean) => () => setMouseIn(isMouseIn);

  const handleOpenGroupModal = () => {
    const single = watchingType === WatchingType.MOVIE;
    const edit = false;
    const withToggleSingle = !edit && watchingType === WatchingType.ANIME;

    openModal(
      <GroupForm
        formProps={{
          watchingType,
          single,
          formMode: 'CREATE',
          withToggleSingle,
        }}
        onSuccess={handleCreateGroupSuccess}
      />
    );
  };

  const handleCreateGroupSuccess = (group?: Model.GroupDM) => {
    closeModal();
    if (group && !group.single) {
      openModal(
        <VideoForm
          formProps={{
            groupId: group.id,
            defaultOrder: 1,
            formMode: 'CREATE',
          }}
          onSuccess={() => closeModal()}
        />
      );
    }
  };

  const handleOpenWatchingFilterModal = () => {
    openModal(<FilterForm onSuccess={closeModal} />);
  };

  return (
    <div
      className={`fixed top-64 bg-theme-3/40 border border-theme-2 rounded-3xl shadow-2xl
      transition-all ease-in duration-150 group
      ${!mouseIn && '-left-5'}
      ${mouseIn && '-left-2'}
      `}
      onMouseEnter={handleMouseEvent(true)}
      onMouseLeave={handleMouseEvent(false)}
    >
      <div className='divide-y-2 divide-theme-2 m-2'>
        <CompactButton text='Add Group' onClick={handleOpenGroupModal}>
          <SVGPlusCircle className='w-6 transition-all duration-150' />
        </CompactButton>
        <CompactButton text='Filters' onClick={handleOpenWatchingFilterModal}>
          <SVGFilter className='w-6 transition-all duration-150' />
        </CompactButton>
      </div>
    </div>
  );
};

export default Sidepanel;

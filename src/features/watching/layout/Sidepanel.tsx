import React, { useState } from 'react';

import { CompactButton } from '../../../components/buttons';
import { SVGFilter, SVGPlusCircle } from '../../../components/svg';

import { selectAnimeType, selectMovieType } from '../info/infoSlice';
import {
  openGroupModal,
  openWatchingFilterModal,
} from '../../../redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

type SidepanelProps = {
  watchingType: string;
};

const Sidepanel: React.FC<SidepanelProps> = ({ watchingType }) => {
  const dispatch = useAppDispatch();
  const movieType = useAppSelector(selectMovieType);
  const animeType = useAppSelector(selectAnimeType);

  const [mouseIn, setMouseIn] = useState(false);

  const handleMouseEvent = (isMouseIn: boolean) => () => setMouseIn(isMouseIn);

  const handleOpenGroupModal = () => {
    const single = watchingType === movieType;
    const edit = false;
    const withToggleSingle = !edit && watchingType === animeType;

    dispatch(
      openGroupModal({
        watchingType,
        single,
        formMode: 'CREATE',
        withToggleSingle,
      })
    );
  };

  const handleOpenWatchingFilterModal = () => {
    dispatch(openWatchingFilterModal());
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

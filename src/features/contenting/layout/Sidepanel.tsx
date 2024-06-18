import { SVGPlus } from '../../../components/svg';
import { SideButton } from '../../../components/buttons';
import { SidepanelElement } from '../../../components/layout';

import {
  selectContentingFilters,
  setCategory,
  setLists,
  setWatchers,
} from '../filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useModal } from '../../../hooks';
import ContentWatcherForm from '../contentWatchers/ContentWatcherForm';
import { ContentCategory, ContentWatcherSource } from '../../../api/api-utils';
import React from 'react';

type SidepanelProps = {};

const Sidepanel: React.FC<SidepanelProps> = (props) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectContentingFilters);
  const { openModal, closeModal } = useModal();

  const handleOpenContentWatcherModal = () => {
    openModal(
      <ContentWatcherForm
        formProps={{ formMode: 'CREATE' }}
        onSuccess={closeModal}
      />
    );
  };

  const hangleOpenContentListModal = () => {};

  const handleShowWatchers = (watcherType?: ContentWatcherSource) => {
    dispatch(setWatchers(watcherType));
  };

  const handleShowLists = () => {
    dispatch(setLists());
  };

  const handleShowCategory = (showAll: boolean, category?: ContentCategory) => {
    dispatch(setCategory({ showAll, category }));
  };

  const { showWatchers, showLists, watcherType, category } = filters;

  const renderCategories = () => {
    return (
      <>
        <SidepanelElement
          isSelected={showLists && showWatchers && !category}
          onClick={() => handleShowCategory(true)}
        >
          All Categories
        </SidepanelElement>

        {Object.values(ContentCategory).map((cat, i) => (
          <SidepanelElement
            className={`pl-4`}
            isSelected={showLists && showWatchers && cat === category}
            onClick={() => handleShowCategory(true, cat)}
            key={i}
          >
            - {cat}
          </SidepanelElement>
        ))}
        <div className='side-panel-sep'></div>
      </>
    );
  };

  const renderWatchers = () => {
    return (
      <>
        <SideButton onClick={handleOpenContentWatcherModal}>
          <SVGPlus className='w-5'></SVGPlus>
          <div>Add Watcher</div>
        </SideButton>
        <div className='side-panel-sep'></div>

        <SidepanelElement
          isSelected={showWatchers && !showLists && !watcherType}
          onClick={() => handleShowWatchers()}
        >
          All Watchers
        </SidepanelElement>

        {Object.values(ContentWatcherSource).map((type, i) => (
          <SidepanelElement
            className={`pl-4`}
            isSelected={showWatchers && !showLists && watcherType === type}
            onClick={() => handleShowWatchers(type)}
            key={i}
          >
            - {type}
          </SidepanelElement>
        ))}
        <div className='side-panel-sep'></div>
      </>
    );
  };

  const renderLists = () => {
    return (
      <>
        <SideButton onClick={() => hangleOpenContentListModal()}>
          <SVGPlus className='w-5'></SVGPlus>
          <div>Add List</div>
        </SideButton>
        <div className='side-panel-sep'></div>
        <SidepanelElement
          isSelected={showLists && !showWatchers && !category}
          onClick={() => handleShowLists()}
        >
          Pure Lists
        </SidepanelElement>

        {Object.values(ContentCategory).map((cat, i) => (
          <SidepanelElement
            className={`pl-4`}
            isSelected={showLists && !showWatchers && cat === category}
            onClick={() => handleShowCategory(false, cat)}
            key={i}
          >
            - {cat}
          </SidepanelElement>
        ))}
      </>
    );
  };

  return (
    <div className='side-panel'>
      {renderCategories()}
      {renderWatchers()}
      {renderLists()}
    </div>
  );
};

export default React.memo(Sidepanel);

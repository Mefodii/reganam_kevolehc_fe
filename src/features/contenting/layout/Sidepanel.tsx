import { SVGPlus } from '../../../components/svg';
import { SideButton } from '../../../components/buttons';
import { SidepanelElement } from '../../../components/layout';

import {
  setSource,
  setCategory,
  selectCategory,
  selectSource,
} from '../filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useModal } from '../../../hooks';
import ContentWatcherForm from '../contentWatchers/ContentWatcherForm';
import { ContentCategory, ContentWatcherSource } from '../../../api/api-utils';
import React from 'react';
import ContentListForm from '../contentLists/ContentListForm';

type SidepanelProps = {};

const Sidepanel: React.FC<SidepanelProps> = (props) => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const source = useAppSelector(selectSource);

  const { openModal, closeModal } = useModal();

  const handleOpenContentWatcherModal = () => {
    openModal(
      <ContentWatcherForm
        formProps={{ formMode: 'CREATE' }}
        onSuccess={closeModal}
      />
    );
  };

  const hangleOpenContentListModal = () => {
    openModal(
      <ContentListForm
        formProps={{ formMode: 'CREATE' }}
        onSuccess={closeModal}
      />
    );
  };

  const handleShowWatchers = (source?: ContentWatcherSource) => {
    dispatch(setSource(source));
  };

  const handleShowCategory = (showAll: boolean, category?: ContentCategory) => {
    dispatch(setCategory(category));
  };

  const renderCategories = () => {
    return (
      <>
        <SidepanelElement
          isSelected={!category}
          onClick={() => handleShowCategory(true)}
        >
          All Categories
        </SidepanelElement>

        {Object.values(ContentCategory).map((cat, i) => (
          <SidepanelElement
            className={`pl-4`}
            isSelected={cat === category}
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
          isSelected={!source}
          onClick={() => handleShowWatchers()}
        >
          All Watchers
        </SidepanelElement>

        {Object.values(ContentWatcherSource).map((type, i) => (
          <SidepanelElement
            className={`pl-4`}
            isSelected={source === type}
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

  return (
    <div className='side-panel'>
      {renderCategories()}
      {renderWatchers()}
      <SideButton onClick={() => hangleOpenContentListModal()}>
        <SVGPlus className='w-5'></SVGPlus>
        <div>Add List</div>
      </SideButton>
    </div>
  );
};

export default React.memo(Sidepanel) as typeof Sidepanel;

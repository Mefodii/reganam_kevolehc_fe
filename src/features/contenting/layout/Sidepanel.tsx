import { SVGPlus } from '../../../components/svg';
import { SideButton } from '../../../components/buttons';
import { SidepanelElement } from '../../../components/layout';

import { selectContentWatcherSourceTypes } from '../info/infoSlice';
import {
  selectContentingFilters,
  setLists,
  setWatchers,
} from '../filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useModal } from '../../../hooks/useModal';
import ContentWatcherForm from '../contentWatchers/ContentWatcherForm';

type SidepanelProps = {};

const Sidepanel: React.FC<SidepanelProps> = (props) => {
  const dispatch = useAppDispatch();
  const contentWatcherSourceTypes = useAppSelector(
    selectContentWatcherSourceTypes
  );
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

  const handleShowWatchers = (watcherType?: string) => {
    dispatch(setWatchers(watcherType));
  };

  const handleShowLists = () => {
    dispatch(setLists('TODO'));
  };

  const { showWatchers, showLists, watcherType } = filters;

  return (
    <div className='side-panel'>
      <SideButton onClick={handleOpenContentWatcherModal}>
        <SVGPlus className='w-5'></SVGPlus>
        <div>Add Watcher</div>
      </SideButton>
      <div className='side-panel-sep'></div>

      <SidepanelElement
        isSelected={showWatchers && !watcherType}
        onClick={() => handleShowWatchers()}
      >
        All Watchers
      </SidepanelElement>

      {contentWatcherSourceTypes.map((type, i) => (
        <SidepanelElement
          className={`pl-4`}
          isSelected={showWatchers && watcherType === type}
          onClick={() => handleShowWatchers(type)}
          key={i}
        >
          - {type}
        </SidepanelElement>
      ))}
      <div className='side-panel-sep'></div>

      <SideButton onClick={() => hangleOpenContentListModal()}>
        <SVGPlus className='w-5'></SVGPlus>
        <div>Add List</div>
      </SideButton>
      <div className='side-panel-sep'></div>
      <SidepanelElement
        isSelected={showLists}
        onClick={() => handleShowLists()}
      >
        Other Lists
      </SidepanelElement>
    </div>
  );
};

export default Sidepanel;

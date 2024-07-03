import React from 'react';
import {
  SVGArrowPath,
  SVGDownArrowTray,
  SVGPencil,
} from '../../../components/svg';
import ContentWatcherForm from './ContentWatcherForm';
import { useModal } from '../../../hooks';
import { toLocalDatetime } from '../../../util/datetime';
import { ContentWatcherQuality } from '../../../api/api-utils';

type ContentWatcherDetailsProps = {
  contentWatcher: Model.ContentWatcherDM;
};

const ContentWatcherDetails: React.FC<ContentWatcherDetailsProps> = ({
  contentWatcher,
}) => {
  const {
    name,
    category,
    source_type,
    items_count,
    download,
    video_quality,
    file_extension,
    status,
    check_date,
  } = contentWatcher;
  const { openModal, closeModal } = useModal();

  const handleOpenContentWatcherModal = () => {
    openModal(
      <ContentWatcherForm
        formProps={{
          formMode: 'UPDATE',
          item: contentWatcher,
          scope: 'DETAILS',
        }}
        onSuccess={closeModal}
      />
    );
  };

  const renderActions = () => {
    return (
      <div className='flex space-x-2 divide-x divide-active-1/0 group-hover:divide-active-1/20'>
        <SVGPencil
          className='w-5 wiggling-clickable-group'
          tooltip='Edit'
          onClick={handleOpenContentWatcherModal}
        />
        <SVGArrowPath
          className='ml-2 w-5 wiggling-clickable-group'
          tooltip='Check for Updates'
        />
      </div>
    );
  };

  return (
    <div className='flex flex-col bg-theme-2 border border-theme-2 justify-between items-center p-3 rounded-md group'>
      <div className='flex flex-wrap justify-between w-full py-2'>
        <div className='text-3xl ml-4 border-b-2 border-active-1/30 min-w-120'>
          {name}
        </div>
        <div className='space-y-2 text-center w-20 border-b-2 border-active-1/30'>
          <div className='text-xs'>Category</div>
          <div className='font-bold'>{category}</div>
        </div>
        <div className='space-y-2 text-center w-20 border-b-2 border-active-1/30'>
          <div className='text-xs'>Type</div>
          <div className='font-bold'>{source_type}</div>
        </div>
        <div className='space-y-2 text-center w-20 border-b-2 border-active-1/30'>
          <div className='text-xs'>Ext.</div>
          <div className='font-bold'>{file_extension}</div>
        </div>
        <div className='space-y-2 text-center w-20 border-b-2 border-active-1/30'>
          <div className='text-xs'>Count</div>
          {/* TODO: (M) - update this fields after change in ContentItemTable.
           Probably will need to refetch data when create / delete content item*/}
          <div className='font-bold'>{items_count}</div>
        </div>
        <div className='space-y-2 text-center w-20 border-b-2 border-active-1/30'>
          <div className='text-xs'>Download</div>
          <div className='font-bold flex w-full justify-center'>
            <SVGDownArrowTray
              className={`w-5 ${
                download ? 'text-active-2/80' : 'text-error-1/80'
              }`}
            />
            {download && (
              <div className='border-l border-active-1/30 ml-2 pl-2 text-sm'>
                {video_quality === ContentWatcherQuality.DEFAULT
                  ? 'Any'
                  : video_quality}
              </div>
            )}
          </div>
        </div>
        <div className='space-y-2 text-center w-20 border-b-2 border-active-1/30'>
          <div className='text-xs'>Status</div>
          <div className='font-bold'>{status}</div>
        </div>
        <div className='flex flex-col items-end space-y-2 text-center border-b-2 border-active-1/30 w-52'>
          <div>{renderActions()}</div>
          <div className='text-sm'>{toLocalDatetime(check_date)}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContentWatcherDetails);

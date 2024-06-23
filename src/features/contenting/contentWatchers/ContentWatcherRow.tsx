import React from 'react';
import {
  SVGArrowPath,
  SVGCheck,
  SVGCross,
  SVGDocumentText,
  SVGPencil,
} from '../../../components/svg';
import ContentWatcherForm from './ContentWatcherForm';
import { useModal } from '../../../hooks';
import { toLocalDatetime } from '../../../util/datetime';
import { NavLink } from 'react-router-dom';
import { FE_URL } from '../../../util/frontend-urls';
import { ContentWatcherQuality } from '../../../api/api-utils';
import { LED, Table } from '../../../components/generic';

type ContentWatcherRowProps = {
  contentWatcher: Model.ContentWatcherDM;
};

const ContentWatcherRow: React.FC<ContentWatcherRowProps> = ({
  contentWatcher,
}) => {
  const {
    id,
    name,
    category,
    source_type,
    items_count,
    file_extension,
    status,
    download,
    video_quality,
    check_date,
    consumed,
  } = contentWatcher;
  const { openModal, closeModal } = useModal();

  const handleOpenContentWatcherModal = () => {
    openModal(
      <ContentWatcherForm
        formProps={{ formMode: 'UPDATE', contentWatcher, scope: 'LIST' }}
        onSuccess={closeModal}
      />
    );
  };

  const renderActions = () => {
    return (
      <div className='flex space-x-2 divide-x divide-active-1/0 group-hover:divide-active-1/20'>
        <div onClick={handleOpenContentWatcherModal}>
          <SVGPencil className='w-5 wiggling-clickable' tooltip='Edit' />
        </div>
        <div className='pl-2' onClick={() => {}}>
          <SVGArrowPath
            className='w-5 wiggling-clickable'
            tooltip='Check for Updates'
          />
        </div>
        <NavLink
          className='pl-2'
          to={`${FE_URL.CONTENTING}/content_watcher/${id}`}
        >
          <SVGDocumentText
            className='w-5 wiggling-clickable'
            tooltip='Display Content'
          />
        </NavLink>
      </div>
    );
  };

  return (
    <Table.TRow className='group'>
      <div className='w-10 flex justify-center mr-2'>
        <LED on={true} color={consumed ? 'Green' : 'Red'} />
      </div>
      <div className='flex-3'>{name}</div>
      <div className='flex-1'>{category}</div>
      <div className='flex-1'>{source_type}</div>
      <div className='flex-1 text-center'>{items_count}</div>
      <div className='flex-1 flex justify-center'>
        {download ? (
          <SVGCheck className='w-5 text-active-2' />
        ) : (
          <SVGCross className='w-5 text-error-1' />
        )}
      </div>
      <div className='flex-1 text-center'>
        {download
          ? video_quality === ContentWatcherQuality.DEFAULT
            ? 'Any'
            : video_quality
          : '-'}
      </div>
      <div className='flex-1'>{file_extension}</div>
      <div className='flex-2'>{status}</div>
      <div className='flex-2 text-sm'>{toLocalDatetime(check_date)}</div>
      <div className='flex-1'>{renderActions()}</div>
    </Table.TRow>
  );
};

export default React.memo(ContentWatcherRow);

import React from 'react';
import { NavLink } from 'react-router-dom';
import { ContentWatcherQuality } from '../../../api/api-utils';
import { LED, Table } from '../../../components/generic';
import {
  SVGArrowPath,
  SVGCheck,
  SVGCross,
  SVGDocumentText,
  SVGPencil,
} from '../../../components/svg';
import { useModal } from '../../../hooks';
import { toLocalDatetime } from '../../../util/datetime';
import { FE_URL } from '../../../util/frontend-urls';
import { ContentWatcherForm } from './ContentWatcherForm';

type ContentWatcherRowProps = {
  contentWatcher: Model.ContentWatcherDM;
};

export const ContentWatcherRow = React.memo(
  ({ contentWatcher }: ContentWatcherRowProps) => {
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
          formProps={{
            formMode: 'UPDATE',
            item: contentWatcher,
            scope: 'LIST',
          }}
          onSuccess={closeModal}
        />
      );
    };

    const renderActions = () => {
      return (
        <div className='flex justify-center divide-x divide-active-1/0 group-hover:divide-active-1/20'>
          <SVGPencil
            className='px-2 wiggling-clickable-group'
            svgClassName='w-5'
            tooltip='Edit'
            onClick={handleOpenContentWatcherModal}
          />
          <SVGArrowPath
            className='px-2 wiggling-clickable-group'
            svgClassName='w-5'
            tooltip='Check for Updates'
          />
          <NavLink to={`${FE_URL.CONTENTING}/content_watcher/${id}`}>
            <SVGDocumentText
              className='px-2 wiggling-clickable-group'
              svgClassName='w-5'
              tooltip='Show Items'
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
        <div className='flex-3 text-ellipsis'>{name}</div>
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
  }
);

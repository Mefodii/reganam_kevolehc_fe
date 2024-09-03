import React, { useCallback } from 'react';
import { LoadingOverlay, Pagination, Table } from '../../../components/generic';
import { SVGPlus } from '../../../components/svg';
import { useAppSelector, useModal } from '../../../hooks';
import { TrackForm } from './TrackForm';
import { TrackRow } from './TrackRow';
import { fetchTracks, selectIsAPIPending } from './tracksSlice';

type TrackTableProps = {
  tracks: Model.TrackDM[];
  pageInfo?: PageInfo<QParams.Track>;
};

export const TracksTable = React.memo(
  ({ tracks, pageInfo }: TrackTableProps) => {
    const isLoading = useAppSelector(selectIsAPIPending);

    const { openModal, closeModal } = useModal();

    const handleOpenTrackModal = useCallback(() => {
      openModal(
        <TrackForm
          formProps={{
            formMode: 'CREATE',
          }}
          onSuccess={() => closeModal()}
        />
      );
    }, [openModal, closeModal]);

    if (!pageInfo) return <></>;

    const renderUtilityPanel = () => {
      return (
        <Table.THead>
          <div className='flex w-1/3 items-center'></div>
          <div className='flex w-1/3'>
            <Pagination pageInfo={pageInfo} action={fetchTracks} />
          </div>
          <div className={`flex w-1/3 justify-end space-x-3`}>
            <SVGPlus
              className={`w-5 simple-clickable-1`}
              tooltip='Add Item'
              onClick={handleOpenTrackModal}
            />
          </div>
        </Table.THead>
      );
    };

    return (
      <Table.TContainer>
        {renderUtilityPanel()}
        <LoadingOverlay loading={isLoading} />
        <Table.TBody>
          {tracks.map((track, i) => (
            <TrackRow key={i} track={track} />
          ))}
        </Table.TBody>
      </Table.TContainer>
    );
  }
);

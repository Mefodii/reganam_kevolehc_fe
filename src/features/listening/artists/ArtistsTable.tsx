import React, { useCallback } from 'react';
import { LoadingOverlay, Pagination, Table } from '../../../components/generic';
import { useAppSelector, useModal } from '../../../hooks';
import { fetchArtists, selectIsAPIPending } from './artistsSlice';
import { SVGPlus } from '../../../components/svg';
import ArtistForm from './ArtistForm';
import ArtistRow from './ArtistRow';

type ArtistTableProps = {
  artists: Model.ArtistDM[];
  pageInfo?: PageInfo<QParams.Artist>;
};

const ArtistTable: React.FC<ArtistTableProps> = ({ artists, pageInfo }) => {
  const isLoading = useAppSelector(selectIsAPIPending);

  const { openModal, closeModal } = useModal();

  const handleOpenArtistModal = useCallback(() => {
    openModal(
      <ArtistForm
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
          <Pagination pageInfo={pageInfo} action={fetchArtists} />
        </div>
        <div className={`flex w-1/3 justify-end space-x-3`}>
          <SVGPlus
            className={`w-5 simple-clickable-1`}
            tooltip='Add Item'
            onClick={handleOpenArtistModal}
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
        {artists.map((artist, i) => (
          <ArtistRow key={i} artist={artist} />
        ))}
      </Table.TBody>
    </Table.TContainer>
  );
};

export default React.memo(ArtistTable) as typeof ArtistTable;

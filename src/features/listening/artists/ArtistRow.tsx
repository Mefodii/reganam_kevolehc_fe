import React, { useState } from 'react';
import { SVGCross, SVGPencil } from '../../../components/svg';
import { useAppDispatch, useDrag, useModal } from '../../../hooks';
import { deleteArtist } from './artistsSlice';
import { DragDots, Table } from '../../../components/generic';
import { DnDTypes } from '../../../util/constants';
import ArtistForm from './ArtistForm';
import ArtistStatusPanel from './ArtistStatusPanel';
type ArtistRowProps = {
  artist: Model.ArtistDM;
};
const ArtistRow: React.FC<ArtistRowProps> = ({ artist }) => {
  const { name } = artist;
  const [isMouseOver, setIsMouseOver] = useState(false);

  const dispatch = useAppDispatch();

  const { openConfirmationModal, closeModal, openModal } = useModal();

  const [draggable, setDraggable] = useState(false);
  const { isDragged, dragEvents } = useDrag(DnDTypes.ARTIST, artist);

  const handleOpenArtistModal = () => {
    openModal(
      <ArtistForm
        formProps={{ formMode: 'UPDATE', item: artist }}
        onSuccess={closeModal}
      />
    );
  };

  const handleDeleteContentMusicItem = () => {
    openConfirmationModal({
      title: 'Delete Item?',
      onConfirm: () => dispatch(deleteArtist(artist)),
    });
  };

  const renderIcons = () => {
    return (
      <div className='flex justify-end'>
        <SVGPencil
          className='row-icon'
          tooltip='Edit'
          onClick={handleOpenArtistModal}
        />
        <SVGCross
          className='row-icon hover:text-error-1'
          tooltip='Delete'
          onClick={handleDeleteContentMusicItem}
        />
      </div>
    );
  };

  return (
    <Table.TRow
      className={`group ${isDragged && 'border border-active-1/50 opacity-30'}`}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      draggable={draggable}
      {...dragEvents}
    >
      <DragDots
        show={isMouseOver}
        onMouseEnter={() => setDraggable(true)}
        onMouseLeave={() => setDraggable(false)}
      />
      <div className='flex-3 truncate text-left' title={name}>
        {name}
      </div>
      <div className={`flex-1 ${isMouseOver ? 'opacity-100' : 'opacity-0'}`}>
        {renderIcons()}
      </div>
      <ArtistStatusPanel artist={artist} />
    </Table.TRow>
  );
};

export default React.memo(ArtistRow) as typeof ArtistRow;

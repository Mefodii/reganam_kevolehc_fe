import React, { useState } from 'react';
import { SVGCross, SVGPencil } from '../../../components/svg';
import { useAppDispatch, useDrag, useModal } from '../../../hooks';
import { deleteTrack } from './tracksSlice';
import { DragDots, Table } from '../../../components/generic';
import TrackStatusPanel from './TrackStatusPanel';
import { DnDTypes } from '../../../util/constants';
import TrackForm from './TrackForm';
type TrackRowProps = {
  track: Model.TrackDM;
};
const TrackRow: React.FC<TrackRowProps> = ({ track }) => {
  const { full_name } = track;

  const [isMouseOver, setIsMouseOver] = useState(false);

  const dispatch = useAppDispatch();

  const { openConfirmationModal, closeModal, openModal } = useModal();

  const [draggable, setDraggable] = useState(false);
  const { isDragged, dragEvents } = useDrag(DnDTypes.TRACK, track);

  const handleOpenTrackModal = () => {
    openModal(
      <TrackForm
        formProps={{ formMode: 'UPDATE', item: track }}
        onSuccess={closeModal}
      />
    );
  };

  const handleDeleteContentMusicItem = () => {
    openConfirmationModal({
      title: 'Delete Item?',
      onConfirm: () => dispatch(deleteTrack(track)),
    });
  };

  const renderIcons = () => {
    return (
      <div className='flex justify-end'>
        <SVGPencil
          className='row-icon'
          tooltip='Edit'
          onClick={handleOpenTrackModal}
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
      <div className='flex-3 truncate text-left' title={full_name}>
        {full_name}
      </div>
      <div className={`flex-1 ${isMouseOver ? 'opacity-100' : 'opacity-0'}`}>
        {renderIcons()}
      </div>
      <TrackStatusPanel track={track} />
    </Table.TRow>
  );
};

export default React.memo(TrackRow) as typeof TrackRow;

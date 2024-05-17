import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';

import { DEFAULT_IMAGE } from '../../../util/frontend-urls';

import { LoadingOverlay } from '../../../components/generic';

import {
  createPoster,
  updatePoster,
  deletePoster,
} from '../groups/groupsSlice';
import { useAppDispatch } from '../../../hooks';

type PosterProps = {
  disabled?: boolean;
  groupId: number;
  images: Model.PosterDM[];
};

const Poster: React.FC<PosterProps> = ({ disabled, groupId, images }) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const poster = images[0];

  const onDragEnter = () => {
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const image = e.dataTransfer.files[0];

    if (!image.type.startsWith('image/')) {
      console.error('Unacceptable file type: ', image); // TODO - alert instead of console
      return;
    }

    setLoading(true);
    setDragOver(false);
    changePoster(image);
  };

  const onFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;

    const image = e.target.files[0];
    changePoster(image);
  };

  const changePoster = (image: File) => {
    if (!image) return;

    const poster = images[0];
    // Update poster
    if (poster) {
      dispatch(updatePoster({ poster, image })).then(() => {
        setLoading(false);
      });
      return;
    }

    // Add poster
    if (!poster) {
      dispatch(createPoster({ image, group: groupId })).then(() => {
        setLoading(false);
      });
      return;
    }
  };

  const deletePoster2 = () => {
    const poster = images[0];
    if (poster) dispatch(deletePoster(poster));
  };

  const openPosterSelector: React.MouseEventHandler<SVGSVGElement> = (e) => {
    fileUploadRef.current?.click();
  };

  return (
    <div
      className={`relative group ${
        dragOver ? 'border-2 border-active-1 shadow-inner' : ''
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <LoadingOverlay loading={loading} />
      {!disabled && (
        <div className='absolute bottom-0 w-full flex justify-center transform opacity-0 group-hover:opacity-100 transition ease-in duration-300'>
          <div className='absolute w-full bg-gray-800 h-full opacity-80'></div>
          <div className='text-active-1/40 z-10 p-1'>
            <FontAwesomeIcon
              icon={faCamera}
              size='lg'
              className='hover:text-active-1 cursor-pointer mx-2'
              onClick={openPosterSelector}
            />
            <FontAwesomeIcon
              icon={faTimes}
              size='lg'
              className='hover:text-active-1 cursor-pointer mx-2'
              onClick={deletePoster2}
            />
          </div>
          <input
            className='hidden'
            type='file'
            id='poster'
            name='poster'
            accept='image/*'
            onChange={onFileSelect}
            ref={fileUploadRef}
          ></input>
        </div>
      )}
      <img
        src={poster?.image || DEFAULT_IMAGE}
        alt='Placeholder'
        className='shadow-sm rounded-lg object-center w-60'
        draggable='false'
      />
    </div>
  );
};

export default Poster;

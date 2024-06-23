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
import { useAppDispatch, useDrop } from '../../../hooks';

type PosterProps = {
  disabled?: boolean;
  groupId: number;
  images: Model.PosterDM[];
};

const Poster: React.FC<PosterProps> = ({ disabled, groupId, images }) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const poster = images[0];

  const { isDragOver, dropEvents } = useDrop<HTMLDivElement, DataTransfer>({
    dataTransfer: true,
    onDrop: (e, dataTransfer) => changePoster(dataTransfer.files[0]),
  });

  const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;

    const image = e.target.files[0];
    changePoster(image);
  };

  const changePoster = (image: File) => {
    if (!image) return;
    setLoading(true);

    if (!image.type.startsWith('image/')) {
      alert(`Unacceptable file type: ${image.type}`);
      return;
    }

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

  const handleDeletePoster = () => {
    const poster = images[0];
    if (poster) dispatch(deletePoster(poster));
  };

  const openPosterSelector: React.MouseEventHandler<SVGSVGElement> = (e) => {
    fileUploadRef.current?.click();
  };

  return (
    <div
      className={`relative group ${
        isDragOver
          ? 'border-8 border-dashed border-active-1/30 shadow-inner'
          : ''
      }`}
      {...dropEvents}
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
              onClick={handleDeletePoster}
            />
          </div>
          <input
            className='hidden'
            type='file'
            id='poster'
            name='poster'
            accept='image/*'
            onChange={handleFileSelect}
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

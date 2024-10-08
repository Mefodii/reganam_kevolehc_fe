import { faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { LoadingOverlay } from '../../../components/generic';
import { useAppDispatch, useDrop } from '../../../hooks';
import { UseDropProps } from '../../../hooks/useDrop';
import { DEFAULT_IMAGE } from '../../../util/frontend-urls';
import {
  createPoster,
  deletePoster,
  updatePoster,
} from '../groups/groupsSlice';

type PosterProps = {
  disabled?: boolean;
  groupId: number;
  images: Model.PosterDM[];
};

export const Poster = React.memo(
  ({ disabled, groupId, images }: PosterProps) => {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const fileUploadRef = useRef<HTMLInputElement>(null);

    const poster = images[0];

    const changePoster = useCallback(
      (image: File) => {
        if (!image) return;
        setLoading(true);

        if (!image.type.startsWith('image/')) {
          alert(`Unacceptable file type: ${image.type}`);
          return;
        }

        const poster = images[0];
        // Update poster
        if (poster) {
          dispatch(updatePoster({ poster, image }))
            .unwrap()
            .then(() => {
              setLoading(false);
            });
          return;
        }

        // Add poster
        if (!poster) {
          dispatch(createPoster({ image, group: groupId }))
            .unwrap()
            .then(() => {
              setLoading(false);
            });
          return;
        }
      },
      [dispatch, groupId, images]
    );
    const dropProps: UseDropProps<HTMLDivElement, DataTransfer> = useMemo(
      () => ({
        dataTransfer: true,
        onDrop: (e, dataTransfer) => changePoster(dataTransfer.files[0]),
      }),
      [changePoster]
    );

    const { isDragOver, dropEvents } = useDrop<HTMLDivElement, DataTransfer>(
      dropProps
    );

    const handleFileSelect: React.ChangeEventHandler<HTMLInputElement> = (
      e
    ) => {
      if (!e.target.files) return;

      const image = e.target.files[0];
      changePoster(image);
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
  }
);

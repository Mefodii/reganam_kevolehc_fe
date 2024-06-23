import { promptNumber } from '../../../util/functions';

import { BLANK_VALUE, SHORT_BLANK_VALUE } from '../../../util/constants';

import Poster from '../posters/Poster';
import { SVGPencil, SVGCheck, SVGPlus } from '../../../components/svg';
import LinkList from '../links/LinkList';

import { updateGroup } from './groupsSlice';
import { isGroupLoading } from '../../../redux/loadingsSlice';
import {
  useAppDispatch,
  useAppSelector,
  useIsVisible,
  usePrevious,
} from '../../../hooks';
import { group as groupModel } from '../../../models';
import { useModal } from '../../../hooks';
import GroupForm from './GroupForm';
import VideoForm from '../videos/VideoForm';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { LoadingOverlay, Table } from '../../../components/generic';
import VideoItem from '../videos/VideoItem';

type GroupItemProps = {
  group: Model.GroupDM;
  showPoster: boolean;
  hide?: boolean;
  onViewportIn?: () => void;
  onViewportOut?: () => void;
};

const GroupItem: React.FC<GroupItemProps> = ({
  group,
  showPoster,
  hide = false,
  onViewportIn = () => {},
  onViewportOut = () => {},
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => isGroupLoading(state, group.id));
  const { openModal, closeModal } = useModal();

  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIsVisible(ref);
  const isIntersectingPrev = usePrevious(isIntersecting);

  useEffect(() => {
    if (isIntersectingPrev === undefined) return;

    if (isIntersecting && !isIntersectingPrev) onViewportIn();
    if (!isIntersecting && isIntersectingPrev) onViewportOut();
  }, [isIntersecting, isIntersectingPrev, onViewportOut, onViewportIn]);

  const handleOpenEdit = useCallback(
    (group: Model.GroupDM) => {
      openModal(
        <GroupForm
          formProps={{
            watchingType: group.type,
            single: group.single,
            group,
            formMode: 'UPDATE',
          }}
          onSuccess={closeModal}
        />
      );
    },
    [openModal, closeModal]
  );

  const handleOpenVideoModal = useCallback(
    (group: Model.GroupNotSingleDM) => {
      const { id: groupId, videos } = group;

      const defaultOrder =
        videos.length > 0 ? videos[videos.length - 1].order + 1 : 1;

      openModal(
        <VideoForm
          formProps={{
            groupId,
            defaultOrder,
            formMode: 'CREATE',
          }}
          onSuccess={() => closeModal()}
        />
      );
    },
    [openModal, closeModal]
  );
  const handleSetFinised = useCallback(
    (group: Model.GroupSingleDM) => {
      const rating = promptNumber('Set group rating');
      if (rating === undefined) {
        return;
      }
      dispatch(updateGroup(groupModel.setFinished(group, rating)));
    },
    [dispatch]
  );
  const renderHeader = useMemo(() => {
    const { name, aliases, links, single } = group;
    return (
      <Table.THead className='base-font group relative'>
        <div className='simple-font w-full break-all'>
          <div className='text-3xl font-bold'>{name}</div>

          <LinkList links={links} />

          {aliases.length > 0 && (
            <div className='mt-3'>
              <div className='text-xs'>Alias:</div>
              <div>
                {aliases.map((alias, i) => (
                  <div key={i}>{' - ' + alias}</div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='self-start text-base flex flex-wrap 2xl:flex-nowrap px-3 justify-end text-center'>
          {single && (
            <>
              <div
                className={`w-24 m-1 ${
                  groupModel.isInQueue(group) && 'text-active-2'
                } ${groupModel.isPremiere(group) && 'text-warning-1'} ${
                  groupModel.isDropped(group) && 'text-error-1'
                }`}
              >
                <div className='text-xs'>Status</div>
                <div className='font-bold'>{group.status}</div>
              </div>
              <div className='w-24 m-1'>
                <div className='text-xs'>{group.status || 'Watched '} Date</div>
                <div className='font-bold'>
                  {group.watched_date || BLANK_VALUE}
                </div>
              </div>
              <div className='w-24 m-1'>
                <div className='text-xs'>Year</div>
                <div className='font-bold'>{group.year}</div>
              </div>
              <div className='w-24 m-1'>
                <div className='text-xs'>Rating</div>
                <div className='font-bold'>
                  {group.rating ?? SHORT_BLANK_VALUE} / 10
                </div>
              </div>
            </>
          )}

          {!single && (
            <>
              <div className='w-24 m-1'>
                <div className='text-xs'>Airing Status</div>
                <div className='font-bold'>{group.airing_status}</div>
              </div>
              <div className='w-24 m-1'>
                <div className='text-xs'>Check Date</div>
                <div className='font-bold'>
                  {group.check_date || BLANK_VALUE}
                </div>
              </div>
            </>
          )}
        </div>
        <div>
          <div onClick={() => handleOpenEdit(group)}>
            <SVGPencil className='w-6 wiggling-clickable' />
          </div>
          {single && !groupModel.isFinished(group) && (
            <div onClick={() => handleSetFinised(group)}>
              <SVGCheck className='w-6 wiggling-clickable' />
            </div>
          )}
          {!single && (
            <div onClick={() => handleOpenVideoModal(group)}>
              <SVGPlus className='w-6 wiggling-clickable' />
            </div>
          )}
        </div>
      </Table.THead>
    );
  }, [group, handleOpenEdit, handleOpenVideoModal, handleSetFinised]);

  return (
    <div
      className={`sticky top-6 pb-8 bg-theme-1 ${hide ? 'invisible' : ''}`}
      ref={ref}
    >
      <div className='flex bg-theme-1 border-b-2 border-active-1/30 pb-16'>
        {showPoster && (
          <div className={`min-w-60`}>
            <Poster images={group.images} groupId={group.id}></Poster>
          </div>
        )}
        <Table.TContainer className='w-full font-sans max-h-160 shadow-none'>
          {renderHeader}

          {!group.single && (
            <Table.TBody>
              <LoadingOverlay loading={isLoading} />
              {group.videos.map((video) => (
                <VideoItem video={video} key={video.id}></VideoItem>
              ))}
            </Table.TBody>
          )}
        </Table.TContainer>
      </div>
    </div>
  );
};

export default React.memo(GroupItem) as typeof GroupItem;

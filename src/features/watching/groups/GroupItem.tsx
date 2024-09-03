import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { LoadingOverlay, Table } from '../../../components/generic';
import { SVGCheck, SVGPencil, SVGPlus } from '../../../components/svg';
import {
  useAppDispatch,
  useAppSelector,
  useIsVisible,
  useModal,
  usePrevious,
} from '../../../hooks';
import { group as groupModel } from '../../../models';
import { isGroupLoading } from '../../../redux/loadingsSlice';
import { BLANK_VALUE, SHORT_BLANK_VALUE } from '../../../util/constants';
import { promptNumber } from '../../../util/functions';
import { LinkList } from '../links/LinkList';
import { Poster } from '../posters/Poster';
import { VideoForm } from '../videos/VideoForm';
import { VideoItem } from '../videos/VideoItem';
import { GroupForm } from './GroupForm';
import { updateGroup } from './groupsSlice';

type GroupItemProps = {
  group: Model.GroupDM;
  showPoster: boolean;
  hide?: boolean;
  onViewportIn: (group: Model.GroupDM) => void;
  onViewportOut: (group: Model.GroupDM) => void;
};

export const GroupItem = React.memo(
  ({
    group,
    showPoster,
    hide = false,
    onViewportIn,
    onViewportOut,
  }: GroupItemProps) => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) =>
      isGroupLoading(state, group.id)
    );
    const { openModal, closeModal } = useModal();

    const ref = useRef<HTMLDivElement>(null);
    const isIntersecting = useIsVisible(ref);
    const isIntersectingPrev = usePrevious(isIntersecting);

    useEffect(() => {
      if (isIntersectingPrev === undefined) return;

      if (isIntersecting && !isIntersectingPrev) onViewportIn(group);
      if (!isIntersecting && isIntersectingPrev) onViewportOut(group);
    }, [
      isIntersecting,
      isIntersectingPrev,
      onViewportOut,
      onViewportIn,
      group,
    ]);

    const handleOpenEdit = useCallback(
      (group: Model.GroupDM) => {
        openModal(
          <GroupForm
            formProps={{
              watchingType: group.type,
              single: group.single,
              item: group,
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

        const defaultPosition =
          videos.length > 0 ? videos[videos.length - 1].position + 1 : 1;

        openModal(
          <VideoForm
            formProps={{
              groupId,
              defaultPosition,
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
                  <div className='text-xs'>
                    {group.status || 'Watched '} Date
                  </div>
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
            <SVGPencil
              className='w-6 wiggling-clickable-group'
              onClick={() => handleOpenEdit(group)}
            />
            {single && !groupModel.isFinished(group) && (
              <SVGCheck
                className='w-6 wiggling-clickable-group'
                onClick={() => handleSetFinised(group)}
              />
            )}
            {!single && (
              <SVGPlus
                className='w-6 wiggling-clickable-group'
                onClick={() => handleOpenVideoModal(group)}
              />
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
          <Table.TContainer className='w-full font-sans max-h-160'>
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
  }
);

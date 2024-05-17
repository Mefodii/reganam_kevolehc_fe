import { promptNumber } from '../../../util/functions';

import { BLANK_VALUE } from '../../../util/constants';

import Poster from '../posters/Poster';
import { SVGPencil, SVGCheck, SVGPlus } from '../../../components/svg';
import VideoList from '../videos/VideoList';
import LinkList from '../links/LinkList';

import { updateGroup } from './groupsSlice';
import { isGroupLoading } from '../../../redux/loadingsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { group as groupModel } from '../../../models';
import { useModal } from '../../../hooks/useModal';
import GroupForm from './GroupForm';
import VideoForm from '../videos/VideoForm';

type GroupItemProps = {
  group: Model.GroupDM;
  watchingType: string;
  showPoster: boolean;
};

const GroupItem: React.FC<GroupItemProps> = ({
  group,
  watchingType,
  showPoster,
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => isGroupLoading(state, group.id));
  const { openModal, closeModal } = useModal();

  const handleOpenEdit = () => {
    openModal(
      <GroupForm
        formProps={{
          watchingType,
          single: group.single,
          group,
          formMode: 'UPDATE',
        }}
        onSuccess={closeModal}
      />
    );
  };

  const handleOpenVideoModal = (group: Model.GroupNotSingleDM) => {
    const { id: groupId, videos } = group;

    const defaultOrder =
      videos.length > 0 ? videos[videos.length - 1].order + 1 : 1;

    openModal(
      <VideoForm
        formProps={{
          watchingType,
          groupId,
          defaultOrder,
          formMode: 'CREATE',
        }}
        onSuccess={() => closeModal()}
      />
    );
  };

  const handleSetFinised = (group: Model.GroupSingleDM) => {
    const rating = promptNumber('Set group rating');
    if (rating === undefined) {
      return;
    }

    const newGroup = {
      ...groupModel.setFinished(group),
      rating,
    };
    dispatch(updateGroup(newGroup));
  };

  const { id, name, aliases, links, images, single } = group;

  const poster = images[0];

  return (
    <div className='watching-element relative'>
      {poster && showPoster && (
        <div className='absolute w-full h-full opacity-10 overflow-hidden right-0 top-0 rounded-xl'>
          <img
            src={poster.image}
            alt='Placeholder'
            className='w-full absolute rounded-lg -top-220 right-0'
            draggable='false'
          />
        </div>
      )}
      <div className='flex my-2'>
        {showPoster && (
          <div className={`min-w-60`}>
            <Poster images={images} groupId={id}></Poster>
          </div>
        )}
        <div className='watching-element mx-5 z-10 h-full relative overflow-visible'>
          <div className='ml-2 group'>
            <div className='flex justify-between'>
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
              <div className='flex flex-wrap 2xl:flex-nowrap px-3 justify-end text-center'>
                {single && (
                  <>
                    <div
                      className={`w-24 m-1 ${
                        groupModel.isInQueue(group) && 'text-active-2'
                      } ${groupModel.isPremiere(group) && 'text-warning-1'}`}
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
                      <div className='font-bold'>{group.rating} / 10</div>
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
                <div onClick={handleOpenEdit}>
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
            </div>
          </div>

          {!single && (
            <VideoList
              videos={group.videos}
              watchingType={watchingType}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupItem;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { promptNumber } from '../../../util/functions';

import { BLANK_VALUE } from '../../../util/constants';

import Poster from '../posters/Poster';
import { SVGPencil, SVGCheck, SVGPlus } from '../../../components/svg';
import VideoList from '../videos/VideoList';
import GroupModel from '../../../models/group';
import LinkList from '../links/LinkList';

import { updateGroup } from './groupsSlice';
import { openGroupModal, openVideoModal } from '../../../redux/modalSlice';

class GroupItem extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    watchingType: PropTypes.string.isRequired,
    showPoster: PropTypes.bool.isRequired,
    updateGroup: PropTypes.func.isRequired,
    openGroupModal: PropTypes.func.isRequired,
    openVideoModal: PropTypes.func.isRequired,
  };

  openEdit = () => {
    const { group, watchingType } = this.props;
    const { single } = group;
    const edit = true;

    this.props.openGroupModal({ watchingType, single, edit, group });
  };

  openVideoModal = () => {
    const { watchingType, group } = this.props;
    const { id: groupId, videos } = group;

    const defaultOrder = videos.length > 0 ? videos.at(-1).order + 1 : 1;
    const edit = false;
    this.props.openVideoModal({ watchingType, groupId, defaultOrder, edit });
  };

  setFinised = () => {
    const rating = promptNumber('Set group rating');
    if (rating === undefined) {
      return;
    }

    const group = {
      ...GroupModel.setFinished(this.props.group),
      rating,
    };
    this.props.updateGroup(group);
  };

  render() {
    const { watchingType, showPoster } = this.props;
    const { group } = this.props;
    const {
      id,
      name,
      aliases,
      links,
      check_date,
      airing_status,
      status,
      images,
      single,
      watched_date,
      year,
      rating,
      videos,
    } = group;

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
        <div className='flex my-2 '>
          {showPoster && (
            <div className={`min-w-60`}>
              <Poster
                images={images}
                groupId={id}
                watchingType={watchingType}
              ></Poster>
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
                          GroupModel.isInQueue(group) && 'text-active-2'
                        }`}
                      >
                        <div className='text-xs'>Status</div>
                        <div className='font-bold'>{status}</div>
                      </div>
                      <div className='w-24 m-1'>
                        <div className='text-xs'>
                          {status || 'Watched '} Date
                        </div>
                        <div className='font-bold'>
                          {watched_date || BLANK_VALUE}
                        </div>
                      </div>
                      <div className='w-24 m-1'>
                        <div className='text-xs'>Year</div>
                        <div className='font-bold'>{year}</div>
                      </div>
                      <div className='w-24 m-1'>
                        <div className='text-xs'>Rating</div>
                        <div className='font-bold'>{rating} / 10</div>
                      </div>
                    </>
                  )}

                  {!single && (
                    <>
                      <div className='w-24 m-1'>
                        <div className='text-xs'>Airing Status</div>
                        <div className='font-bold'>{airing_status}</div>
                      </div>
                      <div className='w-24 m-1'>
                        <div className='text-xs'>Check Date</div>
                        <div className='font-bold'>
                          {check_date || BLANK_VALUE}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <div onClick={this.openEdit}>
                    <SVGPencil className='w-6 wiggling-clickable' />
                  </div>
                  {!GroupModel.isFinished(group) && single && (
                    <div onClick={this.setFinised}>
                      <SVGCheck className='w-6 wiggling-clickable' />
                    </div>
                  )}
                  {!single && (
                    <div onClick={this.openVideoModal}>
                      <SVGPlus className='w-6 wiggling-clickable' />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!single && (
              <VideoList
                videos={videos}
                watchingType={watchingType}
                groupId={id}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(undefined, {
  updateGroup,
  openGroupModal,
  openVideoModal,
})(GroupItem);

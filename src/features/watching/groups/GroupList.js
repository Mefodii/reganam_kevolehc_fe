import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GroupItem from './GroupItem';
import { filterGroups } from '../../../models/filters/watchingFilter';
import Sidepanel from '../layout/Sidepanel';

import { selectWatchingFilter } from '../filters/filtersSlice';

class GroupList extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    watchingType: PropTypes.string.isRequired,
    backgroundPicture: PropTypes.string.isRequired,
    watchingFilter: PropTypes.object.isRequired,
  };

  render() {
    const { watchingType, groups, backgroundPicture, watchingFilter } =
      this.props;
    const { showPosters } = watchingFilter;

    const filteredGroups = filterGroups(watchingFilter, groups);

    return (
      <div className='w-full'>
        <div className='w-full opacity-20 right-0 blur-sm fixed mr-4'>
          <img
            src={backgroundPicture}
            alt='Placeholder'
            className='w-full mr-4 rounded-lg'
            draggable='false'
          />
        </div>

        <div className='w-full flex flex-col items-center relative'>
          <h2 className='text-xl uppercase font-bold m-4'>
            Welcome to {watchingType}, fellow watcher
          </h2>

          <Sidepanel watchingType={watchingType} />

          <div className='rounded-xl shadow-md w-10/12 space-y-10 mb-28'>
            <div className='watching-container space-y-5'>
              {filteredGroups.map((group) => (
                <GroupItem
                  group={group}
                  key={group.id}
                  watchingType={watchingType}
                  showPoster={showPosters}
                ></GroupItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  watchingFilter: selectWatchingFilter(state),
});

export default connect(mapStateToProps, {})(GroupList);

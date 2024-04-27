import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Sidepanel from './Sidepanel';
import {
  fetchContentWatchers,
  selectAllContentWatchers,
} from '../../features/contenting/contentWatchers/contentWatchersSlice';
import {
  fetchContentLists,
  selectAllContentLists,
} from '../../features/contenting/contentLists/contentListsSlice';

class Dashboard extends Component {
  static propTypes = {
    contentWatchers: PropTypes.array.isRequired,
    contentLists: PropTypes.array.isRequired,
    fetchContentWatchers: PropTypes.func.isRequired,
    fetchContentLists: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchContentWatchers();
    this.props.fetchContentLists();
  }

  render() {
    return (
      <div className='flex grow'>
        <Sidepanel />
        <div className='py-5 px-10 bg-theme-2 w-full'>
          {this.props.contentWatchers.map((_, i) => (
            <div key={i}>{JSON.stringify(_)}</div>
          ))}
          {this.props.contentLists.map((_, i) => (
            <div key={i}>{JSON.stringify(_)}</div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contentWatchers: selectAllContentWatchers(state),
  contentLists: selectAllContentLists(state),
});

const mapDispatchToProps = { fetchContentWatchers, fetchContentLists };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SVGPlus from '../generic/svg/SVGPlus';
import SideButton from '../generic/buttons/SideButton';
import SidepanelElement from '../generic/sidepanel/SidepanelElement';
import { selectContentWatcherSourceTypes } from '../../features/contenting/info/infoSlice';
import { openContentWatcherModal } from '../../redux/modalSlice';
import {
  selectContentingFilters,
  setLists,
  setWatchers,
} from '../../features/contenting/filters/filtersSlice';

class Sidepanel extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    contentWatcherSourceTypes: PropTypes.array.isRequired,
    openContentWatcherModal: PropTypes.func.isRequired,
    setWatchers: PropTypes.func.isRequired,
    setLists: PropTypes.func.isRequired,
  };

  openContentWatcherModal = () => {
    this.props.openContentWatcherModal({ edit: false });
  };

  openContentListModal = () => {};

  showWatchers = (watcherType) => {
    this.props.setWatchers(watcherType);
  };

  showLists = () => {
    this.props.setLists();
  };

  render() {
    const { contentWatcherSourceTypes } = this.props;
    const { showWatchers, showLists, watcherType } = this.props.filters;

    return (
      <div className='side-panel'>
        <SideButton onClick={() => this.openContentWatcherModal()}>
          <SVGPlus className='w-5'></SVGPlus>
          <div>Add Watcher</div>
        </SideButton>
        <div className='side-panel-sep'></div>

        <SidepanelElement
          isSelected={showWatchers && !watcherType}
          onClick={() => this.showWatchers()}
        >
          All Watchers
        </SidepanelElement>

        {contentWatcherSourceTypes.map((type, i) => (
          <SidepanelElement
            className={`pl-4`}
            isSelected={watcherType === type}
            onClick={() => this.showWatchers(type)}
            key={i}
          >
            - {type}
          </SidepanelElement>
        ))}
        <div className='side-panel-sep'></div>

        <SideButton onClick={() => this.openContentListModal()}>
          <SVGPlus className='w-5'></SVGPlus>
          <div>Add List</div>
        </SideButton>
        <div className='side-panel-sep'></div>
        <SidepanelElement
          isSelected={showLists}
          onClick={() => this.showLists()}
        >
          Other Lists
        </SidepanelElement>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contentWatcherSourceTypes: selectContentWatcherSourceTypes(state),
  filters: selectContentingFilters(state),
});

const mapDispatchToProps = {
  openContentWatcherModal,
  setWatchers,
  setLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidepanel);

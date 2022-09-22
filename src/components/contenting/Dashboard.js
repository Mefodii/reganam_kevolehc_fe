import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import { openCreateContentWatcherModal } from "../../actions/modal";
import SVGPlus from "../generic/svg/SVGPlus";

class Dashboard extends Component {
  static propTypes = {
    contentWatcherSourceTypes: PropTypes.array.isRequired,
    openCreateContentWatcherModal: PropTypes.func.isRequired,
  };

  state = {
    watcher: undefined,
  };

  setWatcher = (watcher) => {
    this.setState({ watcher });
  };

  render() {
    const { watcher } = this.state;
    const { contentWatcherSourceTypes } = this.props;
    return (
      <div className="flex grow">
        <div className="side-panel">
          <div
            className="side-panel-btn"
            onClick={() => this.props.openCreateContentWatcherModal()}
          >
            <SVGPlus className="w-5"></SVGPlus>
            <div>Add Watcher</div>
          </div>
          <div className="side-panel-sep"></div>
          <div className="side-panel-el side-panel-el-active">All Watchers</div>
          {contentWatcherSourceTypes.map((type, i) => (
            <div className="side-panel-el pl-4" key={i}>
              - {type}
            </div>
          ))}
          <div className="side-panel-sep"></div>
          <div
            className="side-panel-btn"
            onClick={() => this.props.openCreateContentWatcherModal()}
          >
            <SVGPlus className="w-5"></SVGPlus>
            <div>Add List</div>
          </div>
          <div className="side-panel-sep"></div>
          <div className="side-panel-el pl-4">Other Lists</div>
        </div>
        <div className="py-5 px-10 bg-theme-2 w-full">{watcher}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contentWatcherSourceTypes: state.info.contentWatcherSourceTypes,
});

const mapDispatchToProps = {
  openCreateContentWatcherModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

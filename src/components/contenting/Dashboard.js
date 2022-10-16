import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";

import Sidepanel from "./Sidepanel";
import { getContentWatchers } from "../../actions/contentWatchers";
import { getContentLists } from "../../actions/contentLists";

class Dashboard extends Component {
  static propTypes = {
    contentWatchers: PropTypes.array.isRequired,
    contentLists: PropTypes.array.isRequired,
    getContentWatchers: PropTypes.func.isRequired,
    getContentLists: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getContentWatchers();
    this.props.getContentLists();
  }

  render() {
    return (
      <div className="flex grow">
        <Sidepanel />
        <div className="py-5 px-10 bg-theme-2 w-full">
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
  contentWatchers: state.contentWatchers,
  contentLists: state.contentLists,
});

const mapDispatchToProps = { getContentWatchers, getContentLists };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

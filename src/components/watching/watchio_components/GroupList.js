import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GroupItem from "./GroupItem";
import { filterGroups } from "../../../models/filters/watchioFilter";
import Sidepanel from "./Sidepanel";

export class GroupList extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    watchioType: PropTypes.string.isRequired,
    backgroundPicture: PropTypes.string.isRequired,
    watchioFilter: PropTypes.object.isRequired,
  };

  render() {
    const { watchioType, groups, backgroundPicture, watchioFilter } =
      this.props;
    const { showPosters } = watchioFilter;

    const filteredGroups = filterGroups(watchioFilter, groups);

    return (
      <div className="w-full">
        {/* TODO: background image will overlap scrollbar and it cannot be clicked. Workaround??? */}
        <div className="w-full opacity-20 right-0 blur-sm fixed mr-4">
          <img
            src={backgroundPicture}
            alt="Placeholder"
            className="w-full mr-4 rounded-lg"
            draggable="false"
          />
        </div>

        <div className="w-full flex flex-col items-center relative">
          <h2 className="text-xl uppercase font-bold m-4">
            Welcome to {watchioType}, fellow watcher
          </h2>

          <Sidepanel watchioType={watchioType} />

          <div className="rounded-xl shadow-md w-10/12 space-y-10 mb-28">
            <div className="watchio-container space-y-5">
              {filteredGroups.map((group) => (
                <GroupItem
                  group={group}
                  key={group.id}
                  watchioType={watchioType}
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
  watchioFilter: state.itemsFilters.watchioFilter,
});

export default connect(mapStateToProps, {})(GroupList);

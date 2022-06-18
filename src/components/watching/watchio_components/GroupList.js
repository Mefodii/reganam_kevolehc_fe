import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GroupForm from "./GroupForm";
import GroupItem from "./GroupItem";
import Toggler from "./Toggler";
import FilterForm from "./FilterForm";
import { filterGroups } from "../../../util/filters/watchioFilter";

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
      <div className="w-full flex flex-col items-center relative overflow-hidden">
        <div className="w-full opacity-20 right-0 fixed z-0">
          <img
            src={backgroundPicture}
            alt="Placeholder"
            className="w-full rounded-lg"
          />
        </div>

        <h2 className="text-xl uppercase font-bold m-4 z-10">
          Welcome to {watchioType}, fellow watcher
        </h2>

        <div className="rounded-xl shadow-md w-10/12 space-y-10 mb-28 z-10">
          <div className="watchio-container">
            <Toggler activeText="Hide Filter" inactiveText="Show Filter" show>
              <FilterForm></FilterForm>
            </Toggler>
          </div>

          <div className="watchio-container">
            <Toggler activeText="Hide Form" inactiveText="Add new Group">
              <GroupForm watchioType={watchioType} hideTitle></GroupForm>
            </Toggler>
          </div>

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
    );
  }
}

const mapStateToProps = (state) => ({
  watchioFilter: state.itemsFilters.watchioFilter,
});

export default connect(mapStateToProps, null)(GroupList);

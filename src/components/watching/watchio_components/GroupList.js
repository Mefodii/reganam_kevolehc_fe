import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GroupForm from "./GroupForm";
import GroupItem from "./GroupItem";
import Toggler from "./Toggler";
import FilterForm from "./FilterForm";

export class GroupList extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    watchioType: PropTypes.string.isRequired,
    backgroundPicture: PropTypes.string.isRequired,
  };

  onFilterChange = (e) => {
    const filters = { ...this.state.filters, [e.target.name]: e.target.value };
    this.setState(filters);
  };

  filterByTitle = (groups) => {
    const titleFilter = this.props.watchioFilter.title;
    if (titleFilter.length === 0) return groups;

    return groups.filter((group) => {
      const inName = group.name
        .toLowerCase()
        .includes(titleFilter.toLowerCase());
      const inAlias = group.aliases.find((alias) =>
        alias.toLowerCase().includes(titleFilter.toLowerCase())
      );

      return inName || inAlias;
    });
  };

  filterFromDate = (groups) => {
    const fromDateFilter = this.props.watchioFilter.fromDate;
    if (fromDateFilter.length === 0) return groups;

    return groups.filter((group) => {
      const { single, watched_date, videos } = group;
      const inGroup =
        single && watched_date !== null && watched_date >= fromDateFilter;

      const inVideos = videos.find(
        (video) =>
          video.watched_date !== null && video.watched_date >= fromDateFilter
      );

      return inGroup || inVideos;
    });
  };

  filterToDate = (groups) => {
    const toDateFilter = this.props.watchioFilter.toDate;
    if (toDateFilter.length === 0) return groups;

    return groups.filter((group) => {
      const { single, watched_date, videos } = group;
      const inGroup =
        single && watched_date !== null && watched_date <= toDateFilter;

      const inVideos = videos.find(
        (video) =>
          video.watched_date !== null && video.watched_date <= toDateFilter
      );

      return inGroup || inVideos;
    });
  };

  filterByStatuses = (groups) => {
    const statusesFilter = this.props.watchioFilter.statuses;
    if (statusesFilter.length === 0) return groups;

    return groups.filter((group) => {
      const { single, status, videos } = group;
      const inGroup = single && statusesFilter.find((_) => _ === status);

      const inVideos = videos.find((video) =>
        statusesFilter.find((_) => _ === video.status)
      );

      return inGroup || inVideos;
    });
  };

  filterGroups = (groups) => {
    let newGroups = this.filterByTitle(groups);
    newGroups = this.filterFromDate(newGroups);
    newGroups = this.filterToDate(newGroups);
    newGroups = this.filterByStatuses(newGroups);
    return newGroups;
  };

  render() {
    const {
      watchioType,
      groups,
      backgroundPicture,
      watchioFilter: { showPosters },
    } = this.props;

    const filteredGroups = this.filterGroups(groups);

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

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GroupForm from "./GroupForm";
import GroupItem from "./GroupItem";

export class GroupList extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    watchioType: PropTypes.string.isRequired,
    backgroundPicture: PropTypes.string.isRequired,
  };

  state = {
    showGroupForm: false,
    filters: {
      showPosters: true,
      name: "",
      status: "",
      airing_status: "",
    },
  };

  onFilterChange = (e) => {
    const filters = { ...this.state.filters, [e.target.name]: e.target.value };
    this.setState(filters);
  };

  filterGroups = (groups) => {
    return groups;
  };

  toggleShowGroupForm = () => {
    this.setState({ showGroupForm: !this.state.showGroupForm });
  };

  render() {
    const {
      showGroupForm,
      filters: { showPosters },
    } = this.state;
    const { watchioType, groups, backgroundPicture } = this.props;

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
          <div className="p-6 bg-primary border border-tertiary rounded-lg">
            <div className="w-full p-1 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary text-center font-extrabold">
              <div
                className="cursor-pointer mb-1"
                onClick={this.toggleShowGroupForm}
              >
                {showGroupForm ? "↑ Hide form ↑" : "↓ Add new Group ↓"}
              </div>
              {showGroupForm && (
                <GroupForm watchioType={watchioType} hideTitle></GroupForm>
              )}
            </div>
          </div>
          <div className="bg-primary border border-tertiary rounded-lg">
            {this.filterGroups(groups).map((group) => (
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

export default connect(null, null)(GroupList);

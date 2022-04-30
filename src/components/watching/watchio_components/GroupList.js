import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GroupForm from "./GroupForm";
import GroupItem from "./GroupItem";

export class GroupList extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    watchioType: PropTypes.string.isRequired,
  };

  state = {
    showGroupForm: false,
  };

  toggleShowGroupForm = () => {
    this.setState({ showGroupForm: !this.state.showGroupForm });
  };

  render() {
    const { showGroupForm } = this.state;
    const { watchioType, groups } = this.props;

    return (
      <div className="w-full flex flex-col items-center">
        <h2 className="text-xl uppercase font-bold m-4">
          Welcome to {watchioType}, fellow watcher
        </h2>
        <div className="rounded-xl shadow-lg w-10/12 space-y-10 mb-28">
          <div className="p-6 bg-primary border border-tertiary">
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
          <div className="bg-primary border border-tertiary">
            {groups.map((group) => (
              <GroupItem
                group={group}
                key={group.id}
                watchioType={watchioType}
              ></GroupItem>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(GroupList);

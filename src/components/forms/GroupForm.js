import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addGroup, updateGroup, deleteGroup } from "../../actions/groups";
import { BLANK_VALUE } from "../../util/constants";
import Number from "../generic/form/Number";
import Date from "../generic/form/Date";
import SingleSelect from "../generic/form/SingleSelect";
import Textarea from "../generic/form/Textarea";
import Text from "../generic/form/Text";
import DropdownSelect from "../generic/form/DropdownSelect";
import GroupModel from "../../models/group";
import { withForm } from "./form-functions";

export class GroupForm extends Component {
  static propTypes = {
    group: PropTypes.object,
    edit: PropTypes.bool.isRequired,
    single: PropTypes.bool.isRequired,
    watchioType: PropTypes.string.isRequired,
    statusTypes: PropTypes.array.isRequired,
    airStatusTypes: PropTypes.array.isRequired,
    //
    onSuccess: PropTypes.func,
    addGroup: PropTypes.func.isRequired,
    updateGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    // Form props
    formState: PropTypes.object.isRequired,
    resetFormState: PropTypes.func.isRequired,
    loadFormState: PropTypes.func.isRequired,
    updateFormState: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    hasFormChanged: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
    updateModel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    group: {},
    onSuccess: () => {},
  };

  onChangeAlias = (i) => (e, field) => {
    const newAliases = [...this.props.formState.aliases];
    newAliases[i] = field.value;
    this.props.updateFormState({ aliases: newAliases });
  };

  addAliasField = () =>
    this.props.updateFormState({
      aliases: this.props.model.addAlias(this.props.formState.aliases),
    });

  removeAliasField = () =>
    this.props.updateFormState({
      aliases: this.props.model.deleteAlias(this.props.formState.aliases),
    });

  addGroup = () => {
    const { validateForm, addGroup, onSuccess } = this.props;
    const [group, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    addGroup(group, this.props.watchioType).then(onSuccess);
  };

  saveChanges = () => {
    const { validateForm, updateGroup, onSuccess } = this.props;
    const [group, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    updateGroup(group, this.props.watchioType).then(onSuccess);
  };

  deleteGroup = () => {
    const { deleteGroup, onSuccess, group, watchioType } = this.props;
    deleteGroup(group.id, watchioType).then(onSuccess);
  };

  componentDidMount() {
    const { edit, single } = this.props;
    this.props.updateModel({ edit, single });
    edit ? this.props.loadFormState() : this.props.resetFormState();
  }

  render() {
    const {
      name,
      aliases,
      check_date,
      single,
      status,
      airing_status,
      rating,
      watched_date,
      year,
    } = this.props.formState;
    const { edit, onFieldChange, onSuccess } = this.props;

    const title = edit ? "Edit Group" : "Add Group";
    return (
      <div className="simple-font p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full">
        <div className="title">{title}</div>

        <div className="form-row">
          <div className="form-column">
            <div className="form-row">
              <Text
                label="Name"
                name="name"
                value={name}
                onChange={onFieldChange}
              />
            </div>
            <div className="form-row">
              <Date
                label="Last Check Date"
                name="check_date"
                value={check_date}
                onChange={onFieldChange}
              />
              <DropdownSelect
                label="Airing Status"
                name="airing_status"
                placeholder={BLANK_VALUE}
                value={airing_status}
                options={this.props.airStatusTypes}
                onChange={onFieldChange}
              />
              <SingleSelect
                label="Group type"
                name="single"
                text="SINGLE"
                value={single}
                onClick={onFieldChange}
              />
            </div>
            <div className="form-row">
              <DropdownSelect
                containerClassName={`${single ? "" : "opacity-20"}`}
                label="Watch status"
                name="status"
                placeholder={BLANK_VALUE}
                value={status}
                options={this.props.statusTypes}
                onChange={onFieldChange}
                disabled={!single}
              />
              <Date
                containerClassName={`${single ? "" : "opacity-20"}`}
                label={`${status || "Watched "} Date`}
                name="watched_date"
                value={watched_date}
                onChange={onFieldChange}
                disabled={!single}
              />
              <Number
                containerClassName={`${single ? "" : "opacity-20"}`}
                label="Year"
                name="year"
                value={year}
                onChange={onFieldChange}
                disabled={!single}
              />
              <Number
                containerClassName={`${single ? "" : "opacity-20"}`}
                label="Rating"
                name="rating"
                value={rating}
                onChange={onFieldChange}
                disabled={!single}
                minmax={[0, 10]}
              />
            </div>
          </div>

          <div className="form-column">
            {aliases.map((alias, i) => (
              <div className="form-row" key={i}>
                <Textarea
                  label={`Alias ${i + 1}`}
                  name={`Alias ${i + 1}`}
                  value={alias}
                  onChange={this.onChangeAlias(i)}
                />
              </div>
            ))}

            <div className="flex flex-row justify-start 2xl:space-x-1">
              <div className="w-16 btn" onClick={this.addAliasField}>
                +
              </div>
              <div className="w-16 btn" onClick={this.removeAliasField}>
                -
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          {!edit && (
            <div className="w-max btn option-selected" onClick={this.addGroup}>
              Add Group
            </div>
          )}
          {edit && (
            <div className="flex space-x-1">
              <div
                className={`w-max btn option-selected`}
                onClick={this.saveChanges}
              >
                Save Changes
              </div>
              <div className="w-max btn" onClick={onSuccess}>
                Discard Changes
              </div>
            </div>
          )}

          {edit && (
            <div className="w-max btn bg-pink-900" onClick={this.deleteGroup}>
              Delete Group
            </div>
          )}
        </div>

        {single && edit && (
          <div className="text-yellow-300 overflow-visible">
            Warning: by choosing SINGLE, all videos under this group will be
            deleted
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  statusTypes: state.info.statusTypes,
  airStatusTypes: state.info.airStatusTypes,
});

const mapDispatchToProps = {
  addGroup,
  updateGroup,
  deleteGroup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm(GroupForm, GroupModel));

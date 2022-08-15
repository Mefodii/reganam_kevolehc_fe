import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addGroup, updateGroup, deleteGroup } from "../../actions/groups";
import { BLANK_VALUE } from "../../util/constants";
import Number from "../generic/form/Number";
import Date from "../generic/form/Date";
import Textarea from "../generic/form/Textarea";
import DropdownSelect from "../generic/form/DropdownSelect";
import GroupModel from "../../models/group";
import { withForm } from "./form-functions";
import CompactButton from "../generic/buttons/CompactButton";
import SVGCheck from "../generic/svg/SVGCheck";
import SVGTrash from "../generic/svg/SVGTrash";
import SVGPlus from "../generic/svg/SVGPlus";
import SVGMinus from "../generic/svg/SVGMinus";

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

  renderSingle = () => {
    const { status, rating, watched_date, year } = this.props.formState;
    const { onFieldChange } = this.props;

    return (
      <div className="form-row">
        <DropdownSelect
          label="Watch status"
          name="status"
          placeholder={BLANK_VALUE}
          value={status}
          options={this.props.statusTypes}
          onChange={onFieldChange}
        />
        <Date
          label={`${status || "Watched "} Date`}
          name="watched_date"
          value={watched_date}
          onChange={onFieldChange}
        />
        <Number
          label="Year"
          name="year"
          value={year}
          onChange={onFieldChange}
        />
        <Number
          label="Rating"
          name="rating"
          value={rating}
          onChange={onFieldChange}
          minmax={[0, 10]}
        />
      </div>
    );
  };

  renderNotSingle = () => {
    const { airing_status, check_date } = this.props.formState;
    const { onFieldChange } = this.props;

    return (
      <div className="form-row">
        <DropdownSelect
          label="Airing Status"
          name="airing_status"
          placeholder={BLANK_VALUE}
          value={airing_status}
          options={this.props.airStatusTypes}
          onChange={onFieldChange}
        />
        <Date
          label="Last Check Date"
          name="check_date"
          value={check_date}
          onChange={onFieldChange}
        />
      </div>
    );
  };

  componentDidMount() {
    const { edit, single } = this.props;
    this.props.updateModel({ edit, single });
    edit ? this.props.loadFormState() : this.props.resetFormState();
  }

  render() {
    const { single, aliases, name } = this.props.formState;
    const { edit, watchioType, onFieldChange } = this.props;

    const title = edit ? `Edit ${watchioType}` : `Add ${watchioType}`;
    return (
      <div className="simple-font p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full">
        <div className="title">{title}</div>

        <div className="form-row">
          <Textarea
            label="Name"
            name="name"
            value={name}
            onChange={onFieldChange}
          />
        </div>

        {single ? this.renderSingle() : this.renderNotSingle()}

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

        <div className="form-row justify-between">
          <div className="flex">
            <CompactButton
              className={"group hover:bg-theme-2"}
              text="Add Alias"
              onClick={this.addAliasField}
            >
              <SVGPlus className="w-6 transition-all duration-300" />
            </CompactButton>
            <CompactButton
              className={"group hover:bg-theme-2"}
              text="Remove Alias"
              onClick={this.removeAliasField}
            >
              <SVGMinus className="w-6 transition-all duration-300" />
            </CompactButton>
          </div>

          <div className="flex">
            {!edit && (
              <CompactButton
                className={"group hover:bg-theme-2"}
                text="Add Group"
                onClick={this.addGroup}
              >
                <SVGCheck className="w-6 transition-all duration-300" />
              </CompactButton>
            )}

            {edit && (
              <>
                <CompactButton
                  className={"group hover:bg-theme-2"}
                  text="Save Changes"
                  onClick={this.saveChanges}
                >
                  <SVGCheck className="w-6 transition-all duration-300" />
                </CompactButton>
                <CompactButton
                  className={"group hover:bg-theme-2"}
                  text="Delete Group"
                  onClick={this.deleteGroup}
                >
                  <SVGTrash className="w-6 transition-all duration-300" />
                </CompactButton>
              </>
            )}
          </div>
        </div>
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

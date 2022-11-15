import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addGroup, updateGroup, deleteGroup } from "../../actions/groups";
import { BLANK_VALUE } from "../../util/constants";
import Number from "../generic/form/Number";
import Date from "../generic/form/Date";
import TextArea from "../generic/form/TextArea";
import DropdownSelect from "../generic/form/DropdownSelect";
import GroupModel from "../../models/group";
import { withForm, withFormExtraPropTypes } from "./withFormHOC";
import Button from "../generic/buttons/Button";
import SVGCheck from "../generic/svg/SVGCheck";
import SVGTrash from "../generic/svg/SVGTrash";
import TextAreaArray from "../generic/form/TextAreaArray";
import SVGPlay from "../generic/svg/SVGPlay";
import SVGForward from "../generic/svg/SVGForward";

export class GroupForm extends Component {
  static propTypes = {
    group: PropTypes.object,
    edit: PropTypes.bool.isRequired,
    withToggle: PropTypes.bool,
    single: PropTypes.bool.isRequired,
    watchioType: PropTypes.string.isRequired,
    statusTypes: PropTypes.array.isRequired,
    airStatusTypes: PropTypes.array.isRequired,
    //
    onSuccess: PropTypes.func,
    addGroup: PropTypes.func.isRequired,
    updateGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    ...withFormExtraPropTypes,
  };

  static defaultProps = {
    group: {},
    onSuccess: () => {},
    withToggle: false,
  };

  toggleSingle = () => {
    this.props.updateFormState({ single: !this.props.formState.single });
  };

  addGroup = () => {
    const { validateForm, addGroup, onSuccess } = this.props;
    const [group, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    addGroup(group, this.props.watchioType).then((resGroup) =>
      onSuccess(true, resGroup)
    );
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

  render() {
    const { single, aliases, links, name } = this.props.formState;
    const { edit, withToggle, watchioType, onFieldChange } = this.props;

    const title = edit ? `Edit ${watchioType}` : `Add ${watchioType}`;
    return (
      <div className="simple-font p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full">
        <div className="title">{title}</div>

        <div className="form-row">
          <TextArea
            label="Name"
            name="name"
            value={name}
            onChange={onFieldChange}
          />
        </div>

        {single ? this.renderSingle() : this.renderNotSingle()}

        <TextAreaArray
          name="aliases"
          labelItem={(item, i) => `Alias ${i + 1}`}
          items={aliases}
          onChange={onFieldChange}
          addItem={this.props.model.addAlias}
          removeItem={this.props.model.removeAlias}
        />

        <TextAreaArray
          name="links"
          labelItem={(item, i) => `Link ${i + 1}`}
          items={links}
          onChange={onFieldChange}
          addItem={this.props.model.addLink}
          removeItem={this.props.model.removeLink}
        />

        <div className="flex justify-between">
          <div>
            {!edit && (
              <Button tooltip="Add Group" onClick={this.addGroup}>
                <SVGCheck className="w-6 transition-all duration-300" />
              </Button>
            )}

            {edit && (
              <>
                <Button tooltip="Save Changes" onClick={this.saveChanges}>
                  <SVGCheck className="w-6 transition-all duration-300" />
                </Button>
                <Button tooltip="Delete Group" onClick={this.deleteGroup}>
                  <SVGTrash className="w-6 transition-all duration-300" />
                </Button>
              </>
            )}
          </div>

          <div>
            {withToggle && single && (
              <Button tooltip="Single" onClick={this.toggleSingle}>
                <SVGPlay className="w-6 transition-all duration-300" />
              </Button>
            )}
            {withToggle && !single && (
              <Button tooltip="Series" onClick={this.toggleSingle}>
                <SVGForward className="w-6 transition-all duration-300" />
              </Button>
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

const model = new GroupModel();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm(GroupForm, model));

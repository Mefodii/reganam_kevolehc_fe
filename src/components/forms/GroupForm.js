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
import { withForm } from "./form-functions";
import Button from "../generic/buttons/Button";
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

  removeAliasField = () => {
    if (this.props.formState.aliases.length === 1) return;
    this.props.updateFormState({
      aliases: this.props.model.deleteAlias(this.props.formState.aliases),
    });
  };

  onChangeLink = (i) => (e, field) => {
    const newLinks = [...this.props.formState.links];
    newLinks[i] = field.value;
    this.props.updateFormState({ links: newLinks });
  };

  addLinkField = () =>
    this.props.updateFormState({
      links: this.props.model.addLink(this.props.formState.links),
    });

  removeLinkField = () => {
    if (this.props.formState.links.length === 1) return;
    this.props.updateFormState({
      links: this.props.model.deleteLink(this.props.formState.links),
    });
  };

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

  render() {
    const { single, aliases, links, name } = this.props.formState;
    const { edit, watchioType, onFieldChange } = this.props;

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

        {aliases.map((alias, i) => {
          const aliasField = (
            <TextArea
              label={`Alias ${i + 1}`}
              name={`Alias ${i + 1}`}
              key={i}
              value={alias}
              onChange={this.onChangeAlias(i)}
            />
          );

          if (i > 0)
            return (
              <div className="form-row" key={i}>
                {aliasField}
              </div>
            );

          return (
            <div className="form-row space-x-2 flex-row" key={i}>
              {aliasField}
              <div className="w-10 h-full flex flex-col space-y-1 items-center">
                <Button tooltip="Add Alias" onClick={this.addAliasField}>
                  <SVGPlus className="w-3 transition-all duration-300" />
                </Button>
                <Button tooltip="Remove Alias" onClick={this.removeAliasField}>
                  <SVGMinus className="w-3 transition-all duration-300" />
                </Button>
              </div>
            </div>
          );
        })}

        {links.map((link, i) => {
          const linkField = (
            <TextArea
              label={`Link ${i + 1}`}
              name={`Link ${i + 1}`}
              key={i}
              value={link}
              onChange={this.onChangeLink(i)}
            />
          );

          if (i > 0)
            return (
              <div className="form-row" key={i}>
                {linkField}
              </div>
            );

          return (
            <div className="form-row space-x-2 flex-row" key={i}>
              {linkField}
              <div className="w-10 h-full flex flex-col space-y-1 items-center">
                <Button tooltip="Add Link" onClick={this.addLinkField}>
                  <SVGPlus className="w-3 transition-all duration-300" />
                </Button>
                <Button tooltip="Remove Link" onClick={this.removeLinkField}>
                  <SVGMinus className="w-3 transition-all duration-300" />
                </Button>
              </div>
            </div>
          );
        })}

        <div className="flex">
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

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  addContentWatcher,
  updateContentWatcher,
  deleteContentWatcher,
} from "../../actions/contentWatchers";
import { BLANK_VALUE } from "../../util/constants";
import Number from "../generic/form/Number";
import Date from "../generic/form/Date";
import DropdownSelect from "../generic/form/DropdownSelect";
import ContentWatcherModel from "../../models/contentWatcher";
import { withForm } from "./form-functions";
import Button from "../generic/buttons/Button";
import SVGCheck from "../generic/svg/SVGCheck";
import SVGTrash from "../generic/svg/SVGTrash";
import Text from "../generic/form/Text";

export class ContentWatcherForm extends Component {
  static propTypes = {
    contentWatcher: PropTypes.object,
    edit: PropTypes.bool.isRequired,
    sourceTypes: PropTypes.array.isRequired,
    statusTypes: PropTypes.array.isRequired,
    extensionTypes: PropTypes.array.isRequired,
    //
    onSuccess: PropTypes.func,
    addContentWatcher: PropTypes.func.isRequired,
    updateContentWatcher: PropTypes.func.isRequired,
    deleteContentWatcher: PropTypes.func.isRequired,
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
    contentWatcher: {},
    onSuccess: () => {},
  };

  addContentWatcher = () => {
    const { validateForm, addContentWatcher, onSuccess } = this.props;
    const [contentWatcher, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    addContentWatcher(contentWatcher).then(onSuccess);
  };

  saveChanges = () => {
    const { validateForm, updateContentWatcher, onSuccess } = this.props;
    const [contentWatcher, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    updateContentWatcher(contentWatcher).then(onSuccess);
  };

  deleteContentWatcher = () => {
    const { deleteContentWatcher, onSuccess, contentWatcher } = this.props;
    deleteContentWatcher(contentWatcher).then(onSuccess);
  };

  render() {
    const {
      name,
      watcher_id,
      source_type,
      status,
      check_date,
      download_count,
      file_extension,
    } = this.props.formState;
    const { edit, onFieldChange } = this.props;

    const title = edit ? `Edit Watcher` : `Add Watcher`;
    return (
      // TODO -> to tailwind classname
      <div className="simple-font p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full">
        <div className="title">{title}</div>

        <div className="form-row">
          <Text
            label="Name"
            name="name"
            value={name}
            onChange={onFieldChange}
          />
          <Text
            label="Watcher ID"
            name="watcher_id"
            value={watcher_id}
            onChange={onFieldChange}
          />
        </div>

        <div className="form-row">
          <Date
            label={`Check Date (UTC-0)`}
            name="check_date"
            value={check_date}
            onChange={onFieldChange}
          />
          <Number
            label="Count"
            name="download_count"
            value={download_count}
            onChange={onFieldChange}
          />
        </div>

        <div className="form-row">
          <DropdownSelect
            label="Watcher Type"
            name="source_type"
            value={source_type}
            placeholder={BLANK_VALUE}
            options={this.props.sourceTypes}
            onChange={onFieldChange}
          />
          <DropdownSelect
            label="Status"
            name="status"
            value={status}
            placeholder={BLANK_VALUE}
            options={this.props.statusTypes}
            onChange={onFieldChange}
          />
          <DropdownSelect
            label="Extension"
            name="file_extension"
            value={file_extension}
            placeholder={BLANK_VALUE}
            options={this.props.extensionTypes}
            onChange={onFieldChange}
          />
        </div>

        <div className="flex">
          {!edit && (
            <Button tooltip="Add Group" onClick={this.addContentWatcher}>
              <SVGCheck className="w-6 transition-all duration-300" />
            </Button>
          )}

          {edit && (
            <>
              <Button tooltip="Save Changes" onClick={this.saveChanges}>
                <SVGCheck className="w-6 transition-all duration-300" />
              </Button>
              <Button
                tooltip="Delete Group"
                onClick={this.deleteContentWatcher}
              >
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
  sourceTypes: state.info.contentWatcherSourceTypes,
  statusTypes: state.info.contentWatcherStatusTypes,
  extensionTypes: state.info.fileExtensionTypes,
});

const mapDispatchToProps = {
  addContentWatcher,
  updateContentWatcher,
  deleteContentWatcher,
};

const model = new ContentWatcherModel();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm(ContentWatcherForm, model));

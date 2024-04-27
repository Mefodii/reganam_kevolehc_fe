import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BLANK_VALUE } from '../../../util/constants';

import { Date, Number, DropdownSelect, Text } from '../../../components/form';
import { withForm, withFormExtraPropTypes } from '../../../components/hoc';
import { Button } from '../../../components/buttons';
import { SVGCheck, SVGTrash } from '../../../components/svg';

import ContentWatcherModel from '../../../models/contentWatcher';
import {
  selectFileExtensionTypes,
  selectContentWatcherSourceTypes,
  selectContentWatcherStatusTypes,
} from '../info/infoSlice';
import {
  createContentWatcher,
  updateContentWatcher,
  deleteContentWatcher,
} from './contentWatchersSlice';

class ContentWatcherForm extends Component {
  static propTypes = {
    contentWatcher: PropTypes.object,
    edit: PropTypes.bool.isRequired,
    sourceTypes: PropTypes.array.isRequired,
    statusTypes: PropTypes.array.isRequired,
    extensionTypes: PropTypes.array.isRequired,
    //
    onSuccess: PropTypes.func,
    createContentWatcher: PropTypes.func.isRequired,
    updateContentWatcher: PropTypes.func.isRequired,
    deleteContentWatcher: PropTypes.func.isRequired,
    ...withFormExtraPropTypes,
  };

  static defaultProps = {
    contentWatcher: {},
    onSuccess: () => {},
  };

  createContentWatcher = () => {
    const { validateForm, createContentWatcher, onSuccess } = this.props;
    const [contentWatcher, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    createContentWatcher(contentWatcher).then(onSuccess);
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
      <div className='simple-font p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full'>
        <div className='title'>{title}</div>

        <div className='form-row'>
          <Text
            label='Name'
            name='name'
            value={name}
            onChange={onFieldChange}
          />
          <Text
            label='Watcher ID'
            name='watcher_id'
            value={watcher_id}
            onChange={onFieldChange}
          />
        </div>

        <div className='form-row'>
          <Date
            label={`Check Date (UTC-0)`}
            name='check_date'
            value={check_date}
            onChange={onFieldChange}
          />
          <Number
            label='Count'
            name='download_count'
            value={download_count}
            onChange={onFieldChange}
          />
        </div>

        <div className='form-row'>
          <DropdownSelect
            label='Watcher Type'
            name='source_type'
            value={source_type}
            placeholder={BLANK_VALUE}
            options={this.props.sourceTypes}
            onChange={onFieldChange}
          />
          <DropdownSelect
            label='Status'
            name='status'
            value={status}
            placeholder={BLANK_VALUE}
            options={this.props.statusTypes}
            onChange={onFieldChange}
          />
          <DropdownSelect
            label='Extension'
            name='file_extension'
            value={file_extension}
            placeholder={BLANK_VALUE}
            options={this.props.extensionTypes}
            onChange={onFieldChange}
          />
        </div>

        <div className='flex'>
          {!edit && (
            <Button tooltip='Add Group' onClick={this.createContentWatcher}>
              <SVGCheck className='w-6 transition-all duration-300' />
            </Button>
          )}

          {edit && (
            <>
              <Button tooltip='Save Changes' onClick={this.saveChanges}>
                <SVGCheck className='w-6 transition-all duration-300' />
              </Button>
              <Button
                tooltip='Delete Group'
                onClick={this.deleteContentWatcher}
              >
                <SVGTrash className='w-6 transition-all duration-300' />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sourceTypes: selectContentWatcherSourceTypes(state),
  statusTypes: selectContentWatcherStatusTypes(state),
  extensionTypes: selectFileExtensionTypes(state),
});

const mapDispatchToProps = {
  createContentWatcher,
  updateContentWatcher,
  deleteContentWatcher,
};

const model = new ContentWatcherModel();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm(ContentWatcherForm, model));

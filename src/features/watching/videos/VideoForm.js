import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SVGCheck, SVGTrash } from '../../../components/svg';
import {
  Date,
  TextAreaArray,
  Text,
  DropdownSelect,
  TextArea,
  Number,
} from '../../../components/form';
import { withForm, withFormExtraPropTypes } from '../../../components/hoc';
import { Button } from '../../../components/buttons';

import VideoModel from '../../../models/video';
import { selectStatusTypes } from '../info/infoSlice';
import { createVideo, deleteVideo, updateVideo } from '../groups/groupsSlice';

class VideoForm extends Component {
  static propTypes = {
    video: PropTypes.object,
    edit: PropTypes.bool,
    statusTypes: PropTypes.array.isRequired,
    groupId: PropTypes.number.isRequired,
    watchingType: PropTypes.string.isRequired,
    //
    createVideo: PropTypes.func.isRequired,
    updateVideo: PropTypes.func.isRequired,
    deleteVideo: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    ...withFormExtraPropTypes,
  };

  static defaultProps = {
    video: {},
    onSuccess: () => {},
  };

  setCurrentEpisodeMax = () =>
    this.setState({ current_episode: this.state.episodes });

  createVideo = () => {
    const { validateForm, createVideo, onSuccess } = this.props;
    const [video, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    createVideo(video).then(onSuccess);
  };

  saveChanges = () => {
    const { watchingType, validateForm, updateVideo, onSuccess } = this.props;
    const [video, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    updateVideo(video, watchingType).then(onSuccess);
  };

  deleteVideo = () => {
    const { deleteVideo, onSuccess, watchingType, video } = this.props;
    deleteVideo(video, watchingType).then(onSuccess);
  };

  render() {
    const {
      name,
      comment,
      aliases,
      links,
      year,
      status,
      watched_date,
      order,
      current_episode,
      episodes,
      rating,
    } = this.props.formState;
    const { edit, onFieldChange } = this.props;

    const title = edit ? 'Edit Video' : 'Add Video';
    return (
      <div className='simple-font p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full'>
        <div className='title'>{title}</div>

        <div className='form-row'>
          <TextArea
            label='Name'
            name='name'
            value={name}
            onChange={onFieldChange}
            copy
            paste
          />
        </div>

        <div className='form-row'>
          <Text
            label='Comment'
            name='comment'
            value={comment}
            onChange={onFieldChange}
          />
          <Number
            label='Order'
            name='order'
            value={order}
            onChange={onFieldChange}
          />
          <DropdownSelect
            className='text-center'
            label='Watch status'
            name='status'
            placeholder='Select status'
            value={status}
            options={this.props.statusTypes}
            onChange={onFieldChange}
          />
          <Date
            label={`${status || 'Watched '} Date`}
            name='watched_date'
            value={watched_date}
            onChange={onFieldChange}
          />
        </div>

        <div className='form-row'>
          <Number
            label='Year'
            name='year'
            value={year}
            onChange={onFieldChange}
          />
          <Number
            label='Current ep.'
            name='current_episode'
            value={current_episode}
            onChange={onFieldChange}
          >
            <div
              className='absolute right-4 top-1'
              onClick={this.setCurrentEpisodeMax}
            >
              <SVGCheck className='w-6 simple-clickable'></SVGCheck>
            </div>
          </Number>
          <Number
            label='Episodes'
            name='episodes'
            value={episodes}
            onChange={onFieldChange}
          />
          <Number
            label='Rating'
            name='rating'
            value={rating}
            onChange={onFieldChange}
          />
        </div>

        <TextAreaArray
          name='aliases'
          labelItem={(item, i) => `Alias ${i + 1}`}
          items={aliases}
          onChange={onFieldChange}
          addItem={this.props.model.addAlias}
          removeItem={this.props.model.removeAlias}
          copy
          paste
        />

        <TextAreaArray
          name='links'
          labelItem={(item, i) => `Link ${i + 1}`}
          items={links}
          onChange={onFieldChange}
          addItem={this.props.model.addLink}
          removeItem={this.props.model.removeLink}
          copy
          paste
        />

        <div className='flex'>
          {!edit && (
            <Button tooltip='Add Video' onClick={this.createVideo}>
              <SVGCheck className='w-6 transition-all duration-300' />
            </Button>
          )}

          {edit && (
            <>
              <Button tooltip='Save Changes' onClick={this.saveChanges}>
                <SVGCheck className='w-6 transition-all duration-300' />
              </Button>
              <Button tooltip='Delete Video' onClick={this.deleteVideo}>
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
  statusTypes: selectStatusTypes(state),
});

const mapDispatchToProps = {
  createVideo,
  updateVideo,
  deleteVideo,
};

const model = new VideoModel();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm(VideoForm, model));

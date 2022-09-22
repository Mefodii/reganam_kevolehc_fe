import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addVideo, updateVideo, deleteVideo } from "../../actions/videos";

import SVGCheck from "../generic/svg/SVGCheck";
import Number from "../generic/form/Number";
import Date from "../generic/form/Date";
import TextArea from "../generic/form/TextArea";
import DropdownSelect from "../generic/form/DropdownSelect";
import VideoModel from "../../models/video";
import { withForm } from "./form-functions";
import SVGTrash from "../generic/svg/SVGTrash";
import SVGPlus from "../generic/svg/SVGPlus";
import SVGMinus from "../generic/svg/SVGMinus";
import Text from "../generic/form/Text";
import Button from "../generic/buttons/Button";

export class VideoForm extends Component {
  static propTypes = {
    video: PropTypes.object,
    edit: PropTypes.bool,
    statusTypes: PropTypes.array.isRequired,
    groupId: PropTypes.number.isRequired,
    watchioType: PropTypes.string.isRequired,
    //
    addVideo: PropTypes.func.isRequired,
    updateVideo: PropTypes.func.isRequired,
    deleteVideo: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
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
    video: {},
    onSuccess: () => {},
  };

  onChangeAlias = (i) => (e, field) => {
    const newAliases = [...this.props.formState.aliases];
    newAliases[i] = field.value;
    this.props.updateFormState({ aliases: newAliases });
  };
  setCurrentEpisodeMax = () =>
    this.setState({ current_episode: this.state.episodes });

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

  addVideo = () => {
    const { watchioType, groupId, validateForm, addVideo, onSuccess } =
      this.props;
    const [video, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    addVideo(video, groupId, watchioType).then(onSuccess);
  };

  saveChanges = () => {
    const { watchioType, groupId, validateForm, updateVideo, onSuccess } =
      this.props;
    const [video, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    updateVideo(video, groupId, watchioType).then(onSuccess);
  };

  deleteVideo = () => {
    const { deleteVideo, onSuccess, watchioType } = this.props;
    const { id, group } = this.props.video;
    deleteVideo(id, group, watchioType).then(onSuccess);
  };

  render() {
    const {
      name,
      comment,
      aliases,
      year,
      status,
      watched_date,
      order,
      current_episode,
      episodes,
      rating,
    } = this.props.formState;
    const { edit, onFieldChange } = this.props;

    const title = edit ? "Edit Video" : "Add Video";
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

        <div className="form-row">
          <Text
            label="Comment"
            name="comment"
            value={comment}
            onChange={onFieldChange}
          />
          <Number
            label="Order"
            name="order"
            value={order}
            onChange={onFieldChange}
          />
          <DropdownSelect
            className="text-center"
            label="Watch status"
            name="status"
            placeholder="Select status"
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
        </div>

        <div className="form-row">
          <Number
            label="Year"
            name="year"
            value={year}
            onChange={onFieldChange}
          />
          <Number
            label="Current ep."
            name="current_episode"
            value={current_episode}
            onChange={onFieldChange}
          >
            <div
              className="absolute right-4 top-1"
              onClick={this.setCurrentEpisodeMax}
            >
              <SVGCheck className="w-6 simple-clickable"></SVGCheck>
            </div>
          </Number>
          <Number
            label="Episodes"
            name="episodes"
            value={episodes}
            onChange={onFieldChange}
          />
          <Number
            label="Rating"
            name="rating"
            value={rating}
            onChange={onFieldChange}
          />
        </div>

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
            <div className="form-row space-x-2" key={i}>
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

        <div className="flex">
          {!edit && (
            <Button tooltip="Add Video" onClick={this.addVideo}>
              <SVGCheck className="w-6 transition-all duration-300" />
            </Button>
          )}

          {edit && (
            <>
              <Button tooltip="Save Changes" onClick={this.saveChanges}>
                <SVGCheck className="w-6 transition-all duration-300" />
              </Button>
              <Button tooltip="Delete Video" onClick={this.deleteVideo}>
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
});

const mapDispatchToProps = {
  addVideo,
  updateVideo,
  deleteVideo,
};

const model = new VideoModel();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm(VideoForm, model));

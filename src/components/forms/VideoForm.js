import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addVideo, updateVideo, deleteVideo } from "../../actions/videos";

import SVGCheck from "../generic/svg/SVGCheck";
import Number from "../generic/form/Number";
import Date from "../generic/form/Date";
import Textarea from "../generic/form/Textarea";
import DropdownSelect from "../generic/form/DropdownSelect";
import VideoModel from "../../models/video";
import { withForm } from "./form-functions";
import SVGCross from "../generic/svg/SVGCross";
import SVGTrash from "../generic/svg/SVGTrash";
import CompactButton from "../generic/buttons/CompactButton";

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
    updateModel: PropTypes.func.isRequired,
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

  removeAliasField = () =>
    this.props.updateFormState({
      aliases: this.props.model.deleteAlias(this.props.formState.aliases),
    });

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

  componentDidMount() {
    const { edit } = this.props;
    this.props.updateModel({ edit });
    edit ? this.props.loadFormState() : this.props.resetFormState();
  }

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
    const { edit, onFieldChange, onSuccess } = this.props;

    const title = edit ? "Edit Video" : "Add Video";
    return (
      <div className="simple-font p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full">
        <div className="title">{title}</div>

        <div className="p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full">
          <div className="simple-font flex flex-col 2xl:flex-row w-full justify-between 2xl:space-x-4">
            <div className="w-full space-y-1">
              <Textarea
                label="Name"
                name="name"
                value={name}
                onChange={onFieldChange}
              />

              <div className="flex flex-row w-full space-x-2">
                <Textarea
                  label="Comment"
                  name="comment"
                  value={comment}
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

              <div className="flex flex-row w-full justify-between space-x-2">
                <Number
                  label="Year"
                  name="year"
                  value={year}
                  onChange={onFieldChange}
                />
                <Number
                  label="Order"
                  name="order"
                  value={order}
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
            </div>

            <div className="w-full">
              {aliases.map((alias, i) => (
                <Textarea
                  label={`Alias ${i + 1}`}
                  name={`Alias ${i + 1}`}
                  key={i}
                  value={alias}
                  onChange={this.onChangeAlias(i)}
                />
              ))}
              <div className="flex justify-between">
                <div className="flex">
                  <div className="w-16 btn" onClick={this.addAliasField}>
                    +
                  </div>
                  <div className="w-16 btn" onClick={this.removeAliasField}>
                    -
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end w-full bg-theme-3 border-2 border-theme-1 py-1">
            {!edit && (
              <CompactButton
                className={"group hover:bg-theme-2"}
                text="Add Video"
                onClick={this.addVideo}
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
                  text="Discard Changes"
                  onClick={onSuccess}
                >
                  <SVGCross className="w-6 transition-all duration-300" />
                </CompactButton>
                <CompactButton
                  className={"group hover:bg-theme-2"}
                  text="Delete Video"
                  onClick={this.deleteVideo}
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
});

const mapDispatchToProps = {
  addVideo,
  updateVideo,
  deleteVideo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm(VideoForm, VideoModel));

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { objectEqualsSimple } from "../../../util/functions";

import { addVideo, updateVideo, deleteVideo } from "../../../actions/videos";
import { isEmpty } from "lodash";
import SVGCheck from "../../generic/svg/SVGCheck";
import {
  addAliasFields,
  cleanAliases,
  removeAliasField,
} from "../util/functions";
import Number from "../../generic/form/Number";
import Date from "../../generic/form/Date";
import Textarea from "../../generic/form/Textarea";
import DropdownSelect from "../../generic/form/DropdownSelect";

export class VideoForm extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    hideTitle: PropTypes.bool,
    statusTypes: PropTypes.array.isRequired,
    groupId: PropTypes.number.isRequired,
    watchioType: PropTypes.string.isRequired,
    addVideo: PropTypes.func.isRequired,
    updateVideo: PropTypes.func.isRequired,
    deleteVideo: PropTypes.func.isRequired,
    closeForm: PropTypes.func,
  };

  state = {
    name: "",
    comment: "",
    aliases: ["", ""],
    status: "",
    watched_date: null,
    year: 0,
    order: 1,
    current_episode: 0,
    episodes: 1,
    rating: 1,
  };

  propsToState = () => {
    if (this.props.edit) {
      this.mapVideoToState(this.props.video);
      return;
    }

    const { defaultOrder = 1 } = this.props;
    this.setState({ order: defaultOrder });
  };

  mapVideoToState = (video) => {
    const {
      name,
      comment,
      year,
      status,
      watched_date,
      order,
      current_episode,
      episodes,
      rating,
    } = video;

    var aliases = [...video.aliases];
    while (aliases.length < 2) {
      aliases.push("");
    }

    this.setState({
      name,
      comment,
      aliases,
      year,
      status,
      order,
      current_episode,
      episodes,
      rating,
      watched_date,
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onChangeNumber = (e) =>
    this.setState({ [e.target.name]: e.target.valueAsNumber });
  onChangeAlias = (i) => (e) => {
    const newAliases = [...this.state.aliases];
    newAliases[i] = e.target.value;
    this.setState({ aliases: newAliases });
  };
  setCurrentEpisodeMax = () =>
    this.setState({ current_episode: this.state.episodes });

  addAliasFields = (count = 1) =>
    this.setState({ aliases: addAliasFields(this.state.aliases, count) });

  removeAliasField = () =>
    this.setState({ aliases: removeAliasField(this.state.aliases) });

  hasVideoDataChanged = () => {
    const oldVideo = {
      name: this.props.video.name,
      comment: this.props.video.comment,
      aliases: this.props.video.aliases,
      status: this.props.video.status,
      watched_date: this.props.video.watched_date,
      year: this.props.video.year,
      order: this.props.video.order,
      current_episode: this.props.video.current_episode,
      episodes: this.props.video.episodes,
      rating: this.props.video.rating,
    };

    const newVideo = {
      name: this.state.name,
      comment: this.state.comment,
      aliases: cleanAliases(this.state.aliases),
      status: this.state.status,
      watched_date: isEmpty(this.state.status.watched_date)
        ? null
        : this.state.status.watched_date,
      year: this.state.year,
      order: this.state.order,
      current_episode: this.state.current_episode,
      episodes: this.state.episodes,
      rating: this.state.rating,
    };

    return !objectEqualsSimple(oldVideo, newVideo);
  };

  buildVideo = () => {
    const video = {
      id: this.props.video?.id,
      type: this.props.watchioType,
      group: this.props.groupId,
      name: this.state.name,
      comment: this.state.comment,
      aliases: cleanAliases(this.state.aliases),
      year: this.state.year,
      status: this.state.status,
      watched_date: isEmpty(this.state.watched_date)
        ? null
        : this.state.watched_date,
      order: this.state.order,
      current_episode: this.state.current_episode,
      episodes: this.state.episodes,
      rating: this.state.rating,
    };

    return video;
  };

  addVideo = () => {
    const { watchioType, groupId } = this.props;
    this.props.addVideo(this.buildVideo(), groupId, watchioType);
  };

  saveChanges = () => {
    if (this.hasVideoDataChanged()) {
      const { watchioType, groupId } = this.props;
      this.props.updateVideo(this.buildVideo(), groupId, watchioType);
    }
    this.props.closeForm();
  };

  deleteVideo = () => {
    const { id, group } = this.props.video;
    this.props.deleteVideo(id, group, this.props.watchioType);
    this.props.closeForm();
  };

  componentDidMount() {
    this.propsToState();
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
    } = this.state;
    const { hideTitle, edit } = this.props;

    return (
      <Fragment>
        {!hideTitle && (
          <div className="text-xl uppercase font-bold m-4 text-center">
            Add Video
          </div>
        )}

        <div className="p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full">
          <div className="simple-font flex flex-col 2xl:flex-row w-full justify-between 2xl:space-x-4">
            <div className="w-full space-y-1">
              <Textarea
                label="Name"
                name="name"
                value={name}
                onChange={this.onChange}
              />

              <div className="flex flex-row w-full space-x-2">
                <Textarea
                  label="Comment"
                  name="comment"
                  value={comment}
                  onChange={this.onChange}
                />
                <DropdownSelect
                  className="text-center"
                  label="Watch status"
                  name="status"
                  placeholder="Select status"
                  value={status}
                  options={this.props.statusTypes}
                  onChange={this.onChange}
                />
                <Date
                  label={`${status || "Watched "} Date`}
                  name="watched_date"
                  value={watched_date || ""}
                  onChange={this.onChange}
                  maxLength={10}
                />
              </div>

              <div className="flex flex-row w-full justify-between space-x-2">
                <Number
                  label="Year"
                  name="year"
                  value={year}
                  onChange={this.onChangeNumber}
                />
                <Number
                  label="Order"
                  name="order"
                  value={order}
                  onChange={this.onChangeNumber}
                />
                <Number
                  label="Current ep."
                  name="current_episode"
                  value={current_episode}
                  onChange={this.onChangeNumber}
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
                  onChange={this.onChangeNumber}
                />
                <Number
                  label="Rating"
                  name="rating"
                  value={rating}
                  onChange={this.onChangeNumber}
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
                  <div className="w-16 btn" onClick={this.addAliasFields}>
                    +
                  </div>
                  <div className="w-16 btn" onClick={this.removeAliasField}>
                    -
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            {!edit && (
              <div
                className="w-max btn option-selected"
                onClick={this.addVideo}
              >
                Add Video
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
                <div className="w-max btn" onClick={this.props.closeForm}>
                  Discard Changes
                </div>
              </div>
            )}

            {edit && (
              <div className="w-max btn bg-pink-900" onClick={this.deleteVideo}>
                Delete Video
              </div>
            )}
          </div>
        </div>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm);

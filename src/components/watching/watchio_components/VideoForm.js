import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InputContainer, {
  INPUT_NUMBER,
  INPUT_SELECT,
  INPUT_TEXTAREA,
} from "../../generic/form/InputContainer";

import { getToday, objectEqualsSimple } from "../../../util/functions";

import { addVideo, updateVideo, deleteVideo } from "../../../actions/videos";
import { isEmpty } from "lodash";
import SVGCalendar from "../../generic/svg/SVGCalendar";
import SVGCheck from "../../generic/svg/SVGCheck";

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
    year: null,
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
  onChangeAlias = (i) => (e) => {
    const newAliases = [...this.state.aliases];
    newAliases[i] = e.target.value;
    this.setState({ aliases: newAliases });
  };
  setWatchedkDate = (value) => this.setState({ watched_date: value });
  setCurrentEpisodeMax = () =>
    this.setState({ current_episode: this.state.episodes });

  addAliasFields = (count = 1) => {
    const newAliases = [...Array(count).keys()].map((_) => "");
    this.setState({ aliases: [...this.state.aliases, ...newAliases] });
  };

  removeAliasField = () => {
    this.setState({ aliases: [...this.state.aliases.slice(0, -1)] });
  };

  cleanAliases = (aliases) => {
    return aliases
      .map((alias) => alias.trim())
      .filter((alias) => alias.length > 0);
  };

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
      aliases: this.cleanAliases(this.state.aliases),
      status: this.state.status,
      watched_date: this.state.status.watched_date,
      year: this.state.year,
      order: this.state.order,
      current_episode: this.state.current_episode,
      episodes: this.state.episodes,
      rating: this.state.rating,
    };

    return !objectEqualsSimple(oldVideo, newVideo);
  };

  buildVideo = () => {
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
    } = this.state;
    const { watchioType: type, groupId: group } = this.props;
    const id = this.props.video?.id;

    const aliases = this.cleanAliases(this.state.aliases);

    const video = {
      id,
      name,
      comment,
      type,
      group,
      aliases,
      year,
      status,
      watched_date: isEmpty(watched_date) ? null : watched_date,
      order,
      current_episode,
      episodes,
      rating,
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
        <div className="flex justify-evenly bg-secondary border-2 border-tertiary rounded-xl shadow-lg w-full">
          <div className="m-4 flex flex-col-reverse 2xl:flex-row w-full justify-between 2xl:space-x-4">
            <div className="w-full">
              <div className="simple-font">
                <InputContainer
                  label="Name"
                  type={INPUT_TEXTAREA}
                  name="name"
                  value={name}
                  onChange={this.onChange}
                ></InputContainer>

                <div className="flex flex-row w-full space-x-2">
                  <InputContainer
                    className="h-full"
                    label="Comment"
                    type={INPUT_TEXTAREA}
                    name="comment"
                    value={comment}
                    onChange={this.onChange}
                  ></InputContainer>
                  <InputContainer
                    className="text-center"
                    label="Watch status"
                    type={INPUT_SELECT}
                    name="status"
                    placeholder="Select status"
                    value={status}
                    options={this.props.statusTypes}
                    onChange={this.onChange}
                  ></InputContainer>
                  <div className="group w-full">
                    <InputContainer
                      label={`${status || "Watched "} Date`}
                      type={INPUT_TEXTAREA}
                      name="watched_date"
                      value={watched_date || ""}
                      onChange={this.onChange}
                      maxLength={10}
                    >
                      <div
                        className="absolute right-2 top-1"
                        onClick={() => this.setWatchedkDate(getToday())}
                      >
                        <SVGCalendar className="w-6 simple-clickable"></SVGCalendar>
                      </div>
                    </InputContainer>
                  </div>
                </div>

                <div className="flex flex-row w-full justify-between space-x-2">
                  <InputContainer
                    label="Year"
                    type={INPUT_NUMBER}
                    name="year"
                    value={year || ""}
                    onChange={this.onChange}
                  ></InputContainer>
                  <InputContainer
                    label="Order"
                    type={INPUT_NUMBER}
                    name="order"
                    value={order}
                    onChange={this.onChange}
                  ></InputContainer>
                  <div className="group w-full">
                    <InputContainer
                      className="h-full"
                      label="Current ep."
                      type={INPUT_NUMBER}
                      name="current_episode"
                      value={current_episode}
                      onChange={this.onChange}
                    >
                      <div
                        className="absolute right-4 top-1"
                        onClick={this.setCurrentEpisodeMax}
                      >
                        <SVGCheck className="w-6 simple-clickable"></SVGCheck>
                      </div>
                    </InputContainer>
                  </div>
                  <InputContainer
                    label="Episodes"
                    type={INPUT_NUMBER}
                    name="episodes"
                    value={episodes}
                    onChange={this.onChange}
                  ></InputContainer>
                  <InputContainer
                    label="Rating"
                    type={INPUT_NUMBER}
                    name="rating"
                    value={rating}
                    onChange={this.onChange}
                  ></InputContainer>
                </div>
              </div>

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
            </div>
            <div className="w-full">
              {aliases.map((alias, i) => (
                <InputContainer
                  className="simple-font"
                  label={`Alias ${i + 1}`}
                  type={INPUT_TEXTAREA}
                  key={i}
                  value={alias}
                  onChange={this.onChangeAlias(i)}
                ></InputContainer>
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
                {edit && (
                  <div
                    className="w-max btn bg-pink-900"
                    onClick={this.deleteVideo}
                  >
                    Delete Video
                  </div>
                )}
              </div>
            </div>
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

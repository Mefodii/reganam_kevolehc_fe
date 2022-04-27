import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteAnimeVideo, updateAnimeVideo } from "../../../actions/anime";

import SVGPencil from "../../generic/svg/SVGPencil";
import InputContainer, {
  INPUT_NUMBER,
  INPUT_SELECT,
  INPUT_TEXTAREA,
} from "../../generic/form/InputContainer";
import { objectEqualsSimple } from "../../../util/functions";

export class AnimeItem extends Component {
  static propTypes = {
    statusTypes: PropTypes.array.isRequired,
    video: PropTypes.object.isRequired,
    updateAnimeVideo: PropTypes.func.isRequired,
    deleteAnimeVideo: PropTypes.func.isRequired,
  };

  state = {
    name: "",
    aliases: [],
    status: "",
    year: 1,
    order: 1,
    episodes: 1,
    rating: 1,
    edit: false,
  };

  propsToState = () => {
    const { name, aliases, year, status, order, episodes, rating } =
      this.props.video;
    this.setState({ name, aliases, year, status, order, episodes, rating });
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onChangeAlias = (i) => (e) => {
    const newAliases = [...this.state.aliases];
    newAliases[i] = e.target.value;
    this.setState({ aliases: newAliases });
  };

  addAliasFields = (count = 1) => {
    const newAliases = [...Array(count).keys()].map((_) => "");
    this.setState({ aliases: [...this.state.aliases, ...newAliases] });
  };

  fillAliasFields = () => {
    var aliasesToFill = 2 - this.state.aliases.length;
    if (aliasesToFill > 0) this.addAliasFields(aliasesToFill);
  };

  removeAliasField = () => {
    this.setState({ aliases: [...this.state.aliases.slice(0, -1)] });
  };

  /**
   * First update aliases (remove empty rows)
   * Then call updateAnimeVideo
   */
  saveChanges = () => {
    const aliases = this.state.aliases
      .map((alias) => alias.trim())
      .filter((alias) => alias.length > 0);

    this.setState({ aliases }, this.updateAnimeVideo);
  };

  /**
   * Discard all changes on video (set initial values from props to state)
   */
  discardChanges = () => {
    this.propsToState();
    this.toggleEdit();
  };

  hasVideoDataChanged = () => {
    const oldVideo = {
      name: this.props.video.name,
      aliases: this.props.video.aliases,
      status: this.props.video.status,
      year: this.props.video.year,
      order: this.props.video.order,
      episodes: this.props.video.episodes,
      rating: this.props.video.rating,
    };

    const newVideo = {
      name: this.state.name,
      aliases: this.state.aliases,
      status: this.state.status,
      year: this.state.year,
      order: this.state.order,
      episodes: this.state.episodes,
      rating: this.state.rating,
    };

    return !objectEqualsSimple(oldVideo, newVideo);
  };

  updateAnimeVideo = () => {
    if (this.hasVideoDataChanged()) {
      const { id, group, type } = this.props.video;
      const { name, aliases, year, status, order, episodes, rating } =
        this.state;

      const video = {
        id,
        group,
        type,
        name,
        aliases,
        year,
        status,
        order,
        episodes,
        rating,
      };
      this.props.updateAnimeVideo(video, group);
    }
    this.toggleEdit();
  };

  deleteAnimeVideo = () => {
    const { id, group } = this.props.video;
    this.props.deleteAnimeVideo(id, group);
  };

  componentDidUpdate(prevProps, prevState) {
    const currentEdit = this.state.edit;
    const prevEdit = prevState.edit;
    if (prevEdit !== currentEdit && currentEdit === true) {
      this.fillAliasFields();
    }
  }

  componentDidMount() {
    this.propsToState();
  }

  renderEditMode = () => {
    const { name, aliases, year, status, order, episodes, rating } = this.state;

    return (
      <div className="flex">
        <div className="m-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary w-full">
          <div className="flex justify-evenly bg-secondary border-2 border-tertiary rounded-xl shadow-lg w-full">
            <div className="m-4 flex flex-row w-full justify-between space-x-4">
              <div className="w-full">
                <InputContainer
                  label="Name"
                  type={INPUT_TEXTAREA}
                  name="name"
                  value={name}
                  onChange={this.onChange}
                ></InputContainer>
                <div className="flex flex-row w-full justify-between space-x-4">
                  <div className="flex flex-row w-full justify-between space-x-4">
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
                  <div className="w-full text-center">
                    <InputContainer
                      label="Watch status *"
                      type={INPUT_SELECT}
                      name="status"
                      placeholder="Select a status"
                      value={status}
                      options={this.props.statusTypes}
                      onChange={this.onChange}
                    ></InputContainer>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div
                    className={`w-max btn option-selected`}
                    onClick={this.saveChanges}
                  >
                    Save Changes
                  </div>
                  <div className="w-max btn" onClick={this.discardChanges}>
                    Discard Changes
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                {aliases.map((alias, i) => (
                  <InputContainer
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
                  <div
                    className="w-max btn bg-pink-900"
                    onClick={this.deleteAnimeVideo}
                  >
                    Delete Video
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderViewMode = () => {
    const { name, aliases, status, year, episodes, rating } = this.props.video;

    return (
      <div>
        <div className="flex group">
          <div className="m-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary w-full">
            <div className="flex justify-between">
              <div className="break-all">
                <div className="text-2xl font-bold overflow-auto">{name}</div>
                {aliases.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs">Alias:</div>
                    <div>
                      {aliases.map((alias, i) => (
                        <div key={i}>{" - " + alias}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex min-w-max space-x-5 px-3">
                <div>
                  <div className="text-xs">Nr of episodes</div>
                  <div className="font-bold whitespace-pre text-center">
                    {episodes}
                  </div>
                </div>
                <div>
                  <div className="text-xs">Status</div>
                  <div className="font-bold whitespace-pre">{status}</div>
                </div>
                <div>
                  <div className="text-xs">Year</div>
                  <div className="font-bold whitespace-pre text-center">
                    {year || "----"}
                  </div>
                </div>
                <div>
                  <div className="text-xs">Rating</div>
                  <div className="font-bold whitespace-pre text-center">
                    {`${rating} / 10`}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div onClick={this.toggleEdit}>
                <SVGPencil className="w-7 transform opacity-20 group-hover:opacity-100 hover:-rotate-12 hover:scale-125 hover:text-green-300 transition ease-in duration-150"></SVGPencil>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const edit = this.state.edit;

    if (edit) return this.renderEditMode();
    return this.renderViewMode();
  }
}

const mapStateToProps = (state) => ({
  statusTypes: state.info.statusTypes,
});

const mapDispatchToProps = {
  updateAnimeVideo,
  deleteAnimeVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeItem);

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InputContainer, {
  INPUT_NUMBER,
  INPUT_SELECT,
  INPUT_TEXTAREA,
} from "../../generic/form/InputContainer";
import { objectEqualsSimple } from "../../../util/functions";

export class VideoForm extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    statusTypes: PropTypes.array.isRequired,
    groupId: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired,
    discard: PropTypes.func,
    delete: PropTypes.func,
  };

  state = {
    name: "",
    aliases: ["", ""],
    status: "",
    year: null,
    order: 1,
    episodes: 1,
    rating: 1,
  };

  propsToState = () => {
    const { name, year, status, order, episodes, rating } = this.props.video;

    var aliases = [...this.props.video.aliases];
    while (aliases.length < 2) {
      aliases.push("");
    }

    this.setState({ name, aliases, year, status, order, episodes, rating });
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
      aliases: this.props.video.aliases,
      status: this.props.video.status,
      year: this.props.video.year,
      order: this.props.video.order,
      episodes: this.props.video.episodes,
      rating: this.props.video.rating,
    };

    const newVideo = {
      name: this.state.name,
      aliases: this.cleanAliases(this.state.aliases),
      status: this.state.status,
      year: this.state.year,
      order: this.state.order,
      episodes: this.state.episodes,
      rating: this.state.rating,
    };

    return !objectEqualsSimple(oldVideo, newVideo);
  };

  buildVideo = () => {
    const { name, year, status, order, episodes, rating } = this.state;
    const { type, groupId: group } = this.props;
    const id = this.props.video?.id;

    const aliases = this.cleanAliases(this.state.aliases);

    const video = {
      id,
      name,
      type,
      group,
      aliases,
      year,
      status,
      order,
      episodes,
      rating,
    };
    return video;
  };

  addVideo = () => {
    this.props.submit(this.buildVideo(), this.props.groupId);
  };

  saveChanges = () => {
    if (this.hasVideoDataChanged()) {
      this.props.submit(this.buildVideo(), this.props.groupId);
    } else {
      this.props.discard();
    }
  };

  componentDidMount() {
    if (this.props.edit) this.propsToState();
  }

  render() {
    const { name, aliases, year, status, order, episodes, rating } = this.state;
    const { hideTitle, edit } = this.props;

    return (
      <Fragment>
        {!hideTitle && (
          <div className="text-xl uppercase font-bold m-4 text-center">
            Add Video
          </div>
        )}
        <div className="flex justify-evenly bg-secondary border-2 border-tertiary rounded-xl shadow-lg w-full">
          <div className="m-4 flex flex-row w-full justify-between space-x-4">
            <div className="w-full">
              <InputContainer
                label="Name *"
                type={INPUT_TEXTAREA}
                name="name"
                value={name}
                onChange={this.onChange}
              ></InputContainer>

              <div className="flex flex-row w-full justify-between space-x-4">
                <div className="flex flex-row w-full justify-between space-x-2">
                  <InputContainer
                    label="Year"
                    type={INPUT_NUMBER}
                    name="year"
                    value={year || ""}
                    onChange={this.onChange}
                  ></InputContainer>
                  <InputContainer
                    label="Order *"
                    type={INPUT_NUMBER}
                    name="order"
                    value={order}
                    onChange={this.onChange}
                  ></InputContainer>
                  <InputContainer
                    label="Episodes *"
                    type={INPUT_NUMBER}
                    name="episodes"
                    value={episodes}
                    onChange={this.onChange}
                  ></InputContainer>
                  <InputContainer
                    label="Rating *"
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
                  <div className="w-max btn" onClick={this.props.discard}>
                    Discard Changes
                  </div>
                </div>
              )}
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
                {edit && (
                  <div
                    className="w-max btn bg-pink-900"
                    onClick={this.props.delete}
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

export default connect(mapStateToProps, {})(VideoForm);

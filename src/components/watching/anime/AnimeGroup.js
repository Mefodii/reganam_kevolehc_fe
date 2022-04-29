import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  updateAnimeGroup,
  deleteAnimeGroup,
  addAnimeVideo,
  addAnimePoster,
  deleteAnimePoster,
} from "../../../actions/anime";

import { BLANK_CHECK_DATE } from "../../../util/constants";
import { getToday, objectEqualsSimple } from "../../../util/functions";

import AnimeItem from "./AnimeItem";
import VideoForm from "../video_components/VideoForm";
import Poster from "../video_components/Poster";
import InputContainer, {
  INPUT_SELECT,
  INPUT_TEXTAREA,
} from "../../generic/form/InputContainer";
import SVGPencil from "../../generic/svg/SVGPencil";

export class AnimeGroup extends Component {
  static propTypes = {
    statusTypes: PropTypes.array.isRequired,
    //
    group: PropTypes.object.isRequired,
    updateAnimeGroup: PropTypes.func.isRequired,
    deleteAnimeGroup: PropTypes.func.isRequired,
    //
    addAnimePoster: PropTypes.func.isRequired,
    deleteAnimePoster: PropTypes.func.isRequired,
  };

  state = {
    id: 0,
    name: "",
    aliases: ["", ""],
    status: "",
    check_date: getToday(),
    edit: false,
    showVideoForm: false,
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  toggleShowVideoForm = () => {
    this.setState({ showVideoForm: !this.state.showVideoForm });
  };

  propsToState = () => {
    const { id, name, aliases, check_date, status } = this.props.group;
    this.setState({ id, name, aliases, check_date, status });
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

  hasGroupDataChanged = () => {
    const oldGroup = {
      name: this.props.group.name,
      aliases: this.props.group.aliases,
      check_date: this.props.group.check_date,
      status: this.props.group.status,
    };

    const newGroup = {
      name: this.state.name,
      aliases: this.state.aliases,
      check_date: this.state.check_date,
      status: this.state.status,
    };

    return !objectEqualsSimple(oldGroup, newGroup);
  };

  updateGroup = () => {
    if (this.hasGroupDataChanged()) {
      const { type, single } = this.props.group;
      const { id, name, aliases, check_date, status } = this.state;

      const group = { id, name, aliases, check_date, type, single, status };
      this.props.updateAnimeGroup(group);
    }
    this.toggleEdit();
  };

  /**
   * First update aliases (remove empty rows)
   * Then call updateGroup
   */
  saveChanges = () => {
    var { aliases, check_date } = this.state;
    aliases = this.state.aliases
      .map((alias) => alias.trim())
      .filter((alias) => alias.length > 0);

    check_date = check_date || check_date.length > 0 ? check_date : null;
    this.setState({ aliases, check_date }, this.updateGroup);
  };

  /**
   * Discard all changes on group (set initial values from props)
   */
  discardChanges = () => {
    this.propsToState();
    this.toggleEdit();
  };

  deleteAnimeGroup = (id) => () => {
    this.props.deleteAnimeGroup(id);
  };

  componentDidMount() {
    this.propsToState();
  }

  componentDidUpdate(prevProps, prevState) {
    const currentEdit = this.state.edit;
    const prevEdit = prevState.edit;
    if (prevEdit !== currentEdit && currentEdit === true) {
      this.fillAliasFields();
    }
  }

  renderVideos = () => {
    const { videos, single, id } = this.props.group;
    const { showVideoForm, edit } = this.state;

    return (
      <div className="">
        {videos.map((video) => (
          <AnimeItem video={video} key={video.id}></AnimeItem>
        ))}
        {edit && (
          <div className="flex">
            <div className="w-full p-1 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary text-center font-extrabold">
              <div
                className="cursor-pointer mb-1"
                onClick={this.toggleShowVideoForm}
              >
                {showVideoForm ? "↑ Hide form ↑" : "↓ Add new Video ↓ "}
              </div>
              {!single && showVideoForm && (
                <VideoForm
                  submit={this.props.addAnimeVideo}
                  type={this.props.animeType}
                  groupId={id}
                  hideTitle
                ></VideoForm>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  renderEditMode = () => {
    const { images, single } = this.props.group;
    const { id, name, aliases, check_date, status } = this.state;

    return (
      <div>
        <div className="flex">
          <Poster
            images={images}
            groupId={id}
            deletePoster={this.props.deleteAnimePoster}
            addPoster={this.props.addAnimePoster}
          ></Poster>
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
                    <InputContainer
                      label="Last Check Date"
                      type={INPUT_TEXTAREA}
                      name="check_date"
                      value={check_date || ""}
                      onChange={this.onChange}
                      maxLength={10}
                    ></InputContainer>

                    {single && (
                      <div className="w-full text-center">
                        <InputContainer
                          label="Watch status"
                          type={INPUT_SELECT}
                          name="status"
                          placeholder="Select a status"
                          value={status}
                          options={this.props.statusTypes}
                          onChange={this.onChange}
                        ></InputContainer>
                      </div>
                    )}
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
                <div className="w-full">
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
                      onClick={this.deleteAnimeGroup(id)}
                    >
                      Delete Group
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!single && this.renderVideos()}
          </div>
        </div>
      </div>
    );
  };

  renderViewMode = () => {
    const { images, single } = this.props.group;
    const { id, name, aliases, check_date, status } = this.state;

    return (
      <div className="flex">
        <Poster
          images={images}
          groupId={id}
          deletePoster={this.props.deleteAnimePoster}
          addPoster={this.props.addAnimePoster}
        ></Poster>
        <div className="m-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary w-full h-min">
          <div className="group">
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
              <div>
                <div className="flex min-w-max space-x-5 px-3">
                  {single && (
                    <div>
                      <div className="text-xs">Status</div>
                      <div className="font-bold whitespace-pre">{status}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs">Check Date</div>
                    <div className="font-bold whitespace-pre">
                      {check_date || BLANK_CHECK_DATE}
                    </div>
                  </div>
                </div>
                <div className="mt-1 mr-2 flex justify-end">
                  <div onClick={this.toggleEdit}>
                    <SVGPencil className="w-7 wiggling-clickable"></SVGPencil>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.renderVideos()}
        </div>
      </div>
    );
  };

  render() {
    const edit = this.state.edit;

    return (
      <div className="m-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary">
        {edit ? this.renderEditMode() : this.renderViewMode()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  animeType: state.info.videoTypes.anime,
  statusTypes: state.info.statusTypes,
});

const mapDispatchToProps = {
  updateAnimeGroup,
  deleteAnimeGroup,
  addAnimeVideo,
  addAnimePoster,
  deleteAnimePoster,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeGroup);

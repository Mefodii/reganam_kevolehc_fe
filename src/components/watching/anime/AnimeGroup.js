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

import { OPTION_SELECTED } from "../../../util/constants";
import { getToday, objectEqualsSimple } from "../../../util/functions";

import AnimeItem from "./AnimeItem";
import VideoForm from "../video_components/VideoForm";
import Poster from "../video_components/Poster";
import InputContainer, {
  INPUT_TEXT,
  INPUT_TEXTAREA,
} from "../../generic/form/InputContainer";

export class AnimeGroup extends Component {
  static propTypes = {
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
    check_date: getToday(),
    edit: false,
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  propsToState = () => {
    const { id, name, aliases, check_date } = this.props.group;
    this.setState({ id, name, aliases, check_date });
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
    };

    const newGroup = {
      name: this.state.name,
      aliases: this.state.aliases,
      check_date: this.state.check_date,
    };

    return !objectEqualsSimple(oldGroup, newGroup);
  };

  updateGroup = () => {
    if (this.hasGroupDataChanged()) {
      const { type } = this.props.group;
      const { id, name, aliases, check_date } = this.state;

      console.log(aliases);

      const group = { id, name, aliases, check_date, type };
      this.props.updateAnimeGroup(group);
    }
    this.toggleEdit();
  };

  /**
   * First update aliases (remove empty rows)
   * Then call updateGroup
   */
  saveChanges = () => {
    const aliases = this.state.aliases
      .map((alias) => alias.trim())
      .filter((alias) => alias.length > 0);
    this.setState({ aliases }, this.updateGroup);
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

  renderEditMode = () => {
    const { videos, images } = this.props.group;
    const { id, name, aliases, check_date } = this.state;

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
                  <InputContainer
                    label="Last Check Date"
                    type={INPUT_TEXT}
                    name="check_date"
                    value={check_date}
                    onChange={this.onChange}
                  ></InputContainer>
                  <div className="w-max btn" onClick={this.addGroup}>
                    CREATE GROUP
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
            <div className="">
              {videos.map((video) => (
                <AnimeItem video={video} key={video.id}></AnimeItem>
              ))}
              <VideoForm
                submit={this.props.addAnimeVideo}
                type={this.props.animeType}
                groupId={id}
              ></VideoForm>
            </div>
            <div className="w-max btn" onClick={this.deleteAnimeGroup(id)}>
              Delete Group
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderViewMode = () => {
    const { videos, images } = this.props.group;
    const { id, name, aliases, check_date } = this.state;

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
              <div className="min-w-max">
                <div className="text-xs">Check Date</div>
                <div className="font-bold whitespace-pre">
                  {check_date ? check_date : "---- -- --      "}
                </div>
              </div>
            </div>
            <div className="">
              {videos.map((video) => (
                <AnimeItem video={video} key={video.id}></AnimeItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const edit = this.state.edit;

    return (
      <div className="m-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary">
        <div className="flex flex-row-reverse">
          {!edit && (
            <div className={`w-max btn`} onClick={this.toggleEdit}>
              Edit Group
            </div>
          )}
          {edit && (
            <div className={`w-max btn`} onClick={this.discardChanges}>
              Discard Changes
            </div>
          )}
          {edit && (
            <div
              className={`w-max btn ${OPTION_SELECTED}`}
              onClick={this.saveChanges}
            >
              Save Changes
            </div>
          )}
        </div>
        {this.state.edit ? this.renderEditMode() : this.renderViewMode()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  animeType: state.info.videoTypes.anime,
});

const mapDispatchToProps = {
  updateAnimeGroup,
  deleteAnimeGroup,
  addAnimeVideo,
  addAnimePoster,
  deleteAnimePoster,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimeGroup);

import React, { Component, Fragment } from "react";
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

import AnimeItem from "./AnimeItem";
import VideoForm from "./VideoForm";
import Poster from "./Poster";
import SVGPencil from "../../generic/svg/SVGPencil";
import GroupForm from "./GroupForm";

export class GroupItem extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    updateAnimeGroup: PropTypes.func.isRequired,
    deleteAnimeGroup: PropTypes.func.isRequired,
    //
    addAnimePoster: PropTypes.func.isRequired,
    deleteAnimePoster: PropTypes.func.isRequired,
  };

  state = {
    edit: false,
    showVideoForm: false,
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  toggleShowVideoForm = () => {
    this.setState({ showVideoForm: !this.state.showVideoForm });
  };

  updateAnimeGroup = (group) => {
    this.props.updateAnimeGroup(group);
    this.toggleEdit();
  };

  deleteAnimeGroup = () => {
    this.props.deleteAnimeGroup(this.props.group.id);
  };

  discardChanges = () => {
    this.toggleEdit();
  };

  renderVideos = () => {
    const { videos, single, id } = this.props.group;
    const { showVideoForm } = this.state;

    return (
      <Fragment>
        {videos.map((video) => (
          <AnimeItem video={video} key={video.id}></AnimeItem>
        ))}

        <div className="flex">
          <div className="w-full p-1 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary text-center font-extrabold">
            <div
              className="cursor-pointer mb-1"
              onClick={this.toggleShowVideoForm}
            >
              {showVideoForm ? "↑ Hide form ↑" : "↓ Add new Video ↓"}
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
      </Fragment>
    );
  };

  render() {
    const { edit } = this.state;
    const { id, name, aliases, check_date, status, images, single, type } =
      this.props.group;

    return (
      <div className="m-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary">
        <div className="flex my-2">
          <Poster
            images={images}
            groupId={id}
            deletePoster={this.props.deleteAnimePoster}
            addPoster={this.props.addAnimePoster}
            disabled={!edit}
          ></Poster>
          <div className="mx-5 p-2 border-2 shadow-2xl rounded-xl bg-secondary border-tertiary w-full h-min">
            {edit ? (
              <GroupForm
                submit={this.updateAnimeGroup}
                type={type}
                discard={this.discardChanges}
                delete={this.deleteAnimeGroup}
                group={this.props.group}
                hideTitle
                edit
              ></GroupForm>
            ) : (
              <div className="group">
                <div className="flex justify-between">
                  <div className="break-all">
                    <div className="text-2xl font-bold overflow-auto">
                      {name}
                    </div>
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
                          <div className="font-bold whitespace-pre">
                            {status}
                          </div>
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
            )}

            {!edit && this.renderVideos()}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupItem);

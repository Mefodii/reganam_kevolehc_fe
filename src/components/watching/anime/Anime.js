import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAnimeGroups, addAnimeGroup } from "../../../actions/anime";
import { updateTheme } from "../../../actions/page";

import AnimeGroup from "./AnimeGroup";
import GroupForm from "../video_components/GroupForm";

export class Anime extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getAnimeGroups: PropTypes.func.isRequired,
    addAnimeGroup: PropTypes.func.isRequired,
    updateTheme: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAnimeGroups();
    this.props.updateTheme();
  }

  render() {
    return (
      <div className="w-full flex flex-col items-center">
        <h2 className="text-xl uppercase font-bold m-4">
          Welcome to Anime, fellow watcher
        </h2>
        <div className="rounded-xl shadow-lg w-10/12 space-y-10 mb-28">
          <div className="px-6 pb-6 bg-primary border border-tertiary">
            <GroupForm
              submit={this.props.addAnimeGroup}
              type={this.props.animeType}
            ></GroupForm>
          </div>
          <div className="bg-primary border border-tertiary">
            {this.props.groups.map((group) => (
              <AnimeGroup group={group} key={group.id}></AnimeGroup>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.anime.groups,
  animeType: state.info.videoTypes.anime,
});

export default connect(mapStateToProps, {
  getAnimeGroups,
  updateTheme,
  addAnimeGroup,
})(Anime);

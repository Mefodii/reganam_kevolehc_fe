import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteAnimeGroup } from "../../../actions/anime";

import AnimeItem from "./AnimeItem";

export class AnimeGroup extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
    deleteAnimeGroup: PropTypes.func.isRequired,
  };

  deleteAnimeGroup = (id) => () => {
    this.props.deleteAnimeGroup(id);
  };

  render() {
    const { name, videos, id } = this.props.group;
    return (
      <div className="">
        <div>{name}</div>
        <div onClick={this.deleteAnimeGroup(id)}>Delete</div>
        <div className="">
          {videos.map((video) => (
            <AnimeItem video={video} key={video.id}></AnimeItem>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteAnimeGroup })(AnimeGroup);

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAnime, deleteAnime } from "../../../actions/videos";
import { updateTheme } from "../../../actions/page";

import AnimeItem from "./AnimeItem";

export class Anime extends Component {
  static propTypes = {
    anime: PropTypes.array.isRequired,
    getAnime: PropTypes.func.isRequired,
    deleteAnime: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAnime();
    this.props.updateTheme();
  }

  renderItems = () =>
    this.props.anime.map((video) => (
      <AnimeItem video={video} key={video.id}></AnimeItem>
    ));

  render() {
    return (
      <div className="text-gray-100 w-full flex flex-col items-center">
        <h2 className="text-xl uppercase font-bold m-4">
          Welcome to Anime, fellow watcher
        </h2>
        <div className="rounded-xl shadow-lg w-10/12 bg-primary">
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  anime: state.videos.anime,
});

export default connect(mapStateToProps, { getAnime, deleteAnime, updateTheme })(
  Anime
);

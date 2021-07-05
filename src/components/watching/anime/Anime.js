import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAnime } from "../../../actions/anime";
import { updateTheme } from "../../../actions/page";

import AnimeGroup from "./AnimeGroup";

export class Anime extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getAnime: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAnime();
    this.props.updateTheme();
  }

  componentWillUnmount() {
    this.props.updateTheme();
  }

  render() {
    return (
      <div className="w-full flex flex-col items-center">
        <h2 className="text-xl uppercase font-bold m-4">
          Welcome to Anime, fellow watcher
        </h2>
        <div className="rounded-xl shadow-lg w-10/12 bg-primary border border-tertiary">
          {this.props.groups.map((group) => (
            <AnimeGroup group={group} key={group.id}></AnimeGroup>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.anime.groups,
});

export default connect(mapStateToProps, { getAnime, updateTheme })(Anime);

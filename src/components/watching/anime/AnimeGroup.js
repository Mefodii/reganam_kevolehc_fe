import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AnimeItem from "./AnimeItem";

export class AnimeGroup extends Component {
  static propTypes = {
    group: PropTypes.object.isRequired,
  };

  render() {
    const { name, videos } = this.props.group;
    return (
      <div className="">
        <div>{name}</div>
        <div className="">
          {videos.map((video) => (
            <AnimeItem video={video} key={video.id}></AnimeItem>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(null, {})(AnimeGroup);

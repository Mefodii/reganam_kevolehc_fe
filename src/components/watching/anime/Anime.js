import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getGroups } from "../../../actions/groups";
import { updateTheme } from "../../../actions/page";

import GroupList from "../watchio_components/GroupList";
import { ANIME_BACKGROUND } from "../../../util/constants";

export class Anime extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    getGroups: PropTypes.func.isRequired,
    updateTheme: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getGroups(this.props.watchioAnime);
    this.props.updateTheme();
  }

  render() {
    const { watchioAnime, groups } = this.props;
    return (
      <GroupList
        watchioType={watchioAnime}
        groups={groups}
        backgroundPicture={ANIME_BACKGROUND}
      ></GroupList>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.anime.groups,
  watchioAnime: state.info.watchioTypes.anime,
});

export default connect(mapStateToProps, {
  getGroups,
  updateTheme,
})(Anime);

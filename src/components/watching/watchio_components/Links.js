import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  ANIME9_LOGO,
  DEFAULT_CLIP_LOGO,
  IMDB_LOGO,
  MAL_LOGO,
} from "../../../util/frontend-urls";

export class Links extends Component {
  static propTypes = {
    links: PropTypes.array.isRequired,
  };

  getLogoFromLink = (link) => {
    if (link.startsWith("https://9anime.to/")) return ANIME9_LOGO;
    if (link.startsWith("https://www.imdb.com/")) return IMDB_LOGO;
    if (link.startsWith("https://myanimelist.net/")) return MAL_LOGO;

    return DEFAULT_CLIP_LOGO;
  };

  render() {
    const { links } = this.props;

    if (links.length === 0) return <></>;

    return (
      <div className="mt-1 flex space-x-3">
        {links.map((link, i) => (
          <a key={i} href={link}>
            <img
              src={this.getLogoFromLink(link)}
              alt="Placeholder"
              className="object-center"
              draggable="false"
            />
          </a>
        ))}
      </div>
    );
  }
}

export default Links;

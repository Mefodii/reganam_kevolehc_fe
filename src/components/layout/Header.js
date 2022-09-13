import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  ANIME_URL,
  AUDIO_URL,
  CONTENTIO_URL,
  GAMEIO_URL,
  HELPERS_URL,
  MOVIES_URL,
  READIO_URL,
  SERIALS_URL,
} from "../../util/frontend-urls";

import SVGDownArrow from "../generic/svg/SVGDownArrow";

class Header extends Component {
  state = {
    showDropDown: false,
    theme: "",
    url: "",
  };

  showDropDown = (e) => {
    this.setState({ showDropDown: true });
  };

  hideDropDown = (e) => {
    this.setState({ showDropDown: false });
  };

  render() {
    const { theme, showDropDown } = this.state;
    const dropDownVisibility = showDropDown ? "" : "hidden";

    return (
      <nav
        className={`${theme} text-gray-200 shadow-md bg-theme-1 sticky top-0 z-20`}
      >
        <div className="flex p-2 items-center text-lg justify-between">
          <div className="flex">
            <NavLink className="font-bold m-2 hover:underline" to="/">
              :Kevolehc:
            </NavLink>
            <div
              className="flex relative m-2 group"
              onMouseEnter={this.showDropDown}
              onMouseLeave={this.hideDropDown}
            >
              <div className="">WatchIO</div>
              <SVGDownArrow className="transform group-hover:-rotate-180 transition ease-in duration-150 opacity-75 scale-75"></SVGDownArrow>
              <div
                className={`absolute ${dropDownVisibility} flex flex-col top-full bg-theme-1 border border-theme-3 shadow-md z-10`}
              >
                <NavLink className="p-2 nav-link" to={MOVIES_URL}>
                  Movies
                </NavLink>
                <NavLink className="p-2 nav-link" to={SERIALS_URL}>
                  Serials
                </NavLink>
                <NavLink className="p-2 nav-link" to={ANIME_URL}>
                  Anime
                </NavLink>
              </div>
            </div>
            <NavLink className="p-2 nav-link" to={GAMEIO_URL}>
              GameIO
            </NavLink>
            <NavLink className="p-2 nav-link" to={READIO_URL}>
              ReadIO
            </NavLink>
            <NavLink className="p-2 nav-link" to={CONTENTIO_URL}>
              ContentIO
            </NavLink>
            <NavLink className="p-2 nav-link" to={AUDIO_URL}>
              AudIO
            </NavLink>
          </div>
          <div className="flex">
            <NavLink className="p-2 nav-link text-xs" to={HELPERS_URL}>
              Helpers (shhh)
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);

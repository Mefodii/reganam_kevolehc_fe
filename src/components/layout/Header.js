import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

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
        className={`${theme} text-gray-200 shadow-md bg-primary sticky top-0 z-20`}
      >
        <ul className="flex p-2 items-center text-lg">
          <li className="font-bold m-2">
            <NavLink to="/">:Kevolehc:</NavLink>
          </li>
          <li
            className="relative m-2 group"
            onMouseEnter={this.showDropDown}
            onMouseLeave={this.hideDropDown}
          >
            <div className="inline-block">WatchIO</div>
            <SVGDownArrow className="inline transform group-hover:-rotate-180 transition ease-in duration-150 opacity-75 scale-75"></SVGDownArrow>
            <div
              className={`drop-down ${dropDownVisibility} bg-primary border border-tertiary shadow-md z-10`}
            >
              <ul>
                <li className="p-2">
                  <NavLink
                    className="hover:underline hover:text-red-200"
                    to="/watchio/movies"
                  >
                    Movies
                  </NavLink>
                </li>
                <li className="p-2">
                  <NavLink
                    className="hover:underline hover:text-red-200"
                    to="/watchio/serials"
                  >
                    Serials
                  </NavLink>
                </li>
                <li className="p-2">
                  <NavLink
                    className="hover:underline hover:text-red-200"
                    to="/watchio/anime"
                  >
                    Anime
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li className="m-2 hover:underline hover:text-red-200">
            <NavLink to="/gamio">GameIO</NavLink>
          </li>
          <li className="m-2 hover:underline hover:text-red-200">
            <NavLink to="/readio">ReadIO</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Header);

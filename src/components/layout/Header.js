import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import {
  ANIME_URL,
  AUDIO_URL,
  CONTENTING_URL,
  GAMING_URL,
  HELPERS_URL,
  MOVIES_URL,
  READING_URL,
  SERIALS_URL,
} from '../../util/frontend-urls';

import { SVGDownArrow } from '../svg';

class Header extends Component {
  state = {
    showDropDown: false,
  };

  showDropDown = (e) => {
    this.setState({ showDropDown: true });
  };

  hideDropDown = (e) => {
    this.setState({ showDropDown: false });
  };

  render() {
    const { showDropDown } = this.state;
    const dropDownVisibility = showDropDown ? '' : 'hidden';

    return (
      <nav
        className={`shadow-md bg-theme-1 border-b-2 border-theme-3 sticky top-0 z-20`}
      >
        <div className='flex p-2 items-center text-lg justify-between'>
          <div className='flex'>
            <NavLink className='font-bold p-2 hover:underline' to='/'>
              :Kevolehc:
            </NavLink>
            <div
              className='flex relative group nav-link'
              onMouseEnter={this.showDropDown}
              onMouseLeave={this.hideDropDown}
            >
              <div className=''>WatchIO</div>
              <SVGDownArrow className='transform group-hover:-rotate-180 transition ease-in duration-150 opacity-75 scale-75'></SVGDownArrow>
              <div
                className={`absolute ${dropDownVisibility} flex flex-col top-full bg-theme-1 border border-theme-3 shadow-md z-10`}
              >
                <NavLink className='nav-link' to={MOVIES_URL}>
                  Movies
                </NavLink>
                <NavLink className='nav-link' to={SERIALS_URL}>
                  Serials
                </NavLink>
                <NavLink className='nav-link' to={ANIME_URL}>
                  Anime
                </NavLink>
              </div>
            </div>
            <NavLink className='nav-link' to={GAMING_URL}>
              GameIO
            </NavLink>
            <NavLink className='nav-link' to={READING_URL}>
              ReadIO
            </NavLink>
            <NavLink className='nav-link' to={CONTENTING_URL}>
              ContentIO
            </NavLink>
            <NavLink className='nav-link' to={AUDIO_URL}>
              AudIO
            </NavLink>
          </div>
          <div className='flex'>
            <NavLink className='nav-link text-xs' to={HELPERS_URL}>
              Helpers (shhh)
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);

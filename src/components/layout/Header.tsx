import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FE_URL } from '../../util/frontend-urls';

import { SVGDownArrow } from '../svg';

const Header = () => {
  const [showDropDown, setShowDropDown] = useState(false);
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
            onMouseEnter={() => setShowDropDown(true)}
            onMouseLeave={() => setShowDropDown(false)}
          >
            <div className=''>WatchIO</div>
            <SVGDownArrow className='w-5 transform group-hover:-rotate-180 transition ease-in duration-150 opacity-75 scale-75'></SVGDownArrow>
            <div
              className={`absolute ${dropDownVisibility} flex flex-col top-full bg-theme-1 border border-theme-3 shadow-md z-10`}
            >
              <NavLink className='nav-link' to={FE_URL.MOVIES}>
                Movies
              </NavLink>
              <NavLink className='nav-link' to={FE_URL.SERIALS}>
                Serials
              </NavLink>
              <NavLink className='nav-link' to={FE_URL.ANIME}>
                Anime
              </NavLink>
            </div>
          </div>
          <NavLink className='nav-link' to={FE_URL.GAMING}>
            GameIO
          </NavLink>
          <NavLink className='nav-link' to={FE_URL.READING}>
            ReadIO
          </NavLink>
          <NavLink className='nav-link' to={FE_URL.CONTENTING}>
            ContentIO
          </NavLink>
          <NavLink className='nav-link' to={FE_URL.AUDIO}>
            AudIO
          </NavLink>
        </div>
        <div className='flex'>
          <NavLink className='nav-link text-xs' to={FE_URL.HELPERS}>
            Helpers (shhh)
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Header);

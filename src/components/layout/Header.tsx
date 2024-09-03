import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FE_URL } from '../../util/frontend-urls';
import { SVGDownArrow } from '../svg';

export const Header = React.memo(() => {
  const [showWatchioDropDown, setWatchioShowDropDown] = useState(false);
  const [showAudioDropDown, setAudioShowDropDown] = useState(false);

  return (
    <nav className={`shadow-md bg-theme-1 border-b-2 border-theme-3`}>
      <div className='flex p-2 items-center text-lg justify-between'>
        <div className='flex'>
          <NavLink className='font-bold p-2 hover:underline' to='/'>
            :Kevolehc:
          </NavLink>
          <div
            className='flex relative group nav-link'
            onMouseEnter={() => setWatchioShowDropDown(true)}
            onMouseLeave={() => setWatchioShowDropDown(false)}
          >
            <div className=''>WatchIO</div>
            <SVGDownArrow className='w-5 transform group-hover:-rotate-180 transition ease-in duration-150 opacity-75 scale-75'></SVGDownArrow>
            <div
              className={`absolute ${
                showWatchioDropDown ? '' : 'hidden'
              } flex flex-col top-full bg-theme-1 border border-theme-3 shadow-md z-10`}
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
          <div
            className='flex relative group nav-link'
            onMouseEnter={() => setAudioShowDropDown(true)}
            onMouseLeave={() => setAudioShowDropDown(false)}
          >
            <div className=''>AudIO</div>
            <SVGDownArrow className='w-5 transform group-hover:-rotate-180 transition ease-in duration-150 opacity-75 scale-75'></SVGDownArrow>
            <div
              className={`absolute ${
                showAudioDropDown ? '' : 'hidden'
              } flex flex-col top-full bg-theme-1 border border-theme-3 shadow-md z-10`}
            >
              <NavLink className='nav-link' to={FE_URL.AUDIO_TRACKS}>
                Tracks
              </NavLink>
              <NavLink className='nav-link' to={FE_URL.AUDIO_ARTISTS}>
                Artists
              </NavLink>
            </div>
          </div>
        </div>
        <div className='flex'>
          <NavLink className='nav-link text-xs' to={FE_URL.HELPERS}>
            Helpers (shhh)
          </NavLink>
        </div>
      </div>
    </nav>
  );
});

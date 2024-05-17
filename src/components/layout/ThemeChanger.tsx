import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getThemeForUrl } from '../../util/colors';

import { themeUpdated } from '../../redux/pageSlice';
import { usePrevious, useAppDispatch } from '../../hooks';

const ThemeChanger = () => {
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.pathname !== prevLocation?.pathname) {
      dispatch(themeUpdated(getThemeForUrl(window.location.href)));
    }
  }, [location, prevLocation, dispatch]);

  return <></>;
};

export default ThemeChanger;

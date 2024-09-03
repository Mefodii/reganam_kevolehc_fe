import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, usePrevious } from '../../hooks';
import { themeUpdated } from '../../redux/pageSlice';
import { getThemeForUrl } from '../../util/colors';

export const ThemeChanger = React.memo(() => {
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.pathname !== prevLocation?.pathname) {
      dispatch(themeUpdated(getThemeForUrl(window.location.href)));
    }
  }, [location, prevLocation, dispatch]);

  return <></>;
});

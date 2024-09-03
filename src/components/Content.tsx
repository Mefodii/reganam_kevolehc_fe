import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DnDProvider, ModalProvider } from '../context';
import { useAppSelector } from '../hooks';
import { selectTheme } from '../redux/pageSlice';
import { Header, ThemeChanger } from './layout';
import { Routes } from './Routes';

export const Content = React.memo(() => {
  const theme = useAppSelector(selectTheme);

  return (
    <Router>
      <div
        className={`${theme} flex flex-col text-text-1 bg-gradient-to-t from-theme-2 to-theme-3 min-h-screen max-h-screen`}
      >
        <DnDProvider>
          <ModalProvider>
            <ThemeChanger />
            <Header />
            <div className='flex flex-1 overflow-hidden'>
              <Routes />
            </div>
          </ModalProvider>
        </DnDProvider>
        <div id='portal-root'></div>
      </div>
    </Router>
  );
});

import { BrowserRouter as Router } from 'react-router-dom';
import { useAppSelector } from '../hooks';

import Header from './layout/Header';
import ThemeChanger from './layout/ThemeChanger';
import Routes from './Routes';

import { selectTheme } from '../redux/pageSlice';
import { ModalProvider, DnDProvider } from '../context';

const Content = () => {
  const theme = useAppSelector(selectTheme);

  return (
    <Router>
      <div
        className={`${theme} flex flex-col text-text-1 bg-gradient-to-t from-theme-2 to-theme-3 min-h-screen max-h-screen`}
      >
        <ModalProvider>
          <DnDProvider>
            <ThemeChanger />
            <Header />
            <div className='flex flex-1 overflow-hidden'>
              <Routes />
            </div>
          </DnDProvider>
        </ModalProvider>
      </div>
    </Router>
  );
};

export default Content;

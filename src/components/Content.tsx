import { BrowserRouter as Router } from 'react-router-dom';
import { useAppSelector } from '../hooks';

import Header from './layout/Header';
import ThemeChanger from './layout/ThemeChanger';
import Routes from './Routes';

import { selectTheme } from '../redux/pageSlice';
import { ModalProvider } from '../features/modals/Modal';

const Content = () => {
  const theme = useAppSelector(selectTheme);

  return (
    <Router>
      <div
        className={`${theme} text-text-1 bg-gradient-to-t from-theme-2 to-theme-3 flex flex-col min-h-full max-h-full overflow-y-auto`}
      >
        <ModalProvider>
          <ThemeChanger />
          <Header />
          <Routes />
        </ModalProvider>
      </div>
    </Router>
  );
};

export default Content;

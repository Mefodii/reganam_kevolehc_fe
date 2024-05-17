import { BrowserRouter as Router } from 'react-router-dom';
import { useAppSelector } from '../hooks';

import Header from './layout/Header';
import ThemeChanger from './layout/ThemeChanger';
import Routes from './Routes';
import ModalSwitcher from '../features/modals/ModalSwitcher';

import { selectTheme } from '../redux/pageSlice';

const Content = () => {
  const theme = useAppSelector(selectTheme);

  return (
    <Router>
      <div
        className={`${theme} text-text-1 bg-gradient-to-t from-theme-2 to-theme-3 flex flex-col min-h-full max-h-full overflow-y-auto`}
      >
        <ModalSwitcher />
        <ThemeChanger />
        <Header />
        <Routes />
      </div>
    </Router>
  );
};

export default Content;

import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import Content from './Content';

import store from '../store';

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <Content></Content>
      </Provider>
    </StrictMode>
  );
};

export default App;

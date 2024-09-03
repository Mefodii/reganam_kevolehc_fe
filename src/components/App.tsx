import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { Content } from './Content';

export const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <Content></Content>
      </Provider>
    </StrictMode>
  );
};

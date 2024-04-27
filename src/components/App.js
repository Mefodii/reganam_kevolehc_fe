import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from '../store';

import Content from './Content';

class App extends Component {
  render() {
    return (
      // TODO - cancel api requests if already called
      <React.StrictMode>
        <Provider store={store}>
          <Content></Content>
        </Provider>
      </React.StrictMode>
    );
  }
}

export default App;

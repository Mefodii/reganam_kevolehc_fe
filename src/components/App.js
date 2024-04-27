import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Content from './Content';

import store from '../store';

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

import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "../store";

import Content from "./Content";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Content></Content>
      </Provider>
    );
  }
}

export default App;

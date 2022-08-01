import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "../store";

import Content from "./Content";
import Modal from "./generic/Modal";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Modal />
        <Content></Content>
      </Provider>
    );
  }
}

export default App;

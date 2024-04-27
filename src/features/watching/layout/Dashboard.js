import React, { Component, Fragment } from 'react';

import Movies from './Movies';
import Serials from './Serials';
import Anime from './Anime';

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Movies />
        <Serials />
        <Anime />
      </Fragment>
    );
  }
}

export default Dashboard;

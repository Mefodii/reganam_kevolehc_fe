import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Header from './layout/Header';
import ThemeChanger from './layout/ThemeChanger';
import ModalSwitcher from './modals/ModalSwitcher';
import Routes from './Routes';
import { selectTheme } from '../redux/pageSlice';

class Content extends Component {
  static propTypes = {
    theme: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Router>
        <div
          className={`${this.props.theme} text-text-1 bg-gradient-to-t from-theme-2 to-theme-3 flex flex-col min-h-full max-h-full overflow-y-auto`}
        >
          <ModalSwitcher />
          <ThemeChanger />
          <Header />
          <Routes />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: selectTheme(state),
});

export default connect(mapStateToProps, null)(Content);

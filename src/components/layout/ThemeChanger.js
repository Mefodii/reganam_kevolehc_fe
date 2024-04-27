import { connect } from 'react-redux';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { getThemeForUrl } from '../../util/colors';
import { themeUpdated } from '../../redux/pageSlice';

class ThemeChanger extends Component {
  state = {};

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.props.themeUpdated(getThemeForUrl(window.location.href));
    }
  }

  componentDidMount() {
    this.props.themeUpdated(getThemeForUrl(window.location.href));
  }

  render() {
    return <></>;
  }
}

export default withRouter(connect(null, { themeUpdated })(ThemeChanger));

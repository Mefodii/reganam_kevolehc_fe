import { connect } from "react-redux";

import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { updateTheme } from "../../actions/page";

class ThemeChanger extends Component {
  state = {};

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname)
      this.props.updateTheme();
  }

  componentDidMount() {
    this.props.updateTheme();
  }

  render() {
    return <></>;
  }
}

export default withRouter(connect(null, { updateTheme })(ThemeChanger));

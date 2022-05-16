import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import Header from "./layout/Header";
import Home from "./Home";
import WatchioDashboard from "./watching/Dashboard";
import GamioDashboard from "./gaming/Dashboard";
import ReadioDashboard from "./reading/Dashboard";

import Movies from "./watching/movies/Movies";
import Serials from "./watching/serials/Serials";
import Anime from "./watching/anime/Anime";

class Content extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
  };

  render() {
    if (this.props.isLoading)
      return <div className="text-gray-100">Loading....</div>;

    return (
      <Router>
        <div
          className={`text-gray-100 ${this.props.theme} bg-gradient-to-t from-secondary to-tertiary min-h-screen`}
        >
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/watchio">
              <WatchioDashboard />
            </Route>
            <Route exact path="/watchio/movies">
              <Movies />
            </Route>
            <Route exact path="/watchio/serials">
              <Serials />
            </Route>
            <Route exact path="/watchio/anime">
              <Anime />
            </Route>
            <Route exact path="/gamio">
              <GamioDashboard />
            </Route>
            <Route exact path="/readio">
              <ReadioDashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.page.isLoading,
  theme: state.page.theme,
});

export default connect(mapStateToProps, null)(Content);

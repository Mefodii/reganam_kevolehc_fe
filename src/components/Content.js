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
      return <div className="text-gray-200">Loading....</div>;

    return (
      <Router>
        <div className={`text-gray-200 ${this.props.theme}`}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/watchio" component={WatchioDashboard}></Route>
            <Route exact path="/watchio/movies" component={Movies}></Route>
            <Route exact path="/watchio/serials" component={Serials}></Route>
            <Route exact path="/watchio/anime" component={Anime}></Route>
            <Route exact path="/gamio" component={GamioDashboard}></Route>
            <Route exact path="/readio" component={ReadioDashboard}></Route>
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

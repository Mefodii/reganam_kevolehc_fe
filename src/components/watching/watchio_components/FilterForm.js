import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InputContainer, {
  INPUT_TEXTAREA,
  INPUT_OPTIONS,
  INPUT_CHECKBOX,
  INPUT_DATE,
} from "../../generic/form/InputContainer";

import { objectEqualsSimple } from "../../../util/functions";
import { updateWatchioFilter } from "../../../actions/itemsFIilters";

export class FilterForm extends Component {
  static propTypes = {
    watchioFilter: PropTypes.object.isRequired,
    updateWatchioFilter: PropTypes.func.isRequired,
  };

  state = {
    title: "",
    showPosters: true,
    statuses: [],
    fromDate: null,
    toDate: null,
  };

  propsToState = () => {
    this.mapWatchioFilterToState(this.props.watchioFilter);
  };

  mapWatchioFilterToState = (watchioFilter) => {
    this.setState({
      title: watchioFilter.title,
      showPosters: watchioFilter.showPosters,
      statuses: watchioFilter.statuses,
      fromDate: watchioFilter.fromDate,
      toDate: watchioFilter.toDate,
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  setFromDate = (value) => this.setState({ fromDate: value });
  setToDate = (value) => this.setState({ toDate: value });

  hasWatchioFilterChanged = () => {
    const oldVideo = {
      title: this.props.watchioFilter.title,
      showPosters: this.props.watchioFilter.showPosters,
      statuses: this.props.watchioFilter.statuses,
      fromDate: this.props.watchioFilter.fromDate,
      toDate: this.props.watchioFilter.toDate,
    };

    const newVideo = {
      title: this.state.title,
      showPosters: this.state.showPosters,
      statuses: this.state.statuses,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
    };

    return !objectEqualsSimple(oldVideo, newVideo);
  };

  buildWatchioFilter = () => {
    const watchioFilter = {
      title: this.state.title,
      showPosters: this.state.showPosters,
      statuses: this.state.statuses,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
    };
    return watchioFilter;
  };

  saveChanges = () => {
    if (this.hasWatchioFilterChanged()) {
      this.props.updateWatchioFilter(this.buildWatchioFilter());
    }
  };

  resetWatchioFilter = () => {
    // TODO
  };

  componentDidMount() {
    this.propsToState();
  }

  render() {
    const { title, showPosters, statuses, fromDate, toDate } = this.state;
    const { statusTypes } = this.props;

    return (
      <Fragment>
        <div className="p-4 justify-evenly bg-secondary border-2 border-tertiary rounded-xl shadow-lg w-full">
          <div className="simple-font flex flex-col 2xl:flex-row w-full justify-between 2xl:space-x-4">
            <div className="w-full space-y-1">
              <InputContainer
                label="Title (including aliases)"
                type={INPUT_TEXTAREA}
                name="title"
                value={title}
                onChange={this.onChange}
              />

              <div className="flex flex-row w-full justify-between space-x-2">
                <InputContainer
                  className="text-center"
                  showLabel={false}
                  type={INPUT_CHECKBOX}
                  name="showPosters"
                  text="Show Posters"
                  checked={showPosters}
                  onClick={this.onChange}
                />
                <div className="group w-full">
                  <InputContainer
                    label="From Date"
                    type={INPUT_DATE}
                    name="fromDate"
                    value={fromDate || ""}
                    onChange={this.onChange}
                    maxLength={10}
                  />
                </div>
                <div className="group w-full">
                  <InputContainer
                    label="To Date"
                    type={INPUT_DATE}
                    name="toDate"
                    value={toDate || ""}
                    onChange={this.onChange}
                    maxLength={10}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <InputContainer
                label="Statuses"
                type={INPUT_OPTIONS}
                name="statuses"
                value={statuses}
                options={statusTypes}
                onChange={this.onChange}
                asStrings
              />
            </div>
          </div>

          <div className="w-max btn option-selected" onClick={this.saveChanges}>
            Save Changes
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  statusTypes: state.info.statusTypes,
  watchioFilter: state.itemsFilters.watchioFilter,
});

const mapDispatchToProps = {
  updateWatchioFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);

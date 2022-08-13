import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateWatchioFilter } from "../../actions/itemsFilters";

import MultiSelect from "../generic/form/MultiSelect";
import Date from "../generic/form/Date";
import SingleSelect from "../generic/form/SingleSelect";
import Textarea from "../generic/form/Textarea";
import WatchioFilterModel from "../../models/filters/watchioFilter";
import { withForm } from "./form-functions";

export class FilterForm extends Component {
  static propTypes = {
    watchioFilter: PropTypes.object.isRequired,
    updateWatchioFilter: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    // Form props
    formState: PropTypes.object.isRequired,
    resetFormState: PropTypes.func.isRequired,
    loadFormState: PropTypes.func.isRequired,
    updateFormState: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    hasFormChanged: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
    updateModel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onSuccess: () => {},
  };

  saveChanges = () => {
    const { validateForm, updateWatchioFilter, onSuccess } = this.props;
    const [watchioFilter, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    updateWatchioFilter(watchioFilter).then(onSuccess);
  };

  resetWatchioFilter = () => {
    const { updateWatchioFilter, onSuccess } = this.props;
    updateWatchioFilter(this.props.model.getInitialState()).then(onSuccess);
  };

  componentDidMount() {
    this.props.loadFormState();
  }

  render() {
    const { title, showPosters, statuses, fromDate, toDate } =
      this.props.formState;
    const { statusTypes, onFieldChange } = this.props;

    return (
      <Fragment>
        <div className="p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full">
          <div className="simple-font flex flex-col 2xl:flex-row w-full justify-between 2xl:space-x-4">
            <div className="w-full space-y-1">
              <Textarea
                label="Title (including aliases)"
                name="title"
                value={title}
                onChange={onFieldChange}
              />

              <div className="flex flex-row w-full justify-between space-x-2">
                <SingleSelect
                  className="text-center"
                  name="showPosters"
                  text="Show Posters"
                  value={showPosters}
                  onClick={onFieldChange}
                />
                <div className="group w-full">
                  <Date
                    label="From Date"
                    name="fromDate"
                    value={fromDate}
                    onChange={onFieldChange}
                  />
                </div>
                <div className="group w-full">
                  <Date
                    label="To Date"
                    name="toDate"
                    value={toDate}
                    onChange={onFieldChange}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <MultiSelect
                label="Statuses"
                name="statuses"
                value={statuses}
                options={statusTypes}
                onChange={onFieldChange}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm(FilterForm, WatchioFilterModel));

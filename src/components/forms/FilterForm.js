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
import Button from "../generic/buttons/Button";
import SVGCheck from "../generic/svg/SVGCheck";

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

  render() {
    const { title, showPosters, statuses, fromDate, toDate } =
      this.props.formState;
    const { statusTypes, onFieldChange } = this.props;

    return (
      <Fragment>
        <div className="simple-font p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full">
          <div className="title">Watchio Filters</div>

          <div className="form-row">
            <Textarea
              label="Title (including aliases)"
              name="title"
              value={title}
              onChange={onFieldChange}
            />
          </div>

          <div className="form-row">
            <SingleSelect
              className="text-center"
              name="showPosters"
              text="Show Posters"
              value={showPosters}
              onClick={onFieldChange}
            />
            <Date
              label="From Date"
              name="fromDate"
              value={fromDate}
              onChange={onFieldChange}
            />
            <div className="group w-full">
              <Date
                label="To Date"
                name="toDate"
                value={toDate}
                onChange={onFieldChange}
              />
            </div>
          </div>

          <div className="form-row">
            <MultiSelect
              label="Statuses"
              name="statuses"
              value={statuses}
              options={statusTypes}
              onChange={onFieldChange}
            />
          </div>

          <div className="form-row">
            <Button tooltip="Save Changes" onClick={this.saveChanges}>
              <SVGCheck className="w-6 transition-all duration-300" />
            </Button>
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

const model = new WatchioFilterModel();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm(FilterForm, model));

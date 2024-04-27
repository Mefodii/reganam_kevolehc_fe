import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MultiSelect from '../generic/form/MultiSelect';
import Date from '../generic/form/Date';
import SingleSelect from '../generic/form/SingleSelect';
import TextArea from '../generic/form/TextArea';
import WatchingFilterModel from '../../models/filters/watchingFilter';
import { withForm, withFormExtraPropTypes } from './withFormHOC';
import Button from '../generic/buttons/Button';
import SVGCheck from '../generic/svg/SVGCheck';
import { selectStatusTypes } from '../../features/watching/info/infoSlice';
import {
  selectWatchingFilter,
  updateWatchingFilter,
} from '../../features/watching/filters/filtersSlice';

export class FilterForm extends Component {
  static propTypes = {
    watchingFilter: PropTypes.object.isRequired,
    updateWatchingFilter: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    ...withFormExtraPropTypes,
  };

  static defaultProps = {
    onSuccess: () => {},
  };

  saveChanges = () => {
    const { validateForm, updateWatchingFilter, onSuccess } = this.props;
    const [watchingFilter, isValid, equals] = validateForm();
    if (!isValid || equals) return;

    updateWatchingFilter(watchingFilter);
    onSuccess();
  };

  resetWatchingFilter = () => {
    const { updateWatchingFilter, onSuccess } = this.props;
    updateWatchingFilter(this.props.model.getInitialState());
    onSuccess();
  };

  render() {
    const { title, showPosters, statuses, fromDate, toDate } =
      this.props.formState;
    const { statusTypes, onFieldChange } = this.props;

    return (
      <Fragment>
        <div className='simple-font p-4 justify-evenly bg-theme-2 border-2 border-theme-3 rounded-xl shadow-lg w-full'>
          <div className='title'>WatchIO Filters</div>

          <div className='form-row'>
            <TextArea
              label='Title (including aliases)'
              name='title'
              value={title}
              onChange={onFieldChange}
            />
          </div>

          <div className='form-row'>
            <SingleSelect
              className='text-center'
              name='showPosters'
              text='Show Posters'
              value={showPosters}
              onClick={onFieldChange}
            />
            <Date
              label='From Date'
              name='fromDate'
              value={fromDate}
              onChange={onFieldChange}
            />
            <div className='group w-full'>
              <Date
                label='To Date'
                name='toDate'
                value={toDate}
                onChange={onFieldChange}
              />
            </div>
          </div>

          <div className='form-row'>
            <MultiSelect
              label='Statuses'
              name='statuses'
              value={statuses}
              options={statusTypes}
              onChange={onFieldChange}
            />
          </div>

          <div className='form-row'>
            <Button tooltip='Save Changes' onClick={this.saveChanges}>
              <SVGCheck className='w-6 transition-all duration-300' />
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  statusTypes: selectStatusTypes(state),
  watchingFilter: selectWatchingFilter(state),
});

const mapDispatchToProps = {
  updateWatchingFilter,
};

const model = new WatchingFilterModel();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withForm(FilterForm, model));

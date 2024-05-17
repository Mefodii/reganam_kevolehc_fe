import { Fragment } from 'react';

import {
  Date,
  MultiSelect,
  SingleSelect,
  TextArea,
} from '../../../components/form';
import { Button } from '../../../components/buttons';
import { SVGCheck, SVGTrash } from '../../../components/svg';

import { watchingFilter as model } from '../../../models';
import { selectStatusTypes } from '../info/infoSlice';
import { selectWatchingFilter, updateWatchingFilter } from './filtersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useForm } from '../../../hooks/useForm';

type FilterFormProps = {
  onSuccess: () => void; // TODO - is this too generic?
};

const FilterForm: React.FC<FilterFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const statusTypes = useAppSelector(selectStatusTypes);
  const watchingFilter = useAppSelector(selectWatchingFilter);

  const { modelState, onFieldChange, setFormErrors } = useForm(watchingFilter);

  const save = () => {
    const [watchingFilter, isValid, error] = model.validate(modelState);
    if (!isValid) {
      setFormErrors(error);
      return;
    }

    dispatch(updateWatchingFilter(watchingFilter));
    onSuccess();
  };

  const reset = () => {
    dispatch(updateWatchingFilter(model.getInitialState()));
    onSuccess();
  };

  const { title, showPosters, statuses, fromDate, toDate } = modelState;

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
            onChange={onFieldChange}
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
          <Button tooltip='Save Changes' onClick={save}>
            <SVGCheck className='w-6 transition-all duration-300' />
          </Button>
          <Button tooltip='Reset' onClick={reset}>
            <SVGTrash className='w-6 transition-all duration-300' />
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default FilterForm;

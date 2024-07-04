import { useCallback } from 'react';

import {
  Date,
  MultiSelect,
  Checkbox,
  TextArea,
} from '../../../components/form';
import { Button } from '../../../components/buttons';
import { SVGCheck, SVGTrash } from '../../../components/svg';

import { watchingFilter as model } from '../../../models';
import { selectWatchingFilter, updateWatchingFilter } from './filtersSlice';
import { useAppDispatch, useAppSelector, useSimpleForm } from '../../../hooks';
import { WatchingStatus } from '../../../api/api-utils';

type FilterFormProps = {
  onSuccess: () => void;
};

const FilterForm: React.FC<FilterFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const watchingFilter = useAppSelector(selectWatchingFilter);

  const { modelState, onFieldChange, validateSave } = useSimpleForm(
    watchingFilter,
    model
  );

  const handleSave = () => {
    const [newWatchingFilter] = validateSave();
    if (!newWatchingFilter) return;

    dispatch(updateWatchingFilter(newWatchingFilter));
    onSuccess();
  };

  const handleReset = useCallback(() => {
    dispatch(updateWatchingFilter(model.getInitialState()));
    onSuccess();
  }, [dispatch, onSuccess]);

  const { title, showPosters, statuses, fromDate, toDate } = modelState;

  return (
    <div className='simple-font form-container'>
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
        <Checkbox
          className='text-center'
          name='showPosters'
          text='Show Posters'
          checked={showPosters}
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
          options={Object.values(WatchingStatus)}
          onChange={onFieldChange}
        />
      </div>

      <div className='form-row'>
        <Button tooltip='Save Changes' onClick={handleSave}>
          <SVGCheck className='w-6 transition-all duration-300' />
        </Button>
        <Button tooltip='Reset' onClick={handleReset}>
          <SVGTrash className='w-6 transition-all duration-300' />
        </Button>
      </div>
    </div>
  );
};

export default FilterForm;

import React, { useCallback } from 'react';
import { ContentCategory } from '../../../api/api-utils';
import { Button } from '../../../components/buttons';
import { DropdownSelect, Number, Text } from '../../../components/form';
import { SVGCheck, SVGTrash } from '../../../components/svg';
import { useAppDispatch, useForm } from '../../../hooks';
import { contentList as model } from '../../../models';
import {
  createContentList,
  deleteContentList,
  updateContentList,
} from './contentListsSlice';

type ContentListFormProps = {
  formProps: Model.ContentListProps;
  onSuccess: () => void;
};

export const ContentListForm = React.memo(
  ({ formProps, onSuccess }: ContentListFormProps) => {
    const dispatch = useAppDispatch();

    const isUpdate = formProps.formMode === 'UPDATE';

    const handleCreate = useCallback(
      (newContentList: Model.ContentListSM) => {
        dispatch(createContentList(newContentList)).unwrap().then(onSuccess);
      },
      [dispatch, onSuccess]
    );

    const handleUpdate = useCallback(
      (
        updatedContentList: Model.ContentListDM,
        _: any,
        scope?: Redux.Scope
      ) => {
        if (!scope) throw new Error('Scope expected for handleUpdate');

        dispatch(
          updateContentList({
            contentList: updatedContentList,
            scope,
          })
        )
          .unwrap()
          .then(onSuccess);
      },
      [dispatch, onSuccess]
    );

    const handleDelete = (contentList: Model.ContentListDM) => {
      dispatch(deleteContentList(contentList)).unwrap().then(onSuccess);
    };

    const { modelState, onFieldChange, onCreate, onUpdate } = useForm(
      model,
      formProps,
      handleCreate,
      handleUpdate
    );

    const { name, category, migration_position } = modelState;

    const title = isUpdate ? `Edit List` : `Add List`;
    return (
      <div className='simple-font form-container'>
        <div className='title'>{title}</div>

        <div className='form-row'>
          <Text
            label='Name'
            name='name'
            value={name}
            onChange={onFieldChange}
          />
        </div>

        <div className='form-row'>
          <DropdownSelect
            label='Category'
            name='category'
            value={category}
            options={Object.values(ContentCategory)}
            onChange={onFieldChange}
          />
          <Number
            label='Migration Position'
            name='migration_position'
            value={migration_position}
            min={0}
            onChange={onFieldChange}
          />
        </div>

        <div className='flex'>
          {!isUpdate && (
            <Button tooltip='Add Group' onClick={onCreate}>
              <SVGCheck className='w-6 transition-all duration-300' />
            </Button>
          )}

          {isUpdate && (
            <>
              <Button tooltip='Save Changes' onClick={onUpdate}>
                <SVGCheck className='w-6 transition-all duration-300' />
              </Button>
              <Button
                tooltip='Delete Group'
                onClick={() => handleDelete(formProps.item)}
              >
                <SVGTrash className='w-6 transition-all duration-300' />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
);

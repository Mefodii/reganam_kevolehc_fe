import { useCallback, useMemo, useState } from 'react';
import { BaseModel } from '../models/generic/model';

export const useForm = <P extends Model.ModelProps<D>, S, D>(
  model: BaseModel<P, S, D>,
  formProps: P,
  onCreate: (newItem: S, scope?: Redux.Scope) => void,
  onUpdate: (newItem: D, originalItem: D, scope?: Redux.Scope) => void
) => {
  const initialState = useMemo(
    () => model.buildState(formProps),
    [model, formProps]
  );

  const [modelState, setModelState] = useState<S>(initialState);
  const [formErrors, setFormErrors] = useState<Partial<S>>();

  const handleFieldChange = useCallback(
    <T>(e: Form.ChangeEvent, payload: Form.Payload<T>) => {
      setModelState((currentState) => ({
        ...currentState,
        [payload.name]: payload.value,
      }));
    },
    []
  );

  const handleCreate = useCallback(() => {
    if (formProps.formMode !== 'CREATE') {
      throw new Error(
        `handleCreate Unexpected form mode: ${formProps.formMode}`
      );
    }

    const [newItem, isValid, error] = model.validateCreate(modelState);
    if (!isValid) {
      setFormErrors(error);
      return;
    }

    onCreate(newItem, formProps.scope);
  }, [model, modelState, formProps, onCreate]);

  const handleUpdate = useCallback(() => {
    if (formProps.formMode !== 'UPDATE') {
      throw new Error(
        `handleUpdate Unexpected form mode: ${formProps.formMode}`
      );
    }

    const [updatedItem, equals, isValid, error] = model.validateUpdate(
      modelState,
      formProps.item
    );
    if (!isValid) {
      setFormErrors(error);
      return;
    }

    if (equals) return;

    onUpdate(updatedItem, formProps.item, formProps.scope);
  }, [formProps, model, modelState, onUpdate]);

  return {
    modelState,
    formErrors,
    setFormErrors,
    setModelState,
    onFieldChange: handleFieldChange,
    onCreate: handleCreate,
    onUpdate: handleUpdate,
  };
};

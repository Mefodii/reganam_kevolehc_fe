import { useCallback, useState } from 'react';
import { SimpleModel } from '../models/generic/model';

export const useSimpleForm = <S>(initialState: S, model: SimpleModel<S>) => {
  const [modelState, setModelState] = useState(initialState);
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

  const validateSave: () => [S | undefined, boolean, boolean, Partial<S>] =
    useCallback(() => {
      const [newState, equals, isValid, error] = model.validate(
        modelState,
        initialState
      );
      if (!isValid) {
        setFormErrors(error);
      }

      return [newState, equals, isValid, error];
    }, [model, initialState, modelState]);

  return {
    modelState,
    formErrors,
    setFormErrors,
    setModelState,
    onFieldChange: handleFieldChange,
    validateSave,
  };
};

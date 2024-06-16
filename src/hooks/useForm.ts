import { useCallback, useState } from 'react';

export const useForm = <S>(initialState: S) => {
  const [modelState, setModelState] = useState(initialState);
  const [formErrors, setFormErrors] = useState<Partial<S>>();

  const onFieldChange = useCallback(
    <T>(e: Form.ChangeEvent, payload: Form.Payload<T>) => {
      setModelState((currentState) => ({
        ...currentState,
        [payload.name]: payload.value,
      }));
    },
    []
  );

  return {
    modelState,
    formErrors,
    setFormErrors,
    setModelState,
    onFieldChange,
  };
};

import { useCallback, useState } from 'react';

export const useForm = <S>(initialState: S) => {
  const [modelState, setModelState] = useState(initialState);
  const [formErrors, setFormErrors] = useState<Partial<S>>();
  const onFieldChange = useCallback(
    <T>(e: Form.ChangeEvent, payload: Form.Payload<T>) =>
      setModelState((currentState) => ({
        ...currentState,
        [payload.name]: payload.value,
      })),
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

// TODO - 2024-05-16 - delete if not needed anymore
// export const useForm = <P, S, A, D>(
//   props: P,
//   model: Model.ModelWorker<P, S, A, D>,
//   initialState?: S
// ) => {
//   const [modelState, setModelState] = useState(
//     initialState || model.buildState(props)
//   );
//   const [formErrors, setFormErrors] = useState<Partial<S>>();
//   const modelRef = useRef(model);
//   const modelStateRef = useRef(modelState);

//   useEffect(() => {
//     modelStateRef.current = modelState;
//   }, [modelState]);

//   const onFieldChange = useCallback(
//     <T>(e: Form.ChangeEvent, payload: Form.Payload<T>) =>
//       setModelState((currentState) => ({
//         ...currentState,
//         [payload.name]: payload.value,
//       })),
//     []
//   );
//   const hasChanged = useCallback(
//     (): boolean =>
//       !modelRef.current.equals(
//         modelStateRef.current,
//         modelRef.current.getDBState(props)
//       ),
//     [props]
//   );
//   const validateCreate = useCallback((): [A, boolean, boolean] => {
//     const [obj, isValid, error] = modelRef.current.validateCreate(
//       modelStateRef.current
//     );
//     setFormErrors(error);

//     let equals = false;
//     if (isValid) {
//       equals = !hasChanged();
//     }

//     return [obj, isValid, equals];
//   }, [hasChanged]);

//   return {
//     modelState,
//     formErrors,
//     setModelState,
//     onFieldChange,
//     hasChanged,
//     validateCreate,
//   };
// };

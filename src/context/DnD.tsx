import React, { useState, createContext, PropsWithChildren } from 'react';

export type DnDProps<T> = {
  data: DragAndDrop.Data<T>;
  setDrag: (data: DragAndDrop.Data<T>) => void;
  removeDrag: () => void;
};

const initialState: DragAndDrop.Data<any> = {
  details: undefined,
  copy: false,
};

export const DnDContext = createContext<DnDProps<any>>({
  data: initialState,
  setDrag: () => {},
  removeDrag: () => {},
});
DnDContext.displayName = 'DnDContext';

export const DnDProvider = <T extends DragAndDrop.Details>({
  children,
}: PropsWithChildren) => {
  const [state, setState] = useState<DragAndDrop.Data<T>>(initialState);

  return (
    <DnDContext.Provider
      value={{
        setDrag: setState,
        removeDrag: () => {
          setState(initialState);
        },
        data: state,
      }}
    >
      {children}
    </DnDContext.Provider>
  );
};

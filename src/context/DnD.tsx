import React, { useState, createContext, PropsWithChildren } from 'react';

export type DnDProps<T> = {
  data: DnDData<T>;
  setDrag: (data: DnDData<T>) => void;
  removeDrag: () => void;
};

const initialState: DnDData<any> = {
  item: undefined,
  type: '',
  copy: false,
};

export const DnDContext = createContext<DnDProps<any>>({
  data: initialState,
  setDrag: () => {},
  removeDrag: () => {},
});
DnDContext.displayName = 'DnDContext';

export const DnDProvider = <T,>({ children }: PropsWithChildren) => {
  const [state, setState] = useState<DnDData<T>>(initialState);

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

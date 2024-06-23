import React, { useState, createContext, PropsWithChildren } from 'react';

export type DnDData<T> = {
  type: string;
  item?: T;
  copy: boolean;
};

export type DnDProps<T, E> = {
  data: DnDData<T>;
  getItem: (e: React.DragEvent<E>, dataTransfer: boolean) => T;
  setDrag: (data: DnDData<T>) => void;
  removeDrag: () => void;
};

const initialState: DnDData<any> = {
  item: undefined,
  type: '',
  copy: false,
};

export const DnDContext = createContext<DnDProps<any, any>>({
  data: initialState,
  getItem(e) {
    return undefined;
  },
  setDrag: () => {},
  removeDrag: () => {},
});
DnDContext.displayName = 'DnDContext';

export const DnDProvider = <T, E extends HTMLElement>({
  children,
}: PropsWithChildren) => {
  const [state, setState] = useState<DnDData<T>>(initialState);

  return (
    <DnDContext.Provider
      value={{
        setDrag: setState,
        getItem: (e: React.DragEvent<E>, dataTransfer: boolean) => {
          if (dataTransfer) return e.dataTransfer;

          if (state.item === undefined) {
            throw new Error(
              `DnDProvider.getItem failed to execute. State: ${state}. Event: ${e}`
            );
          }
          return state.item;
        },
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

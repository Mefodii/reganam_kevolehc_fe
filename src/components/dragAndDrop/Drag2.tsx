import React, { useState } from 'react';

type DnDProps = {
  data: DragAndDrop.Data;
  setDrag: (data: DragAndDrop.Data) => void;
  removeDrag: () => void;
};

const initialState: DragAndDrop.Data = {
  details: undefined,
  copy: false,
};

// TODO: (M) - generic context https://stackoverflow.com/questions/51448291/how-to-create-a-generic-react-component-with-a-typed-context-provider
export const DnDContext = React.createContext<DnDProps>({
  data: initialState,
  setDrag: () => {},
  removeDrag: () => {},
});
DnDContext.displayName = 'DnDContext';

export const DnDProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = useState<DragAndDrop.Data>(initialState);

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

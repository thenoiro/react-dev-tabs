import { createContext, useMemo } from 'react';

import useToggle, { UseToggleTrigger } from 'hooks/useToggle.hook';

interface ListStateProviderProps {
  children?: React.ReactNode;
}

export interface ListStateValue {
  state: boolean;
  toggle: UseToggleTrigger;
}

const emptyToggle = function() {};
emptyToggle.on = () => {};
emptyToggle.off = () => {};

const defaultValue: ListStateValue = {
  state: false,
  toggle: emptyToggle,
};

export const ListStateContext = createContext<ListStateValue>(defaultValue);

const ListStateProvider = (props: ListStateProviderProps) => {
  const { children } = props;
  const [open, toggle] = useToggle();

  const value = useMemo(() => {
    return {
      state: open,
      toggle,
    };
  }, [open, toggle]);

  return (
    <ListStateContext.Provider value={value}>
      {children}
    </ListStateContext.Provider>
  );
};

export default ListStateProvider;

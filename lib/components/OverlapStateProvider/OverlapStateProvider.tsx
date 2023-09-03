import { createContext, useMemo } from 'react';

import { UseToggleTrigger } from 'hooks/useToggle.hook';

import useOverlapStateToggle from './useOverlapStateToggle.hook';

interface OverlapStateProviderProps {
  children?: React.ReactNode;
}

export interface OverlapStateValue {
  state: boolean;
  toggle: UseToggleTrigger;
}

const emptyToggle = function() {};
emptyToggle.on = () => {};
emptyToggle.off = () => {};

const defaultValue: OverlapStateValue = {
  state: false,
  toggle: emptyToggle,
};

export const OverlapStateContext = createContext<OverlapStateValue>(defaultValue);

const OverlapStateProvider = (props: OverlapStateProviderProps) => {
  const { children } = props;
  const [open, toggleOpen] = useOverlapStateToggle();

  const value = useMemo<OverlapStateValue>(() => {
    return {
      state: open,
      toggle: toggleOpen,
    };
  }, [open, toggleOpen]);

  return (
    <OverlapStateContext.Provider value={value}>
      {children}
    </OverlapStateContext.Provider>
  )
};

export default OverlapStateProvider;

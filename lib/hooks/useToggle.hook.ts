import { useMemo, useState } from 'react';

export type UseToggleTrigger = {
  (v?: unknown): void;
  on: () => void;
  off: () => void;
}
export type UseToggleValues = [boolean, UseToggleTrigger];

const useToggle = (initialState?: boolean): UseToggleValues => {
  const [state, setState] = useState(!!initialState);

  const toggle = useMemo(() => {
    const toggleHandler = function(v?: unknown, ...args: unknown[]) {
      const isBoolean = typeof v === 'boolean';

      if (!isBoolean) {
        setState((prev) => !prev);
        return;
      }
      setState(v);
    };
    toggleHandler.on = () => {
      setState(true);
    };
    toggleHandler.off = () => {
      setState(false);
    };
    return toggleHandler;
  }, []);

  return useMemo(() => {
    return [state, toggle];
  }, [state, toggle]);
};

export default useToggle;

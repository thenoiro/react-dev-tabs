import { useEffect, useMemo } from 'react';

import { TimeoutId } from 'types';
import useToggle, { UseToggleValues } from 'hooks/useToggle.hook';

const delay = 500;

const useOverlapStateToggle = (): UseToggleValues => {
  const [open, toggleOpen] = useToggle(false);

  // Open modal on shifts press
  useEffect(() => {
    if (open) {
      return;
    }
    let shiftLeft = false;
    let shiftRight = false;
    let open_tid: TimeoutId;

    const listenKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ShiftLeft':
          shiftLeft = true;
          break;
        case 'ShiftRight':
          shiftRight = true;
          break;
        default:
          break;
      }
      if (shiftLeft && shiftRight) {
        open_tid = setTimeout(() => {
          if (shiftLeft && shiftRight) {
            toggleOpen.on();
          }
        }, delay);
      }
    };

    const listenKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ShiftLeft':
          shiftLeft = false;
          break;
        case 'ShiftRight':
          shiftRight = false;
          break;
        default:
          break;
      }
      clearTimeout(open_tid);
    };

    window.addEventListener('keydown', listenKeyDown);
    window.addEventListener('keyup', listenKeyUp);

    return () => {
      shiftLeft = false;
      shiftRight = false;

      window.removeEventListener('keydown', listenKeyDown);
      window.removeEventListener('keyup', listenKeyUp);
      clearTimeout(open_tid);
    };
  }, [open]);

  return useMemo(() => {
    return [open, toggleOpen];
  }, [open, toggleOpen]);
};

export default useOverlapStateToggle;

import { Children, cloneElement, useEffect, useRef } from 'react';

import useCombineRefs from 'hooks/useCombineRefs.hook';

interface ClickAwayListenerProps {
  children: React.ReactElement;
  onClickAway?: (e: MouseEvent) => void;
  disabled?: boolean;
}

const ClickAwayListener = (props: ClickAwayListenerProps) => {
  const { children, onClickAway, disabled } = props;

  const child = Children.only(children);
  const rootRef = useRef<HTMLElement | null>(null);
  const handleRef = useCombineRefs(rootRef, child.props.ref);

  useEffect(() => {
    const { current: element } = rootRef;

    const listenClickAway = (e: MouseEvent) => {
      const { target } = e;
      const badElements = !element || !(target instanceof HTMLElement);
      const badConditions = !onClickAway || disabled;

      if (badElements || badConditions) {
        return;
      }
      const isInside = element === target || element.contains(target);

      if (!isInside) {
        onClickAway(e);
      }
    };

    if (element || document.contains(element)) {
      window.addEventListener('mousedown', listenClickAway);
    }
    return () => {
      if (element) {
        window.removeEventListener('mousedown', listenClickAway);
      }
    };
  }, [onClickAway, disabled]);

  return cloneElement(
    child,
    {
      ...child.props,
      ref: handleRef,
    },
  );
};

export default ClickAwayListener;

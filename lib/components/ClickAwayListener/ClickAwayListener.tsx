import { Children, cloneElement, useCallback, useEffect, useRef } from 'react';

interface ClickAwayListenerProps {
  children: React.ReactElement;
  onClickAway?: (e: MouseEvent) => void;
  disabled?: boolean;
}

const ClickAwayListener = (props: ClickAwayListenerProps) => {
  const { children, onClickAway, disabled } = props;

  const rootRef = useRef<HTMLElement | null>(null);
  const child = Children.only(children);

  const handleRef = useCallback((el: HTMLElement) => {
    rootRef.current = el;
    const originRef = child.props.ref;

    if (typeof originRef === 'function') {
      originRef(el);
      return;
    }
    if (typeof originRef === 'object') {
      originRef.current = el;
    }
  }, [child]);

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

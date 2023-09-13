import { Children, cloneElement, useCallback, useEffect, useRef } from 'react';

import useCombineRefs from 'hooks/useCombineRefs.hook';
import useCss from 'hooks/useCss.hook';
import { TimeoutId } from 'types';

interface FocusTrapProps {
  children: React.ReactElement;
  active?: boolean;
  delay?: number;
}

const focusableSelectors = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

const getTabIndex = (element: HTMLElement) => {
  return parseInt(element.getAttribute('tabindex') || '', 10);
};

const getFocusableElements = (rootElement: HTMLElement): HTMLElement[] => {
  const focusable = Array.from(rootElement.querySelectorAll(focusableSelectors));

  return focusable.reduce((res, element) => {
    if (!(element instanceof HTMLElement)) {
      return res;
    }
    const tabindex = getTabIndex(element);
    const styles = window.getComputedStyle(element);
    const display = styles.getPropertyValue('display');

    if (display === 'none') {
      return res;
    }
    if (!Number.isNaN(tabindex) || tabindex < 0) {
      return res;
    }
    if (element.hidden) {
      return res;
    }
    if (element instanceof HTMLInputElement) {
      if (element.disabled || element.type === 'hidden') {
        return res;
      }
    }
    return [...res, element];
  }, [] as HTMLElement[]);
};

const FocusTrap = (props: FocusTrapProps) => {
  const { children, active, delay = 0 } = props;

  const guardStartRef = useRef<HTMLDivElement>(null);
  const guardEndRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const child = Children.only(children);
  const handleRef = useCombineRefs(rootRef, child.props.ref);

  const guardClass = useCss({
    width: 0,
    height: 0,
    opacity: 0,
    position: 'absolute',
    display: 'inline-flex',
  });

  useEffect(() => {
    const { current: rootElement } = rootRef;

    if (rootElement) {
      const ti = getTabIndex(rootElement);

      if (!Number.isFinite(ti)) {
        rootElement.setAttribute('tabIndex', '-1');
      }
    }
  }, []);

  // Initial focus
  useEffect(() => {
    const { current: rootElement } = rootRef;
    let tid: TimeoutId;

    if (active && rootElement) {
      if (document.activeElement instanceof HTMLElement) {
        returnFocus.current = document.activeElement;
      } else {
        returnFocus.current = null;
      }
      if (delay > 0) {
        tid = setTimeout(() => {
          rootElement.focus();
        }, delay);
      } else {
        rootElement.focus();
      }
    }
    return () => {
      clearTimeout(tid);
    };
  }, [active, delay]);

  // Return initial focus
  useEffect(() => {
    if (!active && returnFocus.current) {
      returnFocus.current.focus();
      returnFocus.current = null;
    }
  }, [active]);

  const handleGuardStartFocus = useCallback(() => {
    const { current: rootElement } = rootRef;

    if (rootElement && active) {
      const focusableElements = getFocusableElements(rootElement);

      if (focusableElements.length > 0) {
        const target = focusableElements[focusableElements.length - 1];
        target.focus();
      }
    }
  }, [active]);

  const handleGuardEndFocus = useCallback(() => {
    const { current: rootElement } = rootRef;

    if (rootElement && active) {
      const focusableElements = getFocusableElements(rootElement);

      if (focusableElements.length > 0) {
        const target = focusableElements[0];
        target.focus();
      }
    }
  }, [active]);

  const content = cloneElement(
    child,
    {
      ...child.props,
      ref: handleRef,
    },
  );

  return (
    <>
      <div
        ref={guardStartRef}
        className={guardClass}
        tabIndex={active ? 0 : -1}
        onFocus={handleGuardStartFocus}
      />

      {content}

      <div
        ref={guardEndRef}
        className={guardClass}
        tabIndex={active ? 0 : -1}
        onFocus={handleGuardEndFocus}
      />
    </>
  );
};

export default FocusTrap;

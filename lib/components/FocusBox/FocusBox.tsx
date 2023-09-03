import { Children, cloneElement, useCallback, useMemo, useState } from 'react';

import useCss from 'hooks/useCss.hook';
import { cx, keyframes } from 'utils/emotion';

interface FocusBoxProps {
  children: React.ReactElement;
}

const focusAnimation = keyframes({
  '0%': {
    transform: 'scale(0)',
    opacity: 1,
  },
  '100%': {
    transform: 'scale(2)',
    opacity: 0,
  },
});

const FocusBox = (props: FocusBoxProps) => {
  const { children } = props;

  const [size, setSize] = useState(0);

  const child = useMemo(() => {
    const target = Children.only(children);
    return target;
  }, [children]);

  const rippleClass = useCss((theme) => ({
    width: size,
    height: size,
    backgroundColor: theme.palette.accent.primary.color,
    borderRadius: '50%',
    animation: `${focusAnimation} 1.5s ease infinite`,
  }));

  const rootClass = useCss((theme) => ({
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.color(
      theme.palette.accent.primary.contrast.low,
      'transparent',
      0.1,
    ),
  }));

  const parentClass = useCss(() => ({
    position: 'relative',

    '&:focus-visible': {
      [`& .${rootClass}`]: {
        display: 'flex',
      },
    },
  }));

  const handleFocus = useCallback((e: FocusEvent) => {
    const { target } = e;

    if (target instanceof HTMLElement) {
      const { width, height } = target.getBoundingClientRect();
      setSize(Math.max(width, height));
    }
  }, []);

  const cloneProps = useMemo(() => {
    return {
      ...child.props,
      className: cx(child.props.className, parentClass),
      onFocus: (e: FocusEvent) => {
        handleFocus(e);

        if (typeof child.props.onFocus === 'function') {
          child.props.onFocus(e);
        }
      },
    };
  }, [child, parentClass, handleFocus]);

  const element = (
    <div className={rootClass}>
      <div className={rippleClass} />
    </div>
  );

  return cloneElement(
    child,
    cloneProps,
    child.props.children,
    element,
  );
};

export default FocusBox;

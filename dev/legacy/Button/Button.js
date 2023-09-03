import { lazy, useMemo } from 'react';

const Button = (props) => {
  const {
    children,
    variant = 'outlined',
    color = 'primary',
    size = 'medium',
    ...rest
  } = props;

  const mainColor = useMemo(() => {
    if (color === 'primary') {
      return 'blue';
    }
    return 'green';
  }, [color]);

  const bgColor = useMemo(() => {
    if (variant === 'contained') {
      return mainColor;
    }
    if (variant === 'outlined') {
      return 'white';
    }
    return 'transparent';
  }, [variant, mainColor]);

  const textColor = variant === 'contained' ? 'white' : mainColor;

  const padding = useMemo(() => {
    if (size === 'large') {
      return '8px 24px';
    }
    if (size === 'medium') {
      return '6px 18px';
    }
    return '4px 12px';
  }, [size]);

  const border = useMemo(() => {
    if (variant === 'outlined') {
      return `1px solid ${mainColor}`;
    }
    return 'none';
  }, [variant, mainColor]);

  return (
    <button
      {...rest}
      style={{
        all: 'unset',
        borderRadius: 8,
        background: bgColor,
        color: textColor,
        cursor: 'pointer',
        padding,
        border,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      }}
    >
      {children}
    </button>
  );
};

Button.Demo = lazy(() => import('./Button.demo'));

export default Button;

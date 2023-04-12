import { lazy } from 'react';

const sizes = {
  small: '4px 8px',
  medium: '6px 12px',
  large: '8px 16px',
};

const Button = (props) => {
  const { children, size = 'medium', ...rest } = props;

  return (
    <button style={{ padding: sizes[size] }} {...rest}>
      {children}
    </button>
  );
};

if (process.env.NODE_ENV === 'development') {
  Button.Demo = lazy(() => import('./Button.demo'));
}

export default Button;

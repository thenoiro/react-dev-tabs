import { Suspense, lazy } from 'react';

const DevKit = lazy(() => import('lib/views/DevKit'));

const dev = process.env.NODE_ENV === 'development';

const Dev = (props) => {
  const { visible, ...rest } = props;

  const isVisible = typeof visible === 'boolean' ? visible : dev;

  if (!isVisible) {
    return null;
  }
  return (
    <Suspense fallback={null}>
      <DevKit {...rest} />
    </Suspense>
  );
};

export default Dev;

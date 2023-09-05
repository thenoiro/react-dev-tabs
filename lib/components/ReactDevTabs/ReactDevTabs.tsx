import { Suspense, lazy } from 'react';

import { DevKitProps } from 'components/DevKit/DevKit.types';

const isDevelopment = process.env['NODE_ENV'] === 'development';
const DevKit = lazy(() => import('components/DevKit'));

export interface ReactDevTabsProps extends DevKitProps {
  visible?: boolean;
}

const ReactDevTabs = (props: ReactDevTabsProps) => {
  const { visible, ...rest } = props;

  const isVisible = typeof visible === 'boolean' ? visible : isDevelopment;

  if (!isVisible) {
    return null;
  }
  return (
    <Suspense fallback={null}>
      <DevKit {...rest} />
    </Suspense>
  );
};

export default ReactDevTabs;

import { Suspense, lazy } from 'react';

import { FieldComponentProps } from './FieldComponent.types';

const FieldComponent = lazy(() => import('./FieldComponent'));

const Field = <PropType extends unknown>(props: FieldComponentProps<PropType>) => {
  return (
    <Suspense fallback={null}>
      <FieldComponent {...props} />
    </Suspense>
  );
};

export default Field;

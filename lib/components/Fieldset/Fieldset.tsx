import { Suspense, lazy } from 'react';

import Field from 'components/Field';

import { FieldsetComponentProps } from './FieldsetComponent.types';

const FieldsetComponent = lazy(() => import('./FieldsetComponent'));

const Fieldset = (props: FieldsetComponentProps) => {
  return (
    <Suspense fallback={null}>
      <FieldsetComponent {...props} />
    </Suspense>
  );
};

Fieldset.Field = Field;

export default Fieldset;

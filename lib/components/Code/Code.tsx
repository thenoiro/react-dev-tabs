import { Suspense, lazy } from 'react';

import { CodeComponentProps } from './CodeComponent.types';

const CodeComponent = lazy(() => import('./CodeComponent'));

const Code = (props: CodeComponentProps) => {
  return (
    <Suspense>
      <CodeComponent {...props} />
    </Suspense>
  );
};

export default Code;

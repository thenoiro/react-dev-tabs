import { lazy } from 'react';

const LongLegendLength = () => {
  return (
    <div />
  );
};

LongLegendLength.Demo = lazy(() => import('./ManyFieldProps.demo'));

export default LongLegendLength;

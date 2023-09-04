import { lazy } from 'react';

const LongLegendLength = () => {
  return (
    <div />
  );
};

LongLegendLength.Demo = lazy(() => import('./LongLegendLength.demo'));

export default LongLegendLength;

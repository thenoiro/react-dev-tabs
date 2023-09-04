import { lazy } from 'react';

const BadDemo = () => {
  return (
    <div>Bad Demo</div>
  );
};

BadDemo.Demo = lazy(() => import('./BadDemo.demo'));

export default BadDemo;

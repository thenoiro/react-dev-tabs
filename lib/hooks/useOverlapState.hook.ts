import { useContext } from 'react';

import { OverlapStateContext } from 'components/OverlapStateProvider';

const useOverlapState = () => {
  return useContext(OverlapStateContext);
};

export default useOverlapState;

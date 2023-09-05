import { useContext } from 'react'

import { ListStateContext } from 'components/ListStateProvider'

const useListState = () => {
  return useContext(ListStateContext);
};

export default useListState;

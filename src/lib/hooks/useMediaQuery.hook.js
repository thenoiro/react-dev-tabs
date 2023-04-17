import { useEffect, useState } from 'react';

import { isMediaQuery } from 'lib/utils';

const useMediaQuery = (query) => {
  const [isQuery, setIsQuery] = useState(isMediaQuery(query));

  useEffect(() => {
    const resizeListener = () => {
      setIsQuery(isMediaQuery(query));
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [query]);

  return isQuery;
};

export default useMediaQuery;

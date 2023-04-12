import { useCallback, useState } from 'react';

import { classname as cx } from 'lib/utils';
import Box from 'lib/components/Box';

import './list.css';

const List = (props) => {
  const { options, onItemClick } = props;

  const [lastClicked, setLastClicked] = useState(null);

  const handleItemClick = useCallback((item) => (e) => {
    setLastClicked(item.value);
    typeof onItemClick === 'function' && onItemClick(e, item);
  }, [onItemClick]);

  return (
    <Box overflow="auto">
      {options.map((opt) => (
        <Box
          px={2}
          py={1}
          key={opt.value}
          onClick={handleItemClick(opt)}
          className={cx(
            'dev-list-item',
            lastClicked === opt.value && 'dev-list-item-last-clicked'
          )}
        >
          {opt.label}
        </Box>
      ))}
    </Box>
  );
};

export default List;

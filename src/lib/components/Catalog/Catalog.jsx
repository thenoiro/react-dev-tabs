import { useCallback, useState } from 'react';

import { classname as cx } from 'lib/utils';
import Shell from 'lib/components/Shell';

import './catalog.css';

const Catalog = (props) => {
  const { options, onItemClick } = props;

  const [lastClicked, setLastClicked] = useState(null);

  const handleItemClick = useCallback((item) => (e) => {
    setLastClicked(item.value);
    typeof onItemClick === 'function' && onItemClick(e, item);
  }, [onItemClick]);

  return (
    <Shell overflow="auto">
      {options.map((opt) => (
        <Shell
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
        </Shell>
      ))}
    </Shell>
  );
};

export default Catalog;

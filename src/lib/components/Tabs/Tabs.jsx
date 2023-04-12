import { classname as cx } from 'lib/utils';
import { Box } from 'lib/components';

import './tabs.css';

const Tabs = (props) => {
  const { value, onValue, options } = props;

  return (
    <div className="dev-tabs-root">
      <div className="dev-tabs-container">
        {options.map((opt) => (
          <Box
            p={1}
            px={4}
            key={opt.value}
            onClick={() => onValue(opt.value)}
            className={cx('dev-tabs-tab', value === opt.value && 'dev-tabs-tab-current')}
          >
            {opt.label}
          </Box>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

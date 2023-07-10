import { classname as cx } from 'lib/utils';
import { Shell } from 'lib/components';

import './topics.css';

const Topics = (props) => {
  const { value, onValue, options } = props;

  return (
    <div className="dev-tabs-root">
      <div className="dev-tabs-container">
        {options.map((opt) => (
          <Shell
            p={1}
            px={2}
            key={opt.value}
            onClick={() => onValue(opt.value)}
            className={cx('dev-tabs-tab', value === opt.value && 'dev-tabs-tab-current')}
          >
            {opt.label}
          </Shell>
        ))}
      </div>
    </div>
  );
};

export default Topics;

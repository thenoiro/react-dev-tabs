import { useMemo } from 'react';

import { classname as cx } from 'lib/utils';
import { Shell } from 'lib/components';

import './code.css';

const Code = (props) => {
  const { children, className, display = 'block', ...rest } = props;

  const content = useMemo(() => {
    if (typeof children !== 'string') {
      return null;
    }
    const strings = children.split('\n');
    const offset = strings.reduce((res, str) => {
      if (!str.trim()) {
        return res;
      }
      const currentOffset = str.search(/\S/);
      return Math.min(res, currentOffset);
    }, Infinity);

    if (strings.length > 0 && !strings[strings.length - 1].trim()) {
      strings.pop();
    }
    if (strings.length > 0 && !strings[0].trim()) {
      strings.shift();
    }
    return strings
      .map((str) => {
        if (!str.trim()) {
          return str;
        }
        return str.slice(offset);
      })
      .join('\n');
  }, [children]);

  if (typeof content !== 'string') {
    return null;
  }
  return (
    <Shell
      {...rest}
      display={display}
      component="pre"
      className={cx('dev-code-root', className)}
    >
      {content}
    </Shell>
  );
};

export default Code;

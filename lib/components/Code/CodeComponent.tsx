import { useMemo } from 'react';

import { cx } from 'utils/emotion';
import useCss from 'hooks/useCss.hook';

import { CodeComponentProps } from './CodeComponent.types';

const CodeComponent = (props: CodeComponentProps) => {
  const { children, className } = props;

  const rootClass = useCss((theme) => ({
    margin: theme.size(1, 0),
    padding: theme.size(1, 2),
    borderRadius: theme.size(0.5),
    maxHeight: 351,
    overflow: 'hidden',
    overflowY: 'auto',
    backgroundColor: theme.color(
      theme.palette.accent.primary.color,
      theme.palette.accent.primary.contrast.high,
      0.25,
    ),
    color: theme.color(
      theme.palette.accent.primary.color,
      theme.palette.accent.primary.contrast.low,
      0.05,
    ),
    ...theme.scroll({ size: 10 }),
    ...theme.text({
      variant: 'code',
      size: 'small',
    }),
  }));

  const content: null | string = useMemo(() => {
    if (typeof children !== 'string') {
      return null;
    }
    const strings = children.split('\n');

    const offset = strings.reduce((acc, str) => {
      if (!str.trim()) {
        return acc;
      }
      const currentOffset = str.search(/\S/);
      return Math.min(acc, currentOffset);
    }, Infinity);

    if (strings.length > 0 && !strings[strings.length - 1].trim()) {
      strings.pop();
    }
    if (strings.length > 0 && !strings[0].trim()) {
      strings.shift();
    }
    return strings.map((str) => {
      if (!str.trim()) {
        return str;
      }
      return str.slice(offset);
    }).join('\n');
  }, [children]);

  if (!content) {
    return null;
  }
  return (
    <pre className={cx(rootClass, className)}>
      {content}
    </pre>
  );
};

export default CodeComponent;

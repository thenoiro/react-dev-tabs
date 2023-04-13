import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { classname as cx } from 'lib/utils';
import { Shell } from 'lib/components';

import './componentBox.css';

const ComponentBox = (props) => {
  const { name, Component, refs } = props;

  const [open, setOpen] = useState(false);
  const titleRef = useRef();

  const demoExist = !!Component?.Demo;

  const handleToggle = useCallback((e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const { current: components } = refs;
    const { current: titleElement } = titleRef;

    if (components && titleElement) {
      components[name] = titleElement;

      return () => {
        components[name] = null;
      };
    }
  }, [name, refs]);

  return (
    <details
      onToggle={handleToggle}
      className="dev-component-box"
    >
      <summary
        ref={titleRef}
        className={cx('dev-component-box-header', !demoExist && 'dev-component-no-demo')}
      >
        {`<${name} />`}
      </summary>

      <div className="dev-component-box-content">
        <Shell px={2} py={1}>
          {demoExist && open && (
            <Suspense fallback="Loading...">
              <Component.Demo open={open} />
            </Suspense>
          )}

          {!demoExist && (
            <Shell fontFamily="sans-serif" fontStyle="italic" opacity={0.5}>
              No demo provided...
            </Shell>
          )}
        </Shell>
      </div>
    </details>
  );
};

export default ComponentBox;

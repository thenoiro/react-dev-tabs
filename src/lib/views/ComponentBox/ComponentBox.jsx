import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

import './componentBox.css';
import { Box } from 'lib/components';

const ComponentBox = (props) => {
  const { name, Component, refs } = props;

  const [open, setOpen] = useState(true);
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
        className="dev-component-box-header"
      >
        {`<${name} />`}
      </summary>

      <div className="dev-component-box-content">
        <Box px={2} py={1}>
          {demoExist && (
            <Suspense fallback="Loading...">
              <Component.Demo open={open} />
            </Suspense>
          )}

          {!demoExist && (
            <div>
              No demo provided...
            </div>
          )}
        </Box>
      </div>
    </details>
  );
};

export default ComponentBox;

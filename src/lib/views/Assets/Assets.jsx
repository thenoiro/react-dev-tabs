import { useCallback, useEffect, useRef, useState } from 'react';

import { classname as cx } from 'lib/utils';
import { Box, Notify } from 'lib/components';

import './assets.css';

const Asset = (props) => {
  const { onClick, size, src, name, path, active } = props;

  const importString = `import { ${name} } from '${path}';`;
  const notifyRef = useRef();

  const handleClick = useCallback(async (e) => {
    typeof onClick === 'function' && onClick(name);
    await navigator.clipboard.writeText(importString);

    notifyRef.current.show(importString, {
      event: e,
    });
  }, [importString, onClick, name]);

  return (
    <Box
      gap="8px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      minWidth={100}
    >
      <Notify ref={notifyRef} />

      <Box
        component="img"
        src={src}
        width={size}
        height={size}
        onClick={handleClick}
        className={cx(
          'dev-assets-asset',
          active && 'dev-assets-asset-clicked',
        )}
      />
      <Box
        textAlign="center"
        fontFamily="monospace"
        fontSize={14}
        fontWeight={800}
      >
        {name}
      </Box>
    </Box>
  );
};

const Assets = (props) => {
  const { modules, path, size = 200 } = props;

  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);

  const getModules = useCallback(async () => {
    setLoading(true);

    try {
      const images = await modules();

      const newSource = Object.entries(images)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, src]) => ({ name, src }));

      setSource(newSource);
    } catch (ex) {
      console.error(ex);
    }
    setLoading(false);
  }, [modules]);

  useEffect(() => {
    if (!source && !loading) {
      getModules();
    }
  }, [getModules, loading, source]);

  return (
    <Box
      height="100%"
      display="flex"
      gap="16px"
      position="relative"
      className="dev-assets-root"
    >
      {(!loading && source) && (
        <Box className="dev-assets-container">
          {source.map((s) => (
            <Asset
              key={s.name}
              {...s}
              path={path}
              size={size}
              onClick={setLastClicked}
              active={lastClicked === s.name}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Assets;

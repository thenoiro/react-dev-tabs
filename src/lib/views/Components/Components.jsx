import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Shell, Catalog } from 'lib/components';
import ComponentBox from 'lib/views/ComponentBox';

import './components.css';

const Components = (props) => {
  const { modules } = props;

  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const componentsRefs = useRef({});

  const getModules = useCallback(async () => {
    setLoading(true);

    try {
      const components = await modules();
      const newSource = Object.entries(components)
        .filter(([name]) => name[0] === name[0].toUpperCase())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, Component]) => ({
          name,
          Component,
        }));

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

  const listOptions = useMemo(() => {
    return !source ? [] : source.map((s) => ({
      label: s.name,
      value: s.name,
    }));
  }, [source]);

  const handleScroll = useCallback((e, component) => {
    const { current: elements } = componentsRefs;
    const target = elements?.[component.label];

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <Shell
      height="100%"
      display="flex"
      gap="16px"
      position="relative"
    >
      {(!loading && source) && (
        <>
          <Shell className="dev-components-list">
            <Catalog
              options={listOptions}
              onItemClick={handleScroll}
            />
          </Shell>

          <Shell
            overflowX="hidden"
            overflow="auto"
            flexGrow={1}
          >
            <Shell pr={1} overflow="hidden">
              {source.map((s) => (
                <Shell key={s.name} mb={2}>
                  <ComponentBox
                    refs={componentsRefs}
                    {...s}
                  />
                </Shell>
              ))}
            </Shell>
          </Shell>
        </>
      )}
    </Shell>
  );
};

export default Components;

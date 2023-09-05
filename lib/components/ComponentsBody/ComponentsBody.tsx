import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  ComponentVariant,
  ComponentsTab,
  DemoComponent,
  LegacyDemoComponent,
  RawComponent,
} from 'types';

import useCss from 'hooks/useCss.hook';
import useToggle from 'hooks/useToggle.hook';
import ComponentsList from 'components/ComponentsList';
import ComponentsContent from 'components/ComponentsContent';

interface RawComponentDetails {
  name: string;
  Component?: DemoComponent;
}
interface ComponentsBodyProps extends ComponentsTab {
  open: boolean;
}

const isLegacyComponent = (v: RawComponent): v is LegacyDemoComponent => {
  return typeof v.Demo === 'function' || typeof v.Demo?.$$typeof === 'symbol';
};
const isDemoComponent = (v: RawComponent): v is DemoComponent => {
  return typeof v === 'function' || typeof v.$$typeof === 'symbol';
};
const getComponent = (
  c: RawComponent,
  variant: ComponentVariant,
): DemoComponent | undefined => {
  if (isLegacyComponent(c) && variant === 'inside') {
    return c.Demo;
  }
  if (isDemoComponent(c) && variant === 'outside') {
    return c;
  }
  return undefined;
};

const ComponentsBody = (props: ComponentsBodyProps) => {
  const { open, modules, variant = 'outside', label } = props;

  const [initialized, toggleInitialized] = useToggle();
  const [components, setComponents] = useState<RawComponentDetails[]>([]);
  const [selected, setSelected] = useState<string | undefined>();

  const rootClass = useCss(() => ({
    display: 'flex',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }));

  const getModules = useCallback(async () => {
    try {
      const response = await modules();

      if (!response || typeof response !== 'object') {
        throw new Error('[modules] property Promise returned wrong response');
      }
      const source = Object.entries(response)
        .reduce((acc, [name, value]) => {
          const firstChar = name[0];
          const wrongName = firstChar !== firstChar.toUpperCase();
          const wrongType = typeof value !== 'function' && typeof value !== 'object';

          if (wrongName || wrongType) {
            return acc;
          }
          return [
            ...acc,
            {
              name,
              Component: getComponent(value, variant),
            },
          ];
        }, [] as RawComponentDetails[]);

      source.sort((a, b) => a.name.localeCompare(b.name));
      setComponents(source);
    } catch (ex) {
      console.log('[modules] property of tab is not valid');
      console.error(ex);
    }
  }, [modules, variant]);

  useEffect(() => {
    if (!initialized && open) {
      toggleInitialized.on();
      getModules();
    }
  }, [open, initialized, getModules, toggleInitialized]);

  const options = useMemo(() => {
    return components.map((c) => {
      return {
        value: c.name,
        label: c.name,
        empty: !c.Component,
      };
    });
  }, [components]);

  const component = useMemo(() => {
    return components.find((c) => c.name === selected);
  }, [selected, components]);

  return (
    <div className={rootClass}>
      {open && (
        <ComponentsList
          label={label}
          value={selected}
          options={options}
          onChange={setSelected}
        />
      )}

      <ComponentsContent
        name={component?.name}
        Component={component?.Component}
      />
    </div>
  );
};

export default ComponentsBody;

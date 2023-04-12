import { Suspense, lazy, useMemo, useState } from 'react';

import { Shell, Topics } from 'lib/components';

const Components = lazy(() => import('lib/views/Components'));
const Assets = lazy(() => import('lib/views/Assets'));

const getComponent = (type, own) => {
  if (own) {
    return own;
  }
  switch (type) {
    case 'components':
      return Components;
    case 'assets':
      return Assets;
    default:
      return null;
  }
};

const Pane = (props) => {
  const { open, Component, props: tabProps } = props;

  if (!open || !Component) {
    return null;
  }
  return (
    <Suspense fallback="Loading...">
      <Component {...tabProps} />
    </Suspense>
  );
};

const DevKitContent = (props) => {
  const { tabs, open } = props;

  const options = useMemo(() => {
    if (!Array.isArray(tabs)) {
      return [];
    }
    return tabs.map((tab) => ({
      ...tab,
      value: tab.label,
      Component: getComponent(tab.type, tab.Component),
    }));
  }, [tabs]);

  const [tab, setTab] = useState(options?.[0]?.value);

  return (
    <Shell height="100%" display="flex" flexDirection="column">
      <Topics
        value={tab}
        onValue={setTab}
        options={options}
      />

      <Shell mt={2} height="100%" maxHeight="100%" overflow="hidden">
        {options.map(({ Component, ...opt}) => (
          <Pane
            key={opt.value}
            open={tab === opt.value}
            Component={Component}
            props={{ open, ...opt }}
          />
        ))}
      </Shell>
    </Shell>
  );
};

export default DevKitContent;

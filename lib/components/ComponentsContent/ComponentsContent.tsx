import { Suspense } from 'react';

import { DemoComponent } from 'types';
import useCss from 'hooks/useCss.hook';
import Text from 'components/Text';

interface ComponentsContentProps {
  Component?: DemoComponent;
  name?: string;
}

const ComponentsContent = (props: ComponentsContentProps) => {
  const { Component, name } = props;

  const rootClass = useCss(() => ({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  }));

  const emptyClass = useCss(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const demoClass = useCss((theme) => ({
    backgroundColor: theme.palette.background.secondary.color,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'auto',
    padding: theme.size(2),
    ...theme.scroll({ size: 10 }),
  }));

  return (
    <div className={rootClass}>
      {!Component && (
        <div className={emptyClass}>
          <Text>
            {!name ? 'No selected components' : 'No Demo provided'}
          </Text>
        </div>
      )}

      {!!Component && (
        <div className={demoClass}>
          <Suspense>
            <Component />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ComponentsContent;

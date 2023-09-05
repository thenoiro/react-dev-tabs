import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import DevKitOverlap from 'components/DevKitOverlap';
import ThemeProvider from 'components/ThemeProvider';
import ListStateProvider from 'components/ListStateProvider';
import OverlapStateProvider from 'components/OverlapStateProvider';

import { DevKitProps } from './DevKit.types';

const DevKit = (props: DevKitProps) => {
  const { zIndex, tabs } = props;
  const [container, setContainer] = useState<HTMLElement|null>(null);

  useEffect(() => {
    setContainer(document.body);

    return () => {
      setContainer(null);
    };
  }, []);

  if (!container) {
    return null;
  }
  const children = (
    <ThemeProvider>
      <OverlapStateProvider>
        <ListStateProvider>
          <DevKitOverlap zIndex={zIndex} tabs={tabs} />
        </ListStateProvider>
      </OverlapStateProvider>
    </ThemeProvider>
  );
  return createPortal(children, container);
};

export default DevKit;

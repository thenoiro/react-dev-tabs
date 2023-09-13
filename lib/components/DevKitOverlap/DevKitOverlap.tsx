import { useEffect, useMemo, useState } from 'react';

import { DevKitTab } from 'types';
import useCss from 'hooks/useCss.hook';
import useOverlapState from 'hooks/useOverlapState.hook';

import Overlap from 'components/Overlap';
import { OverlapProps } from 'components/Overlap';
import Header from 'components/Header';
import Tabs, { TabValue } from 'components/Tabs';
import OverlapBody from 'components/OverlapBody';
import Text from 'components/Text';

export interface DevKitOverlapProps extends Pick<OverlapProps, 'zIndex'> {
  zIndex?: number;
  tabs?: DevKitTab[];
}

const defaultTabs: DevKitTab[] = [];

const DevKitOverlap = (props: DevKitOverlapProps) => {
  const { zIndex = 1000, tabs = defaultTabs } = props;
  const { state: open } = useOverlapState();
  const [tab, setTab] = useState<TabValue>(0);

  const rootClass = useCss({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  });

  const emptyClass = useCss((theme) => ({
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: `2px solid ${theme.palette.accent.primary.color}`,
  }));

  const htmlBodyClass = useCss({
    overflow: 'hidden !important',
  });

  const options = useMemo(() => {
    return tabs.map((t, index) => {
      return {
        label: t.label,
        value: index,
      };
    });
  }, [tabs]);

  useEffect(() => {
    document.body.classList.toggle(htmlBodyClass, open);

    return () => {
      document.body.classList.toggle(htmlBodyClass, false);
    };
  }, [open, htmlBodyClass]);

  return (
    <Overlap zIndex={zIndex} open={open}>
      <div className={rootClass}>
        <Header type={tabs[tab]?.type} />
        <Tabs options={options} value={tab} onChange={setTab} />

        {tabs.length > 0 && (
          <OverlapBody value={tab} tabs={tabs} open={open} />
        )}

        {tabs.length === 0 && (
          <div className={emptyClass}>
            <Text size="large">No tabs provided</Text>
          </div>
        )}
      </div>
    </Overlap>
  );
};

export default DevKitOverlap;

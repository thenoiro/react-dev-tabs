import { useMemo, useState } from 'react';

import { DevKitTab } from 'types';
import useCss from 'hooks/useCss.hook';
import useOverlapState from 'hooks/useOverlapState.hook';

import Overlap from 'components/Overlap';
import { OverlapProps } from 'components/Overlap';
import Header from 'components/Header';
import Tabs, { TabValue } from 'components/Tabs';
import OverlapBody from 'components/OverlapBody';

export interface DevKitOverlapProps extends Pick<OverlapProps, 'zIndex'> {
  zIndex?: number;
  tabs?: DevKitTab[];
}

const defaultTabs: DevKitTab[] = [];

const DevKitOverlap = (props: DevKitOverlapProps) => {
  const { zIndex, tabs = defaultTabs } = props;
  const { state: open } = useOverlapState();
  const [tab, setTab] = useState<TabValue>(0);

  const rootClass = useCss({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  });

  const options = useMemo(() => {
    return tabs.map((t, index) => {
      return {
        label: t.label,
        value: index,
      };
    });
  }, [tabs]);

  return (
    <Overlap zIndex={zIndex} open={open}>
      <div className={rootClass}>
        <Header type={tabs[tab]?.type} />
        <Tabs options={options} value={tab} onChange={setTab} />
        <OverlapBody value={tab} tabs={tabs} open={open} />
      </div>
    </Overlap>
  );
};

export default DevKitOverlap;

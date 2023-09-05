import { DevKitTab } from 'types';
import { cx } from 'utils/emotion';
import useCss from 'hooks/useCss.hook';

import AssetsBody from 'components/AssetsBody';
import ComponentsBody from 'components/ComponentsBody';

interface OverlapBodyProps {
  open: boolean;
  value?: number;
  tabs?: DevKitTab[];
}

const defaultTabs: DevKitTab[] = [];

const OverlapBody = (props: OverlapBodyProps) => {
  const {
    open,
    value,
    tabs = defaultTabs,
  } = props;

  const rootClass = useCss((theme) => ({
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
    borderTop: `2px solid ${theme.palette.accent.primary.color}`,
  }));

  const paneClass = useCss(() => ({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'none',
  }));

  const openPaneClass = useCss(() => ({
    display: 'block',
  }));

  return (
    <div className={rootClass}>
      {tabs.map((tab, index) => {
        const isOpen = index === value && open;

        return (
          <div key={index} className={cx(paneClass, isOpen && openPaneClass)}>
            {tab.type === 'assets' && (
              <AssetsBody open={isOpen} {...tab} />
            )}

            {tab.type === 'components' && (
              <ComponentsBody open={isOpen} {...tab} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OverlapBody;

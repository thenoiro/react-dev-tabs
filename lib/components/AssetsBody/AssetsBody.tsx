import { useCallback, useEffect, useState } from 'react';

import { AssetsTab } from 'types';
import useToggle from 'hooks/useToggle.hook';
import useCss from 'hooks/useCss.hook';

import Text from 'components/Text';
import Asset, { RawAssetDetails } from 'components/Asset';

interface AssetsBodyProps extends AssetsTab {
  open: boolean;
}

const AssetsBody = (props: AssetsBodyProps) => {
  const { open, label, modules, size = 300 } = props;

  const [initialized, toggleInitialized] = useToggle();
  const [assets, setAssets] = useState<RawAssetDetails[]>([]);
  const [selected, setSelected] = useState<string | undefined>();

  const rootClass = useCss((theme) => ({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'auto',
    ...theme.scroll({ size: 10 }),
  }));

  const emptyClass = useCss(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const assetsClass = useCss((theme) => ({
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',
    fontSize: 0,
    gap: theme.size(3),
    padding: theme.size(2),
    justifyContent: 'center',
  }));

  const getModules = useCallback(async () => {
    try {
      const response = await modules();

      if (!response || typeof response !== 'object') {
        throw new Error('[modules] property Promise returned wrong response');
      }
      const source = Object.entries(response)
        .reduce((acc, [name, value]) => {
          if (typeof name !== 'string' || typeof value !== 'string') {
            return acc;
          }
          if (!value.length || !name.length) {
            return acc;
          }
          return [
            ...acc,
            {
              name,
              src: value,
            },
          ];
        }, [] as RawAssetDetails[]);

      source.sort((a, b) => a.name.localeCompare(b.name));
      setAssets(source);
    } catch (ex) {
      console.log('[modules] property of tab is not valid');
      console.error(ex);
    }
  }, [modules]);

  useEffect(() => {
    if (!initialized && open) {
      toggleInitialized.on();
      getModules();
    }
  }, [initialized, toggleInitialized, open, getModules]);

  return (
    <div className={rootClass}>
      {initialized && assets.length === 0 && (
        <div className={emptyClass}>
          <Text>
            No assets found
          </Text>
        </div>
      )}

      {initialized && assets.length > 0 && (
        <div className={assetsClass}>
          {assets.map((asset, index) => {
            return (
              <Asset
                {...asset}
                size={size}
                key={`${asset.name}_${index}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssetsBody;

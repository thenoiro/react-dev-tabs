import useCss from 'hooks/useCss.hook';
import Text from 'components/Text';

export interface RawAssetDetails {
  name: string;
  src: string;
}

interface AssetProps extends RawAssetDetails {
  size: number;
}

const Asset = (props: AssetProps) => {
  const { name, src, size } = props;

  const rootClass = useCss((theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.size(0.5),
  }));

  const assetClass = useCss((theme) => ({
    backgroundColor: theme.palette.background.secondary.color,
    outline: `1px solid ${theme.color(
      theme.palette.background.secondary.contrast,
      theme.palette.background.secondary.color,
      0.25,
    )}`,
    width: size,
    height: size,
    objectFit: 'scale-down',
    transitionDuration: '200ms',
  }));

  const textClass = useCss(() => ({
    maxWidth: size,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'default',
  }));

  return (
    <div className={rootClass}>
      <img
        src={src}
        alt={name}
        className={assetClass}
      />
      <Text
        variant="code"
        weight="bold"
        title={name}
        className={textClass}
      >
        {name}
      </Text>
    </div>
  );
};

export default Asset;

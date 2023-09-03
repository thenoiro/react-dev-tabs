import { AccentPaletteCollection } from 'theme/palette';
import { cx } from 'utils/emotion';
import useCss from 'hooks/useCss.hook';

interface CloseIconProps {
  className?: string;
  size?: number;
}

const CloseIcon = (props: CloseIconProps) => {
  const { size = 4, className } = props;

  const w = size;
  const h = w / 4;
  const r = h / 4;

  const lineClass = useCss((theme) => ({
    position: 'absolute',
    width: theme.size(w),
    height: theme.size(h),
    backgroundColor: 'currentColor',
    borderRadius: theme.size(r),
  }));

  const line1Class = useCss((theme) => ({
    transform: 'rotate(-45deg)',
  }));

  const line2Class = useCss((theme) => ({
    transform: 'rotate(45deg)',
  }));

  const rootClass = useCss((theme) => ({
    position: 'relative',
    width: theme.size(size),
    height: theme.size(size),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  return (
    <span className={cx(rootClass, className)}>
      <span className={cx(lineClass, line1Class)} />
      <span className={cx(lineClass, line2Class)} />
    </span>
  );
};

export default CloseIcon;

import { cx } from 'utils/emotion';
import useCss from 'hooks/useCss.hook';

interface BurgerIconProps {
  className?: string;
  size?: number;
}

const BurgerIcon = (props: BurgerIconProps) => {
  const { size = 4, className } = props;

  const w = size;
  const h = size;
  const r = size / 16;
  const l = r * 3;

  const rootClass = useCss((theme) => ({
    width: theme.size(w),
    height: theme.size(h),
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  }));

  const lineClass = useCss((theme) => ({
    backgroundColor: 'currentColor',
    width: theme.size(size),
    height: theme.size(l),
    borderRadius: theme.size(r),
  }));

  return (
    <div className={cx(rootClass, className)}>
      <div className={lineClass} />
      <div className={lineClass} />
      <div className={lineClass} />
    </div>
  );
};

export default BurgerIcon;

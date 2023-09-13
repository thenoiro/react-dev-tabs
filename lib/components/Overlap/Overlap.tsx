import useCss from 'hooks/useCss.hook';
import FocusTrap from 'components/FocusTrap';

export interface OverlapProps {
  children?: React.ReactNode;
  zIndex?: number;
  open?: boolean;
}

const transitionDuration = 200;

const Overlap = (props: OverlapProps) => {
  const { children, zIndex, open } = props;

  const root = useCss({
    zIndex,
    position: 'fixed',
    width: '100dvw',
    height: '100dvh',
    top: 0,
    left: 0,
    visibility: open ? 'visible' : 'hidden',
    opacity: open ? 1 : 0,
    transitionDuration: `${transitionDuration}ms`,
  });

  const containerClass = useCss((theme) => ({
    width: '100dvw',
    height: '100dvh',
    backgroundColor: theme.palette.background.primary.color,

    '&:focus, &:focus-visible': {
      outline: 'none',
    },
  }));

  return (
    <div className={root}>
      <FocusTrap active={open} delay={transitionDuration}>
        <div className={containerClass}>
          {children}
        </div>
      </FocusTrap>
    </div>
  );
};

export default Overlap;

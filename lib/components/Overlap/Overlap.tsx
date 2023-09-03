import useCss from 'hooks/useCss.hook';

export interface OverlapProps {
  children?: React.ReactNode;
  zIndex?: number;
  open?: boolean;
}

const Overlap = (props: OverlapProps) => {
  const { children, zIndex, open } = props;

  const root = useCss((theme) => ({
    zIndex,
    position: 'fixed',
    width: '100dvw',
    height: '100dvh',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.background.primary.color,
    visibility: open ? 'visible' : 'hidden',
    opacity: open ? 1 : 0,
    transitionDuration: '200ms',
  }));

  return (
    <div className={root}>
      {children}
    </div>
  );
};

export default Overlap;

import { useCallback } from 'react';

import { cx } from 'utils/emotion';
import useCss from 'hooks/useCss.hook';
import useListState from 'hooks/useListState.hook';

import Text from 'components/Text';
import Button from 'components/Button';
import ClickAwayListener from 'components/ClickAwayListener';
import IconButton from 'components/IconButton';
import CloseIcon from 'components/CloseIcon';

interface ComponentsListOption {
  value: string;
  label: string;
  empty: boolean;
}

interface ComponentsListProps {
  label: string;
  value?: string;
  options: ComponentsListOption[];
  onChange: (v: string) => void;
}

const ComponentsList = (props: ComponentsListProps) => {
  const { options, value, onChange, label } = props;
  const { state, toggle } = useListState();

  const rootClass = useCss((theme) => ({
    height: '100%',
    width: '100%',
    maxWidth: 350,
    left: 0,
    transitionDuration: '200ms',
    overflow: 'hidden',
    padding: theme.size(1, 0, 2),
    borderRight: `1px solid ${theme.color(
      theme.palette.accent.primary.color,
      theme.palette.accent.primary.contrast.low,
    )}`,
    backgroundColor: theme.color(
      theme.palette.accent.primary.color,
      theme.palette.accent.primary.contrast.low,
      0.05,
    ),
    [theme.screen.down('desktop')]: {
      maxWidth: 250,
    },
    [theme.screen.down('tablet')]: {
      maxWidth: 350,
      position: 'absolute',
      top: 0,
      left: state ? 0 : -400,
      height: '100dvh',
      boxShadow: `${theme.size(0.5)} 0px ${theme.size(0.5)} ${theme.color(
        theme.palette.accent.primary.contrast.high,
        'transparent',
        0.25,
      )}`
    },
    [theme.screen.down('mobile')]: {
      maxWidth: '100dvw',
      left: state ? 0 : '-101dvw',
      boxShadow: 'none',
      padding: 0,
    },
  }));

  const headerClass = useCss((theme) => ({
    display: 'none',
    backgroundColor: theme.color(
      theme.palette.accent.primary.color,
      theme.palette.accent.primary.contrast.low,
      0.15,
    ),
    borderBottom: `1px solid ${theme.palette.accent.primary.color}`,
    marginBottom: theme.size(1),

    [theme.screen.down('mobile')]: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.size(2),
    },
  }));

  const titleClass = useCss((theme) => ({
    color: theme.color(
      theme.palette.accent.primary.color,
      theme.palette.accent.primary.contrast.high,
      0.75,
    ),
  }));

  const buttonClass = useCss(() => ({
    justifyContent: 'flex-start',
  }));

  const emptyClass = useCss(() => ({
    opacity: 0.65,
  }));

  const handleChange = useCallback((v: string) => () => {
    onChange(v);
    toggle.off();
  }, [onChange, toggle]);

  const handleClickAway = useCallback(() => {
    toggle.off();
  }, [toggle]);

  return (
    <ClickAwayListener onClickAway={handleClickAway} disabled={!state}>
      <div className={rootClass}>
        <div className={headerClass}>
          <IconButton width={8} height={5} onClick={toggle}>
            <CloseIcon />
          </IconButton>

          <Text weight="black" size="large" className={titleClass}>
            {label}
          </Text>
        </div>

        {options.map((opt) => {
          return (
            <Button
              fullWidth
              key={opt.value}
              padding={[1, 2]}
              title={opt.label}
              className={buttonClass}
              variant={value === opt.value ? 'filled' : 'text'}
              onClick={handleChange(opt.value)}
            >
              <Text
                size="large"
                weight="bold"
                variant="code"
                className={cx(opt.empty && emptyClass)}
              >
                {'<'}{opt.label}{' />'}
              </Text>
            </Button>
          );
        })}
      </div>
    </ClickAwayListener>
  );
};

export default ComponentsList;

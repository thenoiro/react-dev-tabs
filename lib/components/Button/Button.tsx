import { useMemo } from 'react';

import { CssOffsetSizes } from 'theme';
import { cx } from 'utils/emotion';
import useCss from 'hooks/useCss.hook';
import FocusBox from 'components/FocusBox';

type ButtonVariant = 'text' | 'filled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  padding?: number | CssOffsetSizes;
  fullWidth?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    variant = 'text',
    padding,
    fullWidth,
    disabled,
    ...rest
  } = props;

  const pad: CssOffsetSizes | undefined = useMemo(() => {
    if (!padding) {
      return undefined;
    }
    if (typeof padding === 'number') {
      return [padding];
    }
    return padding;
  }, [padding]);

  const rootClass = useCss((theme) => ({
    all: 'unset',
    cursor: 'pointer',
    transitionDuration: '200ms',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    width: fullWidth ? '100%' : undefined,
    color: theme.palette.accent.primary.color,
    padding: !pad ? undefined : theme.size(...pad),
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    opacity: disabled ? 0.25 : 1,
    ...theme.text(),

    '&:hover': {
      cursor: disabled ? 'default' : undefined,
      backgroundColor: disabled ? undefined : theme.color(
        theme.palette.accent.primary.color,
        theme.palette.accent.primary.contrast.low,
        0.2,
      ),
      color: disabled ? undefined : theme.color(
        theme.palette.accent.primary.color,
        theme.palette.accent.primary.contrast.high,
      ),
    },
  }));

  const filledClass = useCss((theme) => ({
    backgroundColor: theme.palette.accent.primary.color,
    color: theme.palette.accent.primary.contrast.low,

    '&:hover': {
      color: theme.palette.accent.primary.contrast.low,
      backgroundColor: theme.color(
        theme.palette.accent.primary.color,
        theme.palette.accent.primary.contrast.high,
        0.75,
      ),
    },
  }));

  const classNames = cx(
    rootClass,
    variant === 'filled' && filledClass,
    className,
  );

  return (
    <FocusBox>
      <button
        {...rest}
        disabled={disabled}
        className={classNames}
      >
        {children}
      </button>
    </FocusBox>
  );
};

export default Button;

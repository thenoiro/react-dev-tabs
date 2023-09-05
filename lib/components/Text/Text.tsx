import useCss from 'hooks/useCss.hook';
import { cx } from 'utils/emotion';
import {
  TypographySize,
  TypographyVariant,
  TypographyWeight,
} from 'theme/typography';

interface TextProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight
}

const Text = (props: TextProps) => {
  const {
    children,
    title,
    className,
    variant = 'main',
    size = 'medium',
    weight = 'normal',
  } = props;

  const rootClass = useCss((theme) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...theme.text({ variant, size, weight }),
  }));

  return (
    <span className={cx(rootClass, className)} title={title}>
      {children}
    </span>
  );
};

export default Text;

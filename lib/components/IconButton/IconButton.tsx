import { cx } from 'utils/emotion';
import useCss from 'hooks/useCss.hook';
import Button, { ButtonProps } from 'components/Button';

interface IconButtonProps extends ButtonProps {
  size?: number;
  width?: number;
  height?: number;
}

const IconButton = (props: IconButtonProps) => {
  const {
    size = 5,
    width = size,
    height = size,
    className,
    ...rest
  } = props;

  const rootClass = useCss((theme) => ({
    width: theme.size(width),
    height: theme.size(height),
  }));

  return (
    <Button className={cx(className, rootClass)} {...rest} />
  );
};

export default IconButton;

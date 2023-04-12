import { classname as cx } from 'lib/utils';
import { Button } from 'lib/components';

const IconButton = (props) => {
  const { children, size = 40, className, ...rest } = props;

  return (
    <Button
      className={cx('dev-button', className)}
      {...rest}
      width={size}
      height={size}
      minWidth={size}
      borderRadius="50%"
    >
      {children}
    </Button>
  )
};

export default IconButton;

import { classname as cx } from 'lib/utils';
import { Btn } from 'lib/components';

const IconBtn = (props) => {
  const { children, size = 40, className, ...rest } = props;

  return (
    <Btn
      className={cx('dev-button', className)}
      {...rest}
      width={size}
      height={size}
      minWidth={size}
      borderRadius="50%"
    >
      {children}
    </Btn>
  )
};

export default IconBtn;

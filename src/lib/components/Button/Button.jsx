import { Box } from 'lib/components';

import './button.css';

const Button = (props) => {
  const { children, ...rest } = props;

  return (
    <Box className="dev-button" {...rest}>
      {children}
    </Box>
  )
};

export default Button;

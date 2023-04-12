import { Shell } from 'lib/components';

import './btn.css';

const Btn = (props) => {
  const { children, ...rest } = props;

  return (
    <Shell className="dev-button" {...rest}>
      {children}
    </Shell>
  );
};

export default Btn;

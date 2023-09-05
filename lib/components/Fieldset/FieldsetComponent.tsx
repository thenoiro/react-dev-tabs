import useCss from 'hooks/useCss.hook';

import { FieldsetComponentProps } from './FieldsetComponent.types';

const FieldsetComponent = (props: FieldsetComponentProps) => {
  const { children } = props;

  const rootClass = useCss((theme) => ({
    all: 'unset',
    display: 'flex',
    overflow: 'hidden',
    overflowX: 'auto',
    maxWidth: '100%',
    ...theme.scroll({ size: 10 }),
  }));

  return (
    <div className={rootClass}>
      {children}
    </div>
  );
};

export default FieldsetComponent;

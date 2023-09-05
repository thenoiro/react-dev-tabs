import useCss from 'hooks/useCss.hook';
import Button from 'components/Button';
import Text from 'components/Text';

interface TabProps {
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const Tab = (props: TabProps) => {
  const { children, active, onClick } = props;

  const rootClass = useCss(() => ({
    flexShrink: 0,
  }));

  return (
    <Button
      onClick={onClick}
      padding={[1.25, 1.5]}
      className={rootClass}
      variant={active ? 'filled' : 'text'}
    >
      <Text weight="bold">
        {children}
      </Text>
    </Button>
  );
};

export default Tab;

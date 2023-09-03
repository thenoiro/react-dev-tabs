import Button from 'components/Button';
import Text from 'components/Text';

interface TabProps {
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const Tab = (props: TabProps) => {
  const { children, active, onClick } = props;

  return (
    <Button
      onClick={onClick}
      padding={[1.25, 1.5]}
      variant={active ? 'filled' : 'text'}
    >
      <Text weight="bold">
        {children}
      </Text>
    </Button>
  );
};

export default Tab;

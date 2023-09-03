import { DevKitTabType } from 'types';
import useCss from 'hooks/useCss.hook';
import useListState from 'hooks/useListState.hook';
import useOverlapState from 'hooks/useOverlapState.hook';

import Text from 'components/Text';
import CloseIcon from 'components/CloseIcon';
import IconButton from 'components/IconButton';
import BurgerIcon from 'components/BurgetIcon';

interface HeaderProps {
  type?: DevKitTabType;
}

const size = 5;

const Header = (props: HeaderProps) => {
  const { type } = props;
  const { toggle } = useOverlapState();
  const { toggle: listToggle } = useListState();

  const rootClass = useCss((theme) => ({
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme.size(size),
    backgroundColor: theme.color(
      theme.palette.accent.primary.color,
      theme.palette.accent.primary.contrast.low,
      0.05,
    ),
  }));

  const titleClass = useCss((theme) => ({
    marginLeft: theme.size(2),
    color: theme.color(
      theme.palette.accent.primary.color,
      theme.palette.accent.primary.contrast.high,
      0.75,
    ),
  }));

  const toggleClass = useCss((theme) => ({
    [theme.screen.up('mobile')]: {
      display: 'none',
    },
  }));

  return (
    <div className={rootClass}>
      <IconButton
        width={8}
        height={5}
        onClick={listToggle}
        className={toggleClass}
        disabled={type !== 'components'}
      >
        <BurgerIcon />
      </IconButton>

      <Text weight="black" size="large" className={titleClass}>
        React Dev Tabs
      </Text>

      <IconButton
        width={8}
        height={5}
        onClick={toggle}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default Header;

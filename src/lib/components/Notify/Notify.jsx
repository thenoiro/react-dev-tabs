import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';

import { classname as cx } from 'lib/utils';
import Box from 'lib/components/Box';

import './notify.css';

const Notify = forwardRef((props, ref) => {
  const [container, setContainer] = useState(null);
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    setContainer(document?.body);
  }, []);

  const handleShow = useCallback((newText, options = {}) => {
    const { event } = options;
    setText(newText);
    setVisible(true);

    if (event) {
      setCoords({
        left: `${event.clientX + 5}px`,
        top: `${event.clientY + 5}px`,
      });
    }
  }, []);

  useEffect(() => {
    if (visible) {
      let mounted = true;

      setTimeout(() => {
        mounted && setVisible(false);
      }, 2000);

      return () => {
        mounted = false;
      };
    }
  }, [visible]);

  useImperativeHandle(ref, () => ({
    show: handleShow,
  }), [handleShow]);

  if (!container || !visible || !text) {
    return null;
  }
  const content = (
    <Box
      px={1}
      py={0.5}
      {...coords}
      position="fixed"
      zIndex={10929122929}
      className={cx('dev-notify-root', visible && 'dev-notify-visible')}
    >
      <strong>COPIED: </strong>
      <span>{text}</span>
    </Box>
  );
  return ReactDOM.createPortal(content, container);
});

export default Notify;

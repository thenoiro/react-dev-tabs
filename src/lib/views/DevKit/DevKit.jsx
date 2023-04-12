import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Modal } from 'lib/components';
import DevKitContent from 'lib/views/DevKitContent';

import './devKit.css';

const DevKit = (props) => {
  const [open, setOpen] = useState(false);
  const [container, setContainer] = useState(null);

  useEffect(() => {
    setContainer(document?.body || null);
  }, []);

  // Listen trigger keys (Left Shift + Right Shift)
  useEffect(() => {
    if (open) {
      return;
    }
    let shiftLeft = false;
    let shiftRight = false;

    const listenKeyDown = (e) => {
      switch (e.code) {
        case 'ShiftLeft':
          shiftLeft = true;
          break;
        case 'ShiftRight':
          shiftRight = true;
          break;
        default:
          break;
      }
      if (shiftLeft && shiftRight) {
        setOpen(true);
      }
    };
    const listenKeyUp = (e) => {
      switch (e.code) {
        case 'ShiftLeft':
          shiftLeft = false;
          break;
        case 'ShiftRight':
          shiftRight = false;
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', listenKeyDown);
    window.addEventListener('keyup', listenKeyUp);

    return () => {
      shiftLeft = false;
      shiftRight = false;
      window.removeEventListener('keydown', listenKeyDown);
      window.removeEventListener('keyup', listenKeyUp);
    };
  }, [open]);

  if (!container) {
    return null;
  }
  const children = (
    <div className="dev-root">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <DevKitContent open={open} {...props} />
      </Modal>
    </div>
  );
  return ReactDOM.createPortal(children, container);
};

export default DevKit;

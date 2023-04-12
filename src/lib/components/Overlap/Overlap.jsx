import { useCallback, useEffect } from 'react';

import { cross } from 'lib/assets';
import { classname } from 'lib/utils';
import { IconBtn, Shell } from 'lib/components';

import './overlap.css';

const Overlap = (props) => {
  const { open, onClose, children } = props;

  const rootClasses = classname('dev-modal-root', open && 'dev-modal-open');

  const handleRootClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      typeof onClose === 'function' && onClose(e);
    }
  }, [onClose]);

  useEffect(() => {
    if (open) {
      const listenCntrlEsc = (e) => {
        if (e.keyCode === 27 && e.ctrlKey) {
          typeof onClose === 'function' && onClose(e);
        }
      };
      window.addEventListener('keydown', listenCntrlEsc);

      return () => {
        window.removeEventListener('keydown', listenCntrlEsc);
      };
    }
  }, [open, onClose]);

  return (
    <div
      className={rootClasses}
      onClick={handleRootClick}
    >
      <div className="dev-modal-container">
        <IconBtn
          top="-15px"
          right="-15px"
          position="absolute"
          onClick={onClose}
          size={40}
        >
          <img src={cross} />
        </IconBtn>

        <Shell height="100%" overflow="hidden">
          {children}
        </Shell>
      </div>
    </div>
  );
};

export default Overlap;

import { useCallback, useEffect } from 'react';

import { cross } from 'lib/assets';
import { classname } from 'lib/utils';
import { IconBtn, Shell } from 'lib/components';

import './overlap.css';

const Overlap = (props) => {
  const { open, onClose, children, zIndex, viewport } = props;

  const rootClasses = classname('dev-modal-root', open && 'dev-modal-open');

  const width = viewport?.width || 'calc(100vw - 40px)';
  const height = viewport?.height || 'calc(100vh - 40px)';
  const top = viewport?.top || '20px';
  const left = viewport?.left || '20px';

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
    <Shell
      zIndex={zIndex}
      className={rootClasses}
      onClick={handleRootClick}
    >
      <Shell
        width={width}
        height={height}
        top={top}
        left={left}
        className="dev-modal-container"
      >
        <IconBtn
          top="5px"
          right="5px"
          position="absolute"
          onClick={onClose}
          size={40}
        >
          <img src={cross} />
        </IconBtn>

        <Shell height="100%" overflow="hidden">
          {children}
        </Shell>
      </Shell>
    </Shell>
  );
};

export default Overlap;

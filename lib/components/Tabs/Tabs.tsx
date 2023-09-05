import { useCallback, useEffect, useRef } from 'react';

import useCss from 'hooks/useCss.hook';
import Tab from 'components/Tab';

export type TabValue = number;

interface TabOption {
  label: string;
  value: TabValue;
}

interface TabsProps {
  options?: TabOption[];
  value?: TabValue,
  onChange?: (v: TabValue) => void;
}

const defaultOptions: TabOption[] = [];

const Tabs = (props: TabsProps) => {
  const {
    value,
    onChange,
    options = defaultOptions,
  } = props;

  const rootRef = useRef<HTMLDivElement|null>(null);
  const dragStateRef = useRef(false);

  const rootClass = useCss((theme) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    overflow: 'auto',
    flexShrink: 0,
    backgroundColor: theme.palette.accent.primary.contrast.low,
  }));

  // Drag scroll
  useEffect(() => {
    const { current: element } = rootRef;

    let mouseDown = false;
    let startX: number | null = null;
    let scrollX: number | null = null;

    const listenScrollStart = (e: MouseEvent) => {
      if (!element) {
        return;
      }
      mouseDown = true;
      startX = e.clientX;
      scrollX = element.scrollLeft;
    };

    const listenScroll = (e: MouseEvent) => {
      if (mouseDown && typeof startX === 'number' && element) {
        const offsetX = e.clientX - startX;

        if (Math.abs(offsetX) < 5) {
          return;
        }
        dragStateRef.current = true;

        if (element.scrollWidth < element.offsetWidth) {
          return;
        }
        if (scrollX === null) {
          return;
        }
        const newScrollX = scrollX - offsetX;
        element.scrollLeft = newScrollX;
      }
    };

    const listenScrollEnd = (e: MouseEvent) => {
      const isElement = !!element;
      const isTargetNode = e.target instanceof Node;
      const isInsideDom = isElement && isTargetNode;
      const isTargetInside = isInsideDom && element.contains(e.target);
      const isTheSameNode = isInsideDom && element === e.target;
      const preventClick = isTargetInside || isTheSameNode;

      if (!preventClick) {
        dragStateRef.current = false;
      }
      mouseDown = false;
      startX = null;
      scrollX = null;
    };

    if (element) {
      element.addEventListener('mousedown', listenScrollStart);
      window.addEventListener('mousemove', listenScroll);
      window.addEventListener('mouseup', listenScrollEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', listenScrollStart);
      }
      window.removeEventListener('mousemove', listenScroll);
      window.removeEventListener('mouseup', listenScrollEnd);
      dragStateRef.current = false;
      mouseDown = false;
      startX = null;
      scrollX = null;
    };
  }, []);

  const handleChange = useCallback((v: TabValue) => () => {
    if (onChange && !dragStateRef.current) {
      onChange(v);
    }
    dragStateRef.current = false;
  }, [onChange]);

  return (
    <div className={rootClass} ref={rootRef}>
      {options.map((opt) => {
        return (
          <Tab
            key={opt.value}
            active={value === opt.value}
            onClick={handleChange(opt.value)}
          >
            {opt.label}
          </Tab>
        );
      })}
    </div>
  );
};

export default Tabs;

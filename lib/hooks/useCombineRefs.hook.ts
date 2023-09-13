import { useCallback } from 'react';

type RefHandler = (el: HTMLElement) => void;
type RefObject = React.MutableRefObject<HTMLElement | null | undefined>;
type RefArg = RefHandler | RefObject;

type UseCombineRefsProps = RefArg[];

const useCombineRefs = (...props: UseCombineRefsProps) => {
  return useCallback((el: HTMLElement) => {
    props.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(el);
        return;
      }
      if (typeof ref === 'object') {
        ref.current = el;
        return;
      }
    });
  }, [props]);
};

export default useCombineRefs;

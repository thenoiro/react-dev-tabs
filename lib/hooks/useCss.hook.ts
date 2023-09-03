import { useMemo, useRef } from 'react';
import { CSSObject } from '@emotion/css';

import { ProjectTheme } from 'theme';
import { css } from 'utils/emotion';
import useTheme from 'hooks/useTheme.hook';

type UseCssArgs = CSSObject;
type UseCssCallback = (theme: ProjectTheme) => CSSObject;
type UseCssProps = UseCssArgs | UseCssCallback;
type UseCssHook = (props: UseCssProps) => string;

const initialHash = {
  hash: '',
  name: '',
};

const useCss: UseCssHook = (props: UseCssProps) => {
  const theme = useTheme();
  const stateRef = useRef({ ...initialHash });

  const defaultStyles = useMemo<CSSObject>(() => {
    return {
      boxSizing: 'border-box',
      ...theme.scroll(),
    };
  }, []);

  const cssProps = useMemo<CSSObject>(() => {
    if (typeof props === 'function') {
      const result = props(theme);

      return {
        ...defaultStyles,
        ...result,
      };
    }
    return {
      ...defaultStyles,
      ...props,
    };
  }, [defaultStyles, props, theme]);

  const className = useMemo(() => {
    const newHash = JSON.stringify(cssProps);

    if (stateRef.current.hash === newHash) {
      return stateRef.current.name;
    }
    const newName = css(cssProps);
    stateRef.current.hash = newHash;
    stateRef.current.name = newName;
    return newName;
  }, [cssProps]);

  return className;
};

export default useCss;

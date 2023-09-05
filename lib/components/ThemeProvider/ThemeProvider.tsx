import { createContext } from 'react';

import theme, { ProjectTheme, getProjectTheme } from 'theme';

const defaultProjectTheme = getProjectTheme(theme);
export const ThemeContext = createContext<ProjectTheme>(defaultProjectTheme);

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  return (
    <ThemeContext.Provider value={defaultProjectTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

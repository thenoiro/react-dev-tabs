import size, { ThemeSize } from './size';
import palette, { Palette } from './palette';
import typography, { Typography } from './typography';
import breakpoints, { Breakpoints } from './breakpoints';

export interface Theme {
  size: ThemeSize;
  palette: Palette;
  typography: Typography;
  breakpoints: Breakpoints;
}

const theme: Theme = {
  size,
  palette,
  typography,
  breakpoints,
};

export default theme;

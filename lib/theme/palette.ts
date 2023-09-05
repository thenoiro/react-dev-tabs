type Color = string;

interface BackgroundPalette {
  color: Color;
  contrast: Color;
}

interface BackgroundPaletteCollection {
  primary: BackgroundPalette;
  secondary: BackgroundPalette;
}

interface ContrastPalette {
  high: Color;
  low: Color;
}

interface AccentPalette {
  color: Color;
  contrast: ContrastPalette;
}

export interface AccentPaletteCollection {
  primary: AccentPalette;
  secondary: AccentPalette;
}

export interface Palette {
  background: BackgroundPaletteCollection;
  accent: AccentPaletteCollection;
}

const palette: Palette = {
  background: {
    primary: {
      color: '#FFFFFF',
      contrast: '#000000',
    },
    secondary: {
      color: '#ECEFF1',
      contrast: '#000000',
    },
  },
  accent: {
    primary: {
      color: '#303F9F',
      contrast: {
        high: '#000000',
        low: '#FFFFFF',
      },
    },
    secondary: {
      color: '#00796B',
      contrast: {
        high: '#000000',
        low: '#FFFFFF',
      },
    },
  },
};

export default palette;

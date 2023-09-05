import { CSSObject } from '@emotion/css';

export type TypographyVariant = 'main' | 'code' | 'body';
export type TypographySize = 'small' | 'medium' | 'large';
export type TypographyWeight = 'light' | 'normal' | 'bold' | 'black';

type TypographyCollection<Union extends string> = {
  [key in Union]: CSSObject;
}

interface TypographyVariantCollection {
  base: CSSObject;
  size: TypographyCollection<TypographySize>;
  weight: TypographyCollection<TypographyWeight>;
}

export type Typography = {
  [key in TypographyVariant]: TypographyVariantCollection;
}

const typography: Typography = {
  main: {
    base: {
      fontFamily: 'FreeSans, sans-serif',
      fontSize: 14,
      fontWeight: 500,
    },
    size: {
      small: {
        fontSize: 12,
      },
      medium: {},
      large: {
        fontSize: 16,
      },
    },
    weight: {
      light: {
        fontWeight: 300,
      },
      normal: {},
      bold: {
        fontWeight: 700,
      },
      black: {
        fontWeight: 900,
      },
    },
  },
  body: {
    base: {},
    size: {
      small: {},
      medium: {},
      large: {},
    },
    weight: {
      light: {},
      normal: {},
      bold: {},
      black: {},
    },
  },
  code: {
    base: {
      fontFamily: 'monospace',
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
    weight: {
      light: {},
      normal: {},
      bold: {},
      black: {},
    },
  },
};

export default typography;

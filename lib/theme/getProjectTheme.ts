import { CSSObject } from '@emotion/css';

import { Theme } from './theme';
import { BreakpointVariant } from './breakpoints';
import { AccentPaletteCollection } from './palette';
import { TypographySize, TypographyVariant, TypographyWeight } from './typography';

export type CssOffsetSizes = [number]
  | [number, number]
  | [number, number, number]
  | [number, number, number, number];

type SizeBuilder = (...args: CssOffsetSizes) => string;

type ColorMixer = (c1: string, c2?: string, p?: number) => string;

type ScrollOptions = {
  size?: number;
  color?: keyof AccentPaletteCollection;
}
type ScrollBuilder = (opts?: ScrollOptions) => CSSObject;

type TextOptions = {
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight
}
type TextBuilder = (opts?: TextOptions) => CSSObject;

type ScreenQueryBuilder = (v: BreakpointVariant) => string;
type ScreenQueryBuilders = {
  up: ScreenQueryBuilder;
  down: ScreenQueryBuilder;
}

export interface ProjectTheme extends Omit<Theme, 'size'> {
  size: SizeBuilder;
  color: ColorMixer;
  scroll: ScrollBuilder;
  text: TextBuilder;
  screen: ScreenQueryBuilders;
}

const getProjectTheme = (theme: Theme): ProjectTheme => {
  const size: SizeBuilder = (...args: CssOffsetSizes): string => {
    const [s1, s2, s3, s4] = args;

    const result = [s1, s2, s3, s4].reduce((acc: string[], s) => {
      if (typeof s === 'number' && Number.isFinite(s)) {
        return [...acc, `${s * theme.size.unit}px`];
      }
      return acc;
    }, []);

    return result.join(' ');
  };

  const color: ColorMixer = (c1, c2, p) => {
    const result: string[] = [];

    [c1, c2].forEach((c) => {
      if (c) {
        result.push(c);
      }
    });
    if (result.length === 0) {
      return '';
    }
    if (result.length === 1) {
      return result[0];
    }
    let power = 50;

    if (typeof p === 'number' && p >= 0 && p <= 1) {
      power = p * 100;
    }
    const [r1, r2] = result;
    return `color-mix(in srgb, ${r1} ${power}%, ${r2})`;
  };

  const scroll: ScrollBuilder = (opts) => {
    const w = opts?.size || 6;
    const c = opts?.color || 'primary';

    return {
      '&::-webkit-scrollbar': {
        width: `${w}px`,
        height: `${w}px`,
        backgroundColor: color(
          theme.palette.accent[c].color,
          theme.palette.accent[c].contrast.low,
        ),
      },
      '&::-webkit-scrollbar-thumb': {
        transitionDuration: '200ms',
        backgroundColor: color(
          theme.palette.accent[c].color,
          theme.palette.accent[c].contrast.high,
          0.75,
        ),
        borderRadius: `${w / 2}px`,
        border: `1px solid ${color(
          theme.palette.accent[c].color,
          theme.palette.accent[c].contrast.low,
        )}`,
        '&:hover': {
          backgroundColor: color(
            theme.palette.accent[c].color,
            theme.palette.accent[c].contrast.high,
            0.25,
          ),
        },
      },
    };
  };

  const text: TextBuilder = (opts) => {
    const variant = opts?.variant || 'main';
    const size = opts?.size || 'medium';
    const weight = opts?.weight || 'normal';

    return {
      ...theme.typography.main.base,
      ...theme.typography.main.size[size],
      ...theme.typography.main.weight[weight],
      ...theme.typography[variant].base,
      ...theme.typography[variant].size[size],
      ...theme.typography[variant].weight[weight],
    };
  };

  return {
    ...theme,
    size,
    color,
    scroll,
    text,
    screen: {
      down: (v) => `@media (max-width: ${theme.breakpoints[v]}px)`,
      up: (v) => {
        const screenRange: BreakpointVariant[] = ['mobile', 'tablet', 'desktop'];
        const targetIndex = screenRange.indexOf(v);
        const t = screenRange[targetIndex + 1];
        const screen = theme.breakpoints[t] || 0;
        return `@media (min-width: ${screen}px)`;
      },
    },
  };
};

export default getProjectTheme;

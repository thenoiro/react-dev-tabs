export type BreakpointVariant = 'mobile' | 'tablet' | 'desktop';

export type Breakpoints = {
  [key in BreakpointVariant]: number;
}

const breakpoints: Breakpoints = {
  mobile: 600,
  tablet: 900,
  desktop: 1200,
}

export default breakpoints;

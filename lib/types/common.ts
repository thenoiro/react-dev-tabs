export type TimeoutId = string | number | undefined | NodeJS.Timeout;

type Assets = 'assets';
type Components = 'components';
export type DevKitTabType = Assets | Components;

export interface DevKitTabBase {
  type: DevKitTabType;
  label: string;
  modules: () => Promise<unknown>;
}

export interface AssetsTab extends DevKitTabBase {
  type: Assets;
  size?: number;
}

export type ComponentVariant = 'inside' | 'outside';

export interface ComponentsTab extends DevKitTabBase {
  type: Components;
  variant?: ComponentVariant;
}

export interface RawComponentFunction {
  (...args: unknown[]): unknown;
}

export interface RawComponentConstructor {
  $$typeof: symbol;
}

export type RawComponentType = RawComponentFunction | RawComponentConstructor;

export interface RawComponentFunctionType extends RawComponentFunction {
  Demo?: RawComponentType;
}

export interface RawComponentConstructorType extends RawComponentConstructor {
  Demo?: RawComponentType;
}

export type RawComponent = RawComponentConstructorType | RawComponentFunctionType;

export type DemoComponent = () => React.ReactNode;

export interface LegacyDemoComponent extends RawComponentFunction {
  Demo: DemoComponent;
}

export type DevKitTab = AssetsTab | ComponentsTab;

import type { CSSProperties, Plugin } from 'vue';

export interface objTy {
  [propName: string]: any;
}

export type Nullable<T> = T | null;

export type SFCWithInstall<T> = T & Plugin;

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export type TimeoutHandle = ReturnType<typeof global.setTimeout>;
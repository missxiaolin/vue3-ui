export interface objTy {
  [propName: string]: any;
}

export type Nullable<T> = T | null;

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
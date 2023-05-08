export interface objTy {
  [propName: string]: any;
}

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
class UIError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'UIError';
  }
}

export function throwError(scope: string, m: string): never {
  throw new UIError(`[${scope}] ${m}`);
}

export function debugWarn(scope: string, message: string): void {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(new UIError(`[${scope}] ${message}`));
  }
}
export const keysOf = <T>(arr: T) => Object.keys(arr) as Array<keyof T>;

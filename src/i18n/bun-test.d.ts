declare module "bun:test" {
  export const describe: (name: string, fn: () => void) => void;
  export const test: (name: string, fn: () => void | Promise<void>) => void;
  export const expect: (v: unknown) => { toBe(x: unknown): void; toEqual(x: unknown): void };
}

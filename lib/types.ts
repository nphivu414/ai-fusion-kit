export type RecursiveNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type RecursiveNonNullable<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type NonNullableWithSelector<T, K extends keyof T> = T & {
  [KeyType in K]-?: NonNullable<T[KeyType]>;
};

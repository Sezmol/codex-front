export type ObjectEntries<T extends object> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

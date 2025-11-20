export type AsyncCache<K, V> = {
  get(key: K, loader: () => Promise<V>): Promise<V>;
  set(key: K, value: V): void;
  has(key: K): boolean;
  clear(): void;
};



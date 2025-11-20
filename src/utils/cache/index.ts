import type { AsyncCache } from './types';

export const createAsyncCache = <K, V>(): AsyncCache<K, V> => {
  const data = new Map<K, V>();
  const inflight = new Map<K, Promise<V>>();

  const get = async (key: K, loader: () => Promise<V>): Promise<V> => {
    if (data.has(key)) return data.get(key) as V;
    if (inflight.has(key)) return inflight.get(key) as Promise<V>;
    const promise = loader()
      .then((value) => {
        data.set(key, value);
        inflight.delete(key);
        return value;
      })
      .catch((err) => {
        inflight.delete(key);
        throw err;
      });
    inflight.set(key, promise);
    return promise;
  };

  const set = (key: K, value: V) => {
    data.set(key, value);
  };

  const has = (key: K) => data.has(key);
  const clear = () => {
    data.clear();
    inflight.clear();
  };

  return { get, set, has, clear };
};



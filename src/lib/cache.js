import cache from "memory-cache";
import Logger from "./logger";

export const checkCache = (key) => {
  const cached = cache.get(key);
  cached && Logger.log(`[CACHE] Returned cached response for \"${key}\"`);
  return cached;
};

export const cacheResult = (key, result) => {
  cache.put(key, result, 10000, (key) => {
    Logger.log(`[CACHE] Cached result for ${key}`);
  });
};

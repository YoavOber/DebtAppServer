import { RedisClientType, createClient } from "redis";

let redisClient: RedisClientType = createClient();

const initCacheClient = async () => {
  await redisClient.connect();
};

const clearCache = async () => {
  console.log("cache flushed");
  return await redisClient.flushDb();
};

export { clearCache, initCacheClient, redisClient };

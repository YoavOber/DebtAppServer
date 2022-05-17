import { RedisClientType, createClient } from "redis";

let redisClient: RedisClientType = createClient();

const initCache = async () => {
  require("./mongoose.extentions");
  await redisClient.connect();
};

const clearCache = async () => {
  return await redisClient.flushDb();
};

export { clearCache, initCache as initCacheClient, redisClient };

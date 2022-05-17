import mongoose from "mongoose";
import { initCacheClient } from "../cache/redisClient";

export const init = () => {
  initCacheClient();
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.TEST_MONGO_URL || "");
};

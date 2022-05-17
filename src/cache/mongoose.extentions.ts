import mongoose from "mongoose";
import { redisClient } from "./redisClient";

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = { key: "" }) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key);
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this);
  }
  const key = JSON.stringify({ ...this.getQuery(), collection: this.mongooseCollection.name });

  const cachedValue = await redisClient.hGet(this.hashKey, key);
  if (cachedValue) {
    console.log("serving from cache");
    const doc = JSON.parse(cachedValue);
    return Array.isArray(doc) ? doc.map((d) => new this.model(d)) : new this.model(doc);
  }
  const result = await exec.apply(this);
  await redisClient.hSet(this.hashKey, key, JSON.stringify(result));
  return result;
};

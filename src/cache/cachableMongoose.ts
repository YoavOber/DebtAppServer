import { RedisClientType, createClient } from "redis";

const client: RedisClientType = createClient({ url: "127.0.0.1:6379" });

// Query.prototype.cache = function (options = { key: "" }) {
//   this._cache = true;
//   this._hashKey = JSON.stringify(options.key);
//   return this;
// };

// Query.prototype.exec = function () {
//   if (!this._cache) {
//     return exec.apply(this); //,arguments
//   }
//   const key = JSON.stringify({ ...this.getQuery(), collection: this.mongooseCollection.name });

//   const cachedValue = await client.hGet(this._hashKey, key);
//   if (cachedValue) {
//     const doc = JSON.parse(cachedValue);
//     return Array.isArray(doc) ? doc.map((d) => new this.model(d)) : new this.model(doc);
//   }
//   const result = await exec.apply(this); //, arguments);
//   await client.hSet(this._hashKey, key, JSON.stringify(result));
//   return result;
// };

import { Query } from "mongoose";

declare module "Query" {
  function cache(option = { key: "" }): function;
  function exec(): function;
  let _cacheKey: string;
  let _cache: boolean;
}

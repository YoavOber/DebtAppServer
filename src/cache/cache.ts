import { RedisClientType } from "@redis/client";
import { createClient } from "redis";
const client: RedisClientType = createClient({ url: "127.0.0.1:6379" });

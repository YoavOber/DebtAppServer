declare global {
  interface CachableMongoose {
    cache(): void;
    execCached(): any;
  }
}
export {};

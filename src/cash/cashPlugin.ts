import { Schema, Query } from "mongoose";
import redisClient from "@cash/cashClient.js";
import crypto from "crypto";

declare module "mongoose" {
  interface Query<
    ResultType = any,
    DocType = any,
    THelpers = {},
    RawDocType = unknown,
    QueryOp = "find",
    TDocOverrides = Record<string, never>
  > {
    _cachedResult?: ResultType;
    _cacheKey?: string;
  }
}

function cachePlugin(schema: Schema, options: { ttl?: number }) {
  schema.pre<Query<any, any>>(/^find/, async function (next) {
    let key = JSON.stringify({
      collection: this.model.collection.name,
      query: this.getQuery(),
      projection: this.getOptions().projection,
      sort: this.getOptions().sort,
      skip: this.getOptions().skip,
      limit: this.getOptions().limit,
    });

    key = crypto.createHash("sha256").update(key).digest("hex");
    const cached = await redisClient.get(key);

    if (cached) {
      this._cachedResult = JSON.parse(cached);
      console.log("from cache");
      return next();
    }

    this._cacheKey = key;
    console.log("from db");

    next();
  });

    schema.post(/^find/, async function (docs, next) {

    if (this._cachedResult) {
      return next();
    }
    if (!this._cacheKey) return next();
    
    await redisClient.set(this._cacheKey as string, JSON.stringify(docs), {
      EX: options.ttl || 60,
    });

    next();
  });




}

export default cachePlugin;

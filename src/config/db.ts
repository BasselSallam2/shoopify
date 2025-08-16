import { redisConnectionOptions } from "@/cash/cashClient.js";
import mongoose from "mongoose";
import cache from "ts-cache-mongoose";

const connectDB = async (mongoURI: string): Promise<void> => {
  try {
    cache.init(mongoose, {
      defaultTTL: "60 seconds",
      engine: "redis",
      engineOptions: redisConnectionOptions() as any,
      debug: true,
    });
    await mongoose.connect(mongoURI , {maxPoolSize: 30 , minPoolSize: 5});


    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;

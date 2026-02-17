import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) {
    console.log("✅ MongoDB already connected");
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      console.log("⏳ Connecting to MongoDB...");
      
      cached.promise = mongoose.connect(MONGODB_URI, {
        dbName: "portfolio", // ishonch uchun db nomini ham beramiz
      });

    } catch (error) {
      console.error("❌ Initial MongoDB connection error:", error);
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected successfully");
    return cached.conn;
  } catch (error: any) {
    console.error("❌ MongoDB connection failed:");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Full error:", error);
    throw error;
  }
}

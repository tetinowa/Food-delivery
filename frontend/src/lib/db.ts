import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const cached = (global as { mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } }).mongoose ?? { conn: null, promise: null };
(global as { mongoose?: typeof cached }).mongoose = cached;

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

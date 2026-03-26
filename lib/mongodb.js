import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env");
}

let cached = global.__bepay_mongoose_cache;

if (!cached) {
  cached = global.__bepay_mongoose_cache = { conn: null, promise: null };
}

mongoose.connection.on("disconnected", () => {
  cached.conn    = null;
  cached.promise = null;
});

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

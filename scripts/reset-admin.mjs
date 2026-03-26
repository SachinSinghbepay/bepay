import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("❌ MONGODB_URI missing"); process.exit(1); }

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const ADMIN_EMAIL    = "admin@bepay.money";
const ADMIN_PASSWORD = "admin@2026";

async function run() {
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log("✅ Connected to MongoDB");

  const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  await User.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    { name: "Admin", email: ADMIN_EMAIL, password: hash, role: "BEPAY_CMS_ADMIN", isActive: true },
    { upsert: true, new: true }
  );

  console.log(`✅ Admin password reset → ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  await mongoose.disconnect();
}

run().catch((err) => { console.error("❌", err.message); process.exit(1); });

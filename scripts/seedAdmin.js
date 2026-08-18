/**
 * One-time script to create the admin user in MongoDB.
 * Run with: node scripts/seedAdmin.js
 *
 * Reads ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD from .env.local
 * Hashes the password with bcryptjs before storing — never stores plain text.
 */

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, trim: true, default: "Admin" },
  },
  { timestamps: true }
);

async function seedAdmin() {
  const { MONGODB_URI, ADMIN_SEED_EMAIL, ADMIN_SEED_PASSWORD } = process.env;

  if (!MONGODB_URI || !ADMIN_SEED_EMAIL || !ADMIN_SEED_PASSWORD) {
    console.error("Missing MONGODB_URI, ADMIN_SEED_EMAIL, or ADMIN_SEED_PASSWORD in .env.local");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB...");

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const existing = await User.findOne({ email: ADMIN_SEED_EMAIL.toLowerCase() });
  if (existing) {
    console.log("Admin user already exists with this email. No changes made.");
    await mongoose.disconnect();
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_SEED_PASSWORD, 12);

  await User.create({
    email: ADMIN_SEED_EMAIL.toLowerCase(),
    password: hashedPassword,
    name: "Admin",
  });

  console.log("✅ Admin user created successfully!");
  console.log(`Email: ${ADMIN_SEED_EMAIL}`);
  console.log("You can now log in at /x9k2-control-panel/login");

  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
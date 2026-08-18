import mongoose from "mongoose";

const SettingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "site_stats" },
    projectsDelivered: { type: Number, default: 0 },
    happyClients: { type: Number, default: 0 },
    yearsExperience: { type: Number, default: 0 },
    clientSatisfaction: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
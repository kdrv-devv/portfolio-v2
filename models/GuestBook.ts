import mongoose from "mongoose";

const GuestbookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: String,
  signatureUrl: String,
  approved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Guestbook ||
  mongoose.model("Guestbook", GuestbookSchema);

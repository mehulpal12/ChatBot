import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    userMessage: { type: String, required: true },
    aiResponse: { type: String, required: true },
  },
  { timestamps: true }
);

export const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
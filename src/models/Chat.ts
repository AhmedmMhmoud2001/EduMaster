import { Schema, model, Document, Types } from "mongoose";
export interface IChatMessage extends Document {
  senderId: Types.ObjectId;
  receiverId:Types.ObjectId;
  message: string;
  type: "text" | "image";
  createdAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String },
  type: { type: String, enum: ["text", "image"], default: "text" },
  createdAt: { type: Date, default: Date.now },
});

export default model<IChatMessage>("ChatMessage", chatMessageSchema);

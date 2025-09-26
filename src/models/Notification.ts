import { Schema, model, Document, Types } from "mongoose";
export interface INotification extends Document {
  userId: Types.ObjectId;
  message: string;
  read: boolean;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default model<INotification>("Notification", notificationSchema);

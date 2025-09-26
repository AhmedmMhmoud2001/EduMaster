import { Schema, model, Document ,Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  stage: string;     // المرحلة
  semester: string;  // الفصل
  subject: string;   // المادة
  role: "student" | "teacher" | "admin";
  createdAt: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  stage: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
  createdAt: { type: Date, default: Date.now },

  // ✅ لإعادة التعيين
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});


export default model<IUser>("User", userSchema);

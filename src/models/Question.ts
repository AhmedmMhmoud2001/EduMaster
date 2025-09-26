import { Schema, model, Document, Types } from "mongoose";
export interface IQuestion extends Document {
  text: string;
  type: "mcq" | "essay" | "truefalse";
  options?: string[];
  answer: string;
  stageId: Types.ObjectId;
  semesterId: Types.ObjectId;
  subjectId: Types.ObjectId;
}

const questionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  type: { type: String, enum: ["mcq", "essay", "truefalse"], required: true },
  options: [String],
  answer: { type: String, required: true },
  stageId: { type: Schema.Types.ObjectId, ref: "Stage", required: true },
  semesterId: { type: Schema.Types.ObjectId, ref: "Semester", required: true },
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
});

export default model<IQuestion>("Question", questionSchema);

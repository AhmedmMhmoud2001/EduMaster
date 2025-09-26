import { Schema, model, Document, Types } from "mongoose";
export interface IExam extends Document {
  title: string;
  questions: string[];
  duration: number; // minutes
  stageId: Types.ObjectId;
  semesterId: Types.ObjectId;
  subjectId: Types.ObjectId;
  createdAt: Date;
}

const examSchema = new Schema<IExam>({
  title: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  duration: { type: Number, required: true },
  stageId: { type: Schema.Types.ObjectId, ref: "Stage", required: true },
  semesterId: { type: Schema.Types.ObjectId, ref: "Semester", required: true },
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IExam>("Exam", examSchema);

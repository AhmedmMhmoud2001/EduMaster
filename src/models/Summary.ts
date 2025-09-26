import { Schema, model, Document, Types } from "mongoose";
export interface ISummary extends Document {
  title: string;
  fileUrl: string; // Google Drive / S3 Link
  stageId: Types.ObjectId;
  semesterId: Types.ObjectId;
  subjectId: Types.ObjectId;
  createdAt: Date;
}

const summarySchema = new Schema<ISummary>({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  stageId: { type: Schema.Types.ObjectId, ref: "Stage", required: true },
  semesterId: { type: Schema.Types.ObjectId, ref: "Semester", required: true },
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<ISummary>("Summary", summarySchema);

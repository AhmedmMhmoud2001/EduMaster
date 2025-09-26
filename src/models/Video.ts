import { Schema, model, Document, Types } from "mongoose";
export interface IVideo extends Document {
  title: string;
  url: string;     // YouTube Link
  stageId: Types.ObjectId;
  semesterId: Types.ObjectId;
  subjectId: Types.ObjectId;
  createdAt: Date;
}

const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  stageId: { type: Schema.Types.ObjectId, ref: "Stage", required: true },
  semesterId: { type: Schema.Types.ObjectId, ref: "Semester", required: true },
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IVideo>("Video", videoSchema);

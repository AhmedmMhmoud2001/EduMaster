import { Schema, model, Document, Types } from "mongoose";

export interface ISubject extends Document {
  stageId: Types.ObjectId;
  name: string; // رياضيات – علوم – لغة عربية...
}

const subjectSchema = new Schema<ISubject>({
  stageId: { type: Schema.Types.ObjectId, ref: "Stage", required: true },
  name: { type: String, required: true },
});

export default model<ISubject>("Subject", subjectSchema);

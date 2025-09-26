import { Schema, model, Document, Types } from "mongoose";
export interface ISemester extends Document {
  stageId: Types.ObjectId;
  name: string; // الفصل الأول – الثاني
}

const semesterSchema = new Schema<ISemester>({
  stageId: { type: Schema.Types.ObjectId, ref: "Stage", required: true },
  name: { type: String, required: true },
});

export default model<ISemester>("Semester", semesterSchema);

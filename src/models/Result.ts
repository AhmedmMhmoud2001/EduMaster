import { Schema, model, Document, Types } from "mongoose";
export interface IResult extends Document {
  userId: Types.ObjectId;
  examId: Types.ObjectId;
  score: number;
  submittedAt: Date;
}

const resultSchema = new Schema<IResult>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
  score: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export default model<IResult>("Result", resultSchema);

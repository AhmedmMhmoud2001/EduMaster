import { Schema, model, Document } from "mongoose";

export interface IStage extends Document {
  name: string; // ابتدائي – إعدادي – ثانوي
}

const stageSchema = new Schema<IStage>({
  name: { type: String, required: true },
});

export default model<IStage>("Stage", stageSchema);

import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPlaylist extends Document {
  title: string;         // اسم قائمة التشغيل (مثال: "الوحدة الأولى - رياضيات")
  description?: string;  // وصف اختياري
  stageId: Types.ObjectId;       
  semesterId: Types.ObjectId;    
  subjectId: Types.ObjectId;     
  videos: { title: string; url: string }[]; // الفيديوهات داخل القائمة
  createdAt: Date;
}

const PlaylistSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    stageId: { type: Schema.Types.ObjectId, ref: "Stage"},
    semesterId: { type: Schema.Types.ObjectId, ref: "Stage"},
    subjectId: { type: Schema.Types.ObjectId, ref: "Stage" },
    videos: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IPlaylist>("Playlist", PlaylistSchema);

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

const startServer = async () => {
  try {
    // ✅ الاتصال بقاعدة البيانات
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected...");

    // ✅ تشغيل السيرفر محليًا فقط
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

startServer();

// ✅ Vercel يحتاج export
export default app;

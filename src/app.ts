import * as express from "express";
import * as cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import playlistRoutes from "./routes/playlistRoutes";






const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 100, // أقصى عدد Requests
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/playlists", playlistRoutes);

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("EduMaster Backend is running 🚀");
});

export default app;

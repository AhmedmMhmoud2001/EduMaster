"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var helmet_1 = require("helmet");
var express_rate_limit_1 = require("express-rate-limit");
var authRoutes_1 = require("./routes/authRoutes");
var userRoutes_1 = require("./routes/userRoutes");
var dashboardRoutes_1 = require("./routes/dashboardRoutes");
var playlistRoutes_1 = require("./routes/playlistRoutes");
var app = express();
// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    max: 100, // أقصى عدد Requests
}));
// ✅ Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.use("/api/dashboard", dashboardRoutes_1.default);
app.use("/api/playlists", playlistRoutes_1.default);
// ✅ Health Check
app.get("/", function (req, res) {
    res.send("EduMaster Backend is running 🚀");
});
exports.default = app;

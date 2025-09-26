"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stage: { type: String, required: true },
    semester: { type: String, required: true },
    subject: { type: String, required: true },
    role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
    createdAt: { type: Date, default: Date.now },
    // ✅ لإعادة التعيين
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
});
exports.default = (0, mongoose_1.model)("User", userSchema);

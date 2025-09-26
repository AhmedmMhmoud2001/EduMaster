"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var chatMessageSchema = new mongoose_1.Schema({
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String },
    type: { type: String, enum: ["text", "image"], default: "text" },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)("ChatMessage", chatMessageSchema);

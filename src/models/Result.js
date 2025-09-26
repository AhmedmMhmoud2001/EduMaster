"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var resultSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    examId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Exam", required: true },
    score: { type: Number, required: true },
    submittedAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)("Result", resultSchema);

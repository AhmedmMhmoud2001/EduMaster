"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var examSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    questions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Question" }],
    duration: { type: Number, required: true },
    stageId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Stage", required: true },
    semesterId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Semester", required: true },
    subjectId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Subject", required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.default = (0, mongoose_1.model)("Exam", examSchema);

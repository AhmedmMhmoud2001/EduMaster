"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var questionSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    type: { type: String, enum: ["mcq", "essay", "truefalse"], required: true },
    options: [String],
    answer: { type: String, required: true },
    stageId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Stage", required: true },
    semesterId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Semester", required: true },
    subjectId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Subject", required: true },
});
exports.default = (0, mongoose_1.model)("Question", questionSchema);

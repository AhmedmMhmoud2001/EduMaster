"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var subjectSchema = new mongoose_1.Schema({
    stageId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Stage", required: true },
    name: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)("Subject", subjectSchema);

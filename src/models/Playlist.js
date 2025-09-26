"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PlaylistSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    stageId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Stage" },
    semesterId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Stage" },
    subjectId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Stage" },
    videos: [
        {
            title: { type: String, required: true },
            url: { type: String, required: true }
        }
    ]
}, { timestamps: true });
exports.default = mongoose_1.default.model("Playlist", PlaylistSchema);

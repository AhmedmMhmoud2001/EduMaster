"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var playlistController_1 = require("../controllers/playlistController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var playlistController_2 = require("../controllers/playlistController");
var router = (0, express_1.Router)();
// الطالب يشوف قوائم التشغيل
router.get("/", authMiddleware_1.authMiddleware, playlistController_1.getPlaylists);
// الطالب يفتح Playlist محددة
router.get("/:id", authMiddleware_1.authMiddleware, playlistController_1.getPlaylistById);
// أدمين يعمل Playlist جديدة
router.post("/", authMiddleware_1.authMiddleware, playlistController_1.createPlaylist);
// فيديو محدد داخل Playlist
router.get("/:playlistId/videos/:videoIndex", authMiddleware_1.authMiddleware, playlistController_1.getVideoById);
// إضافة فيديو داخل Playlist
router.post("/:playlistId/videos", authMiddleware_1.authMiddleware, playlistController_2.addVideoToPlaylist);
// حذف فيديو من Playlist
router.delete("/:playlistId/videos/:videoIndex", authMiddleware_1.authMiddleware, playlistController_2.deleteVideoFromPlaylist);
exports.default = router;

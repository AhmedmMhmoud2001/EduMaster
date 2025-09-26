import { Router } from "express";
import { getPlaylists, getPlaylistById, createPlaylist , getVideoById } from "../controllers/playlistController";
import { authMiddleware } from "../middleware/authMiddleware";
import { addVideoToPlaylist, deleteVideoFromPlaylist } from "../controllers/playlistController";






const router = Router();

// الطالب يشوف قوائم التشغيل
router.get("/", authMiddleware, getPlaylists);

// الطالب يفتح Playlist محددة
router.get("/:id", authMiddleware, getPlaylistById);

// أدمين يعمل Playlist جديدة
router.post("/", authMiddleware, createPlaylist);

// فيديو محدد داخل Playlist
router.get("/:playlistId/videos/:videoIndex", authMiddleware, getVideoById);
// إضافة فيديو داخل Playlist
router.post("/:playlistId/videos", authMiddleware, addVideoToPlaylist);

// حذف فيديو من Playlist
router.delete("/:playlistId/videos/:videoIndex", authMiddleware, deleteVideoFromPlaylist);

export default router;

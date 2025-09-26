import { Request, Response } from "express";
import Playlist from "../models/Playlist";
import User from "../models/User";

// ✅ Get all playlists (حسب المرحلة/الفصل/المادة للطالب)
export const getPlaylists = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });

    const playlists = await Playlist.find({
      stage: user.stage,
      semester: user.semester,
      subject: user.subject,
    });

    return res.status(200).json({ playlists });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};

// ✅ Get single playlist (عرض الفيديوهات)
export const getPlaylistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findById(id);

    if (!playlist) return res.status(404).json({ message: "القائمة غير موجودة" });

    return res.status(200).json({ playlist });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};

// ✅ Admin – Create new playlist
export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const { title, description, stage, semester, subject, videos } = req.body;

    const playlist = new Playlist({
      title,
      description,
      stage,
      semester,
      subject,
      videos,
    });

    await playlist.save();

    return res.status(201).json({ message: "تم إنشاء القائمة بنجاح", playlist });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};


// ✅ Get single video from playlist
export const getVideoById = async (req: Request, res: Response) => {
  try {
    const { playlistId, videoIndex } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: "القائمة غير موجودة" });

    const video = playlist.videos[parseInt(videoIndex)];
    if (!video) return res.status(404).json({ message: "الفيديو غير موجود" });

    return res.status(200).json({ video });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};

// ✅ إضافة فيديو جديد ل Playlist
export const addVideoToPlaylist = async (req: Request, res: Response) => {
  try {
    const { playlistId } = req.params;
    const { title, url } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: "القائمة غير موجودة" });

    playlist.videos.push({ title, url });
    await playlist.save();

    return res.status(201).json({ message: "تمت إضافة الفيديو بنجاح", playlist });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};

// ✅ حذف فيديو من Playlist
export const deleteVideoFromPlaylist = async (req: Request, res: Response) => {
  try {
    const { playlistId, videoIndex } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: "القائمة غير موجودة" });

    if (!playlist.videos[parseInt(videoIndex)]) {
      return res.status(404).json({ message: "الفيديو غير موجود" });
    }

    playlist.videos.splice(parseInt(videoIndex), 1); // حذف الفيديو
    await playlist.save();

    return res.status(200).json({ message: "تم حذف الفيديو بنجاح", playlist });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};


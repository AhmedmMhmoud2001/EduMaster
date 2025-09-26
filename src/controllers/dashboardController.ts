import { Request, Response } from "express";
import User from "../models/User";
import Notification from "../models/Notification";
import Playlist from "../models/Playlist";
import Summary from "../models/Summary";
import Question from "../models/Question";
import Exam from "../models/Exam";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });

    const filter = {
      stageId: user.stage,
      semesterId: user.semester,
      subjectId: user.subject,
    };

    // ✅ الأعداد
    const totalPlaylists = await Playlist.countDocuments(filter);
    const totalSummaries = await Summary.countDocuments(filter);
    const totalQuestions = await Question.countDocuments(filter);
    const totalExams = await Exam.countDocuments(filter);
    const totalNotifications = await Notification.countDocuments({ userId });

    return res.status(200).json({
      message: "Dashboard loaded",
      profile: {
        name: user.name,
        stage: user.stage,
        semester: user.semester,
        subject: user.subject,
      },
      cards: [
        {
          title: "الفيديوهات التعليمية",
          icon: "/icons/videos.png",
          totalCount: totalPlaylists,
          viewAllLink: "/playlists"
        },
        {
          title: "الملخصات",
          icon: "/icons/summaries.png",
          totalCount: totalSummaries,
          viewAllLink: "/summaries"
        },
        {
          title: "بنك الأسئلة",
          icon: "/icons/questions.png",
          totalCount: totalQuestions,
          viewAllLink: "/questions"
        },
        {
          title: "الامتحانات",
          icon: "/icons/exams.png",
          totalCount: totalExams,
          viewAllLink: "/exams"
        },
        {
          title: "الإشعارات",
          icon: "/icons/notifications.png",
          totalCount: totalNotifications,
          viewAllLink: "/notifications"
        }
      ]
    });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};

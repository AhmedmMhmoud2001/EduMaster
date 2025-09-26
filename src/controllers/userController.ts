import { Request, Response } from "express";
import User from "../models/User";
// ✅ Update Stage, Semester, Subject
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { stage, semester, subject } = req.body;
    const userId = (req as any).user.id; // جاي من Middleware Auth

    const user = await User.findByIdAndUpdate(
      userId,
      { stage, semester, subject },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });

    return res.status(200).json({
      message: "تم تحديث البيانات بنجاح",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};


// ✅ Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // استبعاد الباسورد
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};

// ✅ Get single user
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};

// ✅ Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });

    return res.status(200).json({ message: "تم حذف المستخدم بنجاح" });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};
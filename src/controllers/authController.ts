import { Request, Response } from "express";
import crypto from "crypto";
import User from "../models/User";
import { transporter } from "../config/email";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";

// ✅ Sign Up
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, stage, semester, subject } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "البريد مستخدم بالفعل" });

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
      stage,
      semester,
      subject,
    });

    return res.status(201).json({
      message: "تم إنشاء الحساب بنجاح",
      token: generateToken(user.id),
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};

// ✅ Sign In
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "الحساب غير موجود" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "كلمة المرور غير صحيحة" });

    return res.status(200).json({
      message: "تم تسجيل الدخول بنجاح",
      token: generateToken(user.id),
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};


// ✅ Forget Password - send reset link
export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "الحساب غير موجود" });

    // إنشاء توكن خاص لإعادة التعيين
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // خزن التوكن مؤقتاً في المستخدم
    user.set("resetPasswordToken", resetToken);
    user.set("resetPasswordExpires", Date.now() + 3600000); // صالح لمدة ساعة
    await user.save();

    // إرسال الإيميل
    await transporter.sendMail({
      from: `"EduMaster" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "إعادة تعيين كلمة المرور",
      html: `
        <h3>مرحبا ${user.name}</h3>
        <p>اضغط على الرابط التالي لإعادة تعيين كلمة المرور:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>الرابط صالح لمدة ساعة واحدة فقط.</p>
      `,
    });

    return res.status(200).json({ message: "تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني" });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
};

// ✅ Reset Password - change user password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // التأكد من الصلاحية
    });

    if (!user) return res.status(400).json({ message: "الرابط غير صالح أو منتهي" });

    // تحديث كلمة المرور
    user.password = await hashPassword(newPassword);
    user.set("resetPasswordToken", undefined);
    user.set("resetPasswordExpires", undefined);
    await user.save();

    return res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح" });
  } catch (error) {
    return res.status(500).json({ message: "خطأ في السيرفر", error });
  }
}; 


import * as nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // أو أي SMTP Provider
  auth: {
    user: process.env.EMAIL_USER, // بريدك
    pass: process.env.EMAIL_PASS, // باسورد التطبيق (App Password)
  },
});

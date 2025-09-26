"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
var nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    service: "gmail", // أو أي SMTP Provider
    auth: {
        user: process.env.EMAIL_USER, // بريدك
        pass: process.env.EMAIL_PASS, // باسورد التطبيق (App Password)
    },
});

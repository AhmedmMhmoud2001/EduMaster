"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.login = exports.register = void 0;
var crypto = require("crypto");
var User_1 = require("../models/User");
var email_1 = require("../config/email");
var auth_1 = require("../utils/auth");
// ✅ Sign Up
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, stage, semester, subject, existing, hashed, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password, stage = _a.stage, semester = _a.semester, subject = _a.subject;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                existing = _b.sent();
                if (existing)
                    return [2 /*return*/, res.status(400).json({ message: "البريد مستخدم بالفعل" })];
                return [4 /*yield*/, (0, auth_1.hashPassword)(password)];
            case 2:
                hashed = _b.sent();
                return [4 /*yield*/, User_1.default.create({
                        name: name_1,
                        email: email,
                        password: hashed,
                        stage: stage,
                        semester: semester,
                        subject: subject,
                    })];
            case 3:
                user = _b.sent();
                return [2 /*return*/, res.status(201).json({
                        message: "تم إنشاء الحساب بنجاح",
                        token: (0, auth_1.generateToken)(user.id),
                        user: user,
                    })];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: "خطأ في السيرفر", error: error_1 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
// ✅ Sign In
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isMatch, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "الحساب غير موجود" })];
                return [4 /*yield*/, (0, auth_1.comparePassword)(password, user.password)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch)
                    return [2 /*return*/, res.status(400).json({ message: "كلمة المرور غير صحيحة" })];
                return [2 /*return*/, res.status(200).json({
                        message: "تم تسجيل الدخول بنجاح",
                        token: (0, auth_1.generateToken)(user.id),
                        user: user,
                    })];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: "خطأ في السيرفر", error: error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// ✅ Forget Password - send reset link
var forgetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, resetToken, resetLink, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = req.body.email;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "الحساب غير موجود" })];
                resetToken = crypto.randomBytes(32).toString("hex");
                resetLink = "".concat(process.env.FRONTEND_URL, "/reset-password/").concat(resetToken);
                // خزن التوكن مؤقتاً في المستخدم
                user.set("resetPasswordToken", resetToken);
                user.set("resetPasswordExpires", Date.now() + 3600000); // صالح لمدة ساعة
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                // إرسال الإيميل
                return [4 /*yield*/, email_1.transporter.sendMail({
                        from: "\"EduMaster\" <".concat(process.env.EMAIL_USER, ">"),
                        to: email,
                        subject: "إعادة تعيين كلمة المرور",
                        html: "\n        <h3>\u0645\u0631\u062D\u0628\u0627 ".concat(user.name, "</h3>\n        <p>\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0644\u064A \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631:</p>\n        <a href=\"").concat(resetLink, "\" target=\"_blank\">").concat(resetLink, "</a>\n        <p>\u0627\u0644\u0631\u0627\u0628\u0637 \u0635\u0627\u0644\u062D \u0644\u0645\u062F\u0629 \u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629 \u0641\u0642\u0637.</p>\n      "),
                    })];
            case 3:
                // إرسال الإيميل
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني" })];
            case 4:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: "خطأ في السيرفر", error: error_3 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.forgetPassword = forgetPassword;
// ✅ Reset Password - change user password
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, newPassword, user, _b, error_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, token = _a.token, newPassword = _a.newPassword;
                return [4 /*yield*/, User_1.default.findOne({
                        resetPasswordToken: token,
                        resetPasswordExpires: { $gt: Date.now() }, // التأكد من الصلاحية
                    })];
            case 1:
                user = _c.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ message: "الرابط غير صالح أو منتهي" })];
                // تحديث كلمة المرور
                _b = user;
                return [4 /*yield*/, (0, auth_1.hashPassword)(newPassword)];
            case 2:
                // تحديث كلمة المرور
                _b.password = _c.sent();
                user.set("resetPasswordToken", undefined);
                user.set("resetPasswordExpires", undefined);
                return [4 /*yield*/, user.save()];
            case 3:
                _c.sent();
                return [2 /*return*/, res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح" })];
            case 4:
                error_4 = _c.sent();
                return [2 /*return*/, res.status(500).json({ message: "خطأ في السيرفر", error: error_4 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;

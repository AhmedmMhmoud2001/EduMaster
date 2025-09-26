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
exports.deleteVideoFromPlaylist = exports.addVideoToPlaylist = exports.getVideoById = exports.createPlaylist = exports.getPlaylistById = exports.getPlaylists = void 0;
var Playlist_1 = require("../models/Playlist");
var User_1 = require("../models/User");
// ✅ Get all playlists (حسب المرحلة/الفصل/المادة للطالب)
var getPlaylists = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, playlists, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.user.id;
                return [4 /*yield*/, User_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "المستخدم غير موجود" })];
                return [4 /*yield*/, Playlist_1.default.find({
                        stage: user.stage,
                        semester: user.semester,
                        subject: user.subject,
                    })];
            case 2:
                playlists = _a.sent();
                return [2 /*return*/, res.status(200).json({ playlists: playlists })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: "خطأ في السيرفر", error: error_1 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPlaylists = getPlaylists;
// ✅ Get single playlist (عرض الفيديوهات)
var getPlaylistById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, playlist, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Playlist_1.default.findById(id)];
            case 1:
                playlist = _a.sent();
                if (!playlist)
                    return [2 /*return*/, res.status(404).json({ message: "القائمة غير موجودة" })];
                return [2 /*return*/, res.status(200).json({ playlist: playlist })];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: "خطأ في السيرفر", error: error_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPlaylistById = getPlaylistById;
// ✅ Admin – Create new playlist
var createPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, stage, semester, subject, videos, playlist, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, description = _a.description, stage = _a.stage, semester = _a.semester, subject = _a.subject, videos = _a.videos;
                playlist = new Playlist_1.default({
                    title: title,
                    description: description,
                    stage: stage,
                    semester: semester,
                    subject: subject,
                    videos: videos,
                });
                return [4 /*yield*/, playlist.save()];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(201).json({ message: "تم إنشاء القائمة بنجاح", playlist: playlist })];
            case 2:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: "خطأ في السيرفر", error: error_3 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPlaylist = createPlaylist;
// ✅ Get single video from playlist
var getVideoById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, playlistId, videoIndex, playlist, video, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.params, playlistId = _a.playlistId, videoIndex = _a.videoIndex;
                return [4 /*yield*/, Playlist_1.default.findById(playlistId)];
            case 1:
                playlist = _b.sent();
                if (!playlist)
                    return [2 /*return*/, res.status(404).json({ message: "القائمة غير موجودة" })];
                video = playlist.videos[parseInt(videoIndex)];
                if (!video)
                    return [2 /*return*/, res.status(404).json({ message: "الفيديو غير موجود" })];
                return [2 /*return*/, res.status(200).json({ video: video })];
            case 2:
                error_4 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: "خطأ في السيرفر", error: error_4 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getVideoById = getVideoById;
// ✅ إضافة فيديو جديد ل Playlist
var addVideoToPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var playlistId, _a, title, url, playlist, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                playlistId = req.params.playlistId;
                _a = req.body, title = _a.title, url = _a.url;
                return [4 /*yield*/, Playlist_1.default.findById(playlistId)];
            case 1:
                playlist = _b.sent();
                if (!playlist)
                    return [2 /*return*/, res.status(404).json({ message: "القائمة غير موجودة" })];
                playlist.videos.push({ title: title, url: url });
                return [4 /*yield*/, playlist.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(201).json({ message: "تمت إضافة الفيديو بنجاح", playlist: playlist })];
            case 3:
                error_5 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: "خطأ في السيرفر", error: error_5 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addVideoToPlaylist = addVideoToPlaylist;
// ✅ حذف فيديو من Playlist
var deleteVideoFromPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, playlistId, videoIndex, playlist, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.params, playlistId = _a.playlistId, videoIndex = _a.videoIndex;
                return [4 /*yield*/, Playlist_1.default.findById(playlistId)];
            case 1:
                playlist = _b.sent();
                if (!playlist)
                    return [2 /*return*/, res.status(404).json({ message: "القائمة غير موجودة" })];
                if (!playlist.videos[parseInt(videoIndex)]) {
                    return [2 /*return*/, res.status(404).json({ message: "الفيديو غير موجود" })];
                }
                playlist.videos.splice(parseInt(videoIndex), 1); // حذف الفيديو
                return [4 /*yield*/, playlist.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: "تم حذف الفيديو بنجاح", playlist: playlist })];
            case 3:
                error_6 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: "خطأ في السيرفر", error: error_6 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteVideoFromPlaylist = deleteVideoFromPlaylist;

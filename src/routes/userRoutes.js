"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = (0, express_1.Router)();
router.put("/update-profile", authMiddleware_1.authMiddleware, userController_1.updateUserProfile);
// عرض جميع المستخدمين
router.get("/", authMiddleware_1.authMiddleware, userController_1.getAllUsers);
// عرض مستخدم واحد
router.get("/:id", authMiddleware_1.authMiddleware, userController_1.getUserById);
// حذف مستخدم
router.delete("/:id", authMiddleware_1.authMiddleware, userController_1.deleteUser);
exports.default = router;

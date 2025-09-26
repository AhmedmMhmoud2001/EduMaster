"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dashboardController_1 = require("../controllers/dashboardController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = (0, express_1.Router)();
router.get("/", authMiddleware_1.authMiddleware, dashboardController_1.getDashboard);
exports.default = router;

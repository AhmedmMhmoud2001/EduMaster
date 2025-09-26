"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jwt = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET || "supersecret";
var authMiddleware = function (req, res, next) {
    var _a;
    var token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "ممنوع الدخول، لا يوجد توكن" });
    try {
        var decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "التوكن غير صالح" });
    }
};
exports.authMiddleware = authMiddleware;

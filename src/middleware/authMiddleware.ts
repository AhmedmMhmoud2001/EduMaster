import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "ممنوع الدخول، لا يوجد توكن" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "التوكن غير صالح" });
  }
};

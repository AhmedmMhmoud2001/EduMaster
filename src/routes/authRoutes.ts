import { Router } from "express";
import { register, login, forgetPassword} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forget-password", forgetPassword);

export default router;

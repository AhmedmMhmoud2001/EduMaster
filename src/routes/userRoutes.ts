import { Router } from "express";
import { updateUserProfile ,getAllUsers ,getUserById ,deleteUser} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();


router.put("/update-profile", authMiddleware, updateUserProfile);
// عرض جميع المستخدمين
router.get("/", authMiddleware, getAllUsers);

// عرض مستخدم واحد
router.get("/:id", authMiddleware, getUserById);

// حذف مستخدم
router.delete("/:id", authMiddleware, deleteUser);

export default router;
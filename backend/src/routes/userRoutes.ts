import { Router } from "express";
import {
  createUser,
  deleteUser,
  GetAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";
const router = Router();

router.post("/users/create", createUser);
router.get("/users", GetAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id/delete", deleteUser);
router.put("/users/:id/update", updateUser);

export default router;

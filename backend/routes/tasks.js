import express from "express";
import { addTask, getTasks, deleteTask, getTask, updateTask} from "../controller/tasksCon.js";
import { authenticate } from "../Middleware/auth.js";

const router = express.Router();

router.get("/", authenticate, getTasks);
router.get("/:id", getTask);
router.post("/", authenticate, addTask);
router.delete("/:id", deleteTask);
router.post("/:id", updateTask);

export default router;
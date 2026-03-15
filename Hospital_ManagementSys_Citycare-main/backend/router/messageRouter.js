import express from "express";
import { sendMessage, getAllMessages } from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js"
const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages)
export default router;
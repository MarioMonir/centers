import { Router } from "express";
import uploadVideo from "./vimeoController";

// ==============================================

const router = Router();

// ==============================================

router.post("/upload-video", uploadVideo);

// ==============================================

export default router;

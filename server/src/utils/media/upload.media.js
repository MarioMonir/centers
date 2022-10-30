/**
 * Upload Media Module
 *
 * upload media for express server using multer,
 * this example shows how to upload only signle image
 *
 * @author MarioMonir
 */

// --------------------------------------------------------

import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import uploadVideo from "../youtube/operations/uploadVideo";
import { PrismaClient } from "@prisma/client";

// --------------------------------------------------------

const prisma = new PrismaClient();
const unlinkAsync = promisify(fs.unlink);

const uploadRouter = Router();

// --------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    const filePath = path.join(__dirname, "../../../assets/");
    // Create folder if it doesn't exist'
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
    req.file = filePath;
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    req.file = cb(null, Date.now() + "_" + file.originalname);
  },
});

// --------------------------------------------------------

const uploadMiddleware = multer({ storage }).any();

// --------------------------------------------------------

const uploadController = async (req, res) => {
  const filePath = req?.files[0]?.filename;
  const url = process.cwd() + `/assets/${filePath}`;

  // upload video from server to youtube
  uploadVideo(filePath, url, unlinkAsync);

  // store video info in our database
  const video = await prisma.video.create({ data: req?.body });

  res.json(video);
};

// --------------------------------------------------------

uploadRouter.route("/api/upload").post(uploadMiddleware, uploadController);

// --------------------------------------------------------

export default uploadRouter;

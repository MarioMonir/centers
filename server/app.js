import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import errors from "./src/utils/error/errorHandler.middlerware";
import swagger from "./src/utils/swagger-docs/swagger.middleware";
import authRouter from "./src/utils/auth/passport/passport.router.auth";
import passportAuthenticate from "./src/utils/auth/passport/passport.auth";
import passport from "passport";
import uploadController from "./src/utils/media/upload.media";
const https = require("https");
// ------------------------------------------------------

// Entities controllers imports
import userController from "./src/entities/user/user.controller.js";
import userRelationController from "./src/entities/userRelation/userRelation.controller.js";
import groupController from "./src/entities/group/group.controller.js";
import flowController from "./src/entities/flow/flow.controller.js";
import attendanceController from "./src/entities/attendance/attendance.controller.js";
import enrolmentController from "./src/entities/enrolment/enrolment.controller.js";
import requestController from "./src/entities/request/request.controller.js";
import postController from "./src/entities/post/post.controller.js";
import videoController from "./src/entities/video/video.controller.js";
import _exampleController from "./src/entities/_example/_example.controller.js";
import { upload, uploadImage } from "./src/utils/media/uploadProfile";
import { log } from "console";

const { google } = require("googleapis");
const authorize = require("../server/src/utils/youtube/auth/authorization");
const service = google.youtube("v3");
const fs = require("fs");
const spawn = require("child_process").spawn,
  { exec } = require("child_process");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
var axios = require("axios").default;
// ------------------------------------------------------

const app = express();

// ------------------------------------------------------

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// ------------------------------------------------------

// Upload Media Files
app.use(uploadController);

// Swagger Documentaion Middleware
app.use("/api-docs", swagger.server, swagger.setup); // Docs

// ------------------------------------------------------

// Auth Router ( login / register )
app.use(authRouter);

// Auth Passport Protect Middleware
app.use(passportAuthenticate(passport));

// ------------------------------------------------------

// Entities contollers use
app.use(userController);
app.use(userRelationController);
app.use(groupController);
app.use(flowController);
app.use(attendanceController);
app.use(enrolmentController);
app.use(requestController);
app.use(postController);
app.use(videoController);
app.use(_exampleController);

app.get("/api/liveBrodcast", async (req, res) => {
  const auth = await authorize();
  service.liveBroadcasts.list(
    {
      auth: auth,
      part: "snippet,status,contentDetails,id",

      broadcastStatus: "active",
    },
    (error, data) => {
      if (error) {
        console.error(error);
        return;
      }
      const url = "https://www.youtube.com/embed/" + data?.data?.items[0]?.id;
      res.json(url);
    }
  );
});

app.post("/api/startStream", async (req, res) => {
  const camName = req.body.camName;
  console.log("camName", camName);
});

app.post("/api/uploadProfile", uploadImage, upload),
  app.get("/api/validate-meeting", function (req, res) {
    var options = {
      method: "GET",
      url:
        "https://" +
        process.env.METERED_DOMAIN +
        "/api/v1/room/" +
        req.query.roomName,
      params: {
        secretKey: process.env.METERED_SECRET_KEY,
      },
      httpsAgent: agent,
      headers: {
        Accept: "application/json",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        res.send({
          success: true,
        });
      })
      .catch(function (error) {
        console.error(error);
        res.send({
          success: false,
        });
      });
  });
app.get("/api/metered-domain", function (req, res) {
  res.send({
    domain: process.env.METERED_DOMAIN,
  });
});
app.post("/api/create-meeting-room", function (req, res) {
  var options = {
    method: "POST",
    url: "https://" + process.env.METERED_DOMAIN + "/api/v1/room/",
    params: {
      secretKey: process.env.METERED_SECRET_KEY,
    },
    data: {
      roomName: req.body.roomName,
      enableRTMPOut: true,
      enableScreenSharing: true,
      rtmpOutURL: "rtmp://a.rtmp.youtube.com/live2/a0xt-ez0m-2u5g-5vpr-d27d",
      enableRequestToJoin: true,
      showInviteBox: true,
      enableComposition: true,
      enableScreenSharing: true,
      ownerOnlyBroadcast: true,

      enableLiveStreaming: true,
    },
    httpsAgent: agent,
    headers: {
      Accept: "application/json",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send({
        success: true,
        groupId: req.body.groupId,
        ...response.data,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.send({
        success: false,
      });
    });
});
app.post("/api/meetings", async function (req, res) {
  try {
    const response = await axios.get(
      `https://${process.env.METERED_DOMAIN}/api/v1/rooms/active/meetingsessions`,
      {
        params: {
          secretKey: process.env.METERED_SECRET_KEY,
        },
      }
    );

    if (response.data.length > 0) {
      res.send(response.data);
    }
  } catch (error) {
    console.log(error);
  }
});
// ------------------------------------------------------

// Error Handlers
app.use(errors.catchNotFound);
app.use(errors.errorHandler);

//---------------------------------------------------

export default app;

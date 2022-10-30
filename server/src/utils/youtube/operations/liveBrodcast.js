const { google } = require("googleapis");
const authorize = require("../auth/authorization");
const service = google.youtube("v3");
const fs = require("fs");
const spawn = require("child_process").spawn,
  { exec } = require("child_process");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

const liveBroadcast = async (req, res, next) => {
  // const camName = req.body.camName;
  // console.log("camName", camName);
  const auth = await authorize();
  console.log("auth", auth);
  console.log("s");
  let keyStream;
  let broadCastId;
  let streamId;
  let streamIdKey;

  // ==============================================

  // service.liveBroadcasts
  //   .insert({
  //     auth: auth,
  //     part: "snippet,status,id,contentDetails",
  //     requestBody: {
  //       snippet: {
  //         title: "Stream Title",
  //         scheduledStartTime: "2022-07-27T00:00:00.000Z",
  //       },
  //       status: {
  //         privacyStatus: "private",
  //       },
  //     },
  //   })
  //   .then((data) => {
  //   })
  //   .catch((error) => {
  //   });

  // service.liveBroadcasts.list(
  //   {
  //     auth: auth,
  //     part: "snippet,status,contentDetails,id",

  //     broadcastStatus: "active",
  //   },
  //   (error, data) => {
  //     if (error) {
  //       return;
  //     }

  //     console.error("https://www.youtube.com/embed/" + data?.data?.items[0]?.id);
  //   }
  // );

  // ----------------------------------------------------------------------------------------------------------------------

  //   await service.liveStreams
  //     .insert({
  //       auth: auth,
  //       part: "snippet,status,id,cdn,contentDetails",
  //       requestBody: {
  //         snippet: {
  //           title: "Stream Title9",
  //           description: "Stream Description",
  //           channelId: "b0yFnga4PkuUo05UrRId3A",
  //         },
  //         cdn: {
  //           streamName: "firstStream",
  //           frameRate: "30fps",
  //           resolution: "720p",
  //           ingestionType: "rtmp",
  //         },
  //         status: {
  //           streamStatus: "active",
  //         },
  //       },
  //     })

  //     .then((data) => {
  //       streamId = data.data.cdn.ingestionInfo.streamName;
  //       keyStream = data.data.cdn.ingestionInfo.ingestionAddress + "/" + streamId;
  //       console.log("streamUrl:", keyStream);
  //       streamIdKey = data.data.id;
  //       console.log("streamIdKey:", streamIdKey);
  //     });

  //   // ----------------------------------------------------------------------------------------------------------------------

  //   await service.liveBroadcasts
  //     .insert({
  //       auth: auth,
  //       part: "snippet,status,id,contentDetails",
  //       requestBody: {
  //         snippet: {
  //           title: "Stream Title8",
  //           scheduledStartTime: `${new Date().toISOString()}`,
  //           actualStartTime: `${new Date().toISOString()}`,
  //         },
  //         status: {
  //           privacyStatus: "private",
  //           lifeCycleStatus: "live",
  //           selfDeclaredMadeForKids: true,
  //         },
  //         contentDetails: {
  //           enableEmbed: true,
  //           enableDvr: true,
  //           enableAutoStart: true,
  //           enableAutoStop: true,
  //           recordFromStart: true,
  //         },
  //       },
  //     })
  //     .then((data) => {
  //       broadCastId = data.data.id;
  //       console.log("broadCastId:", broadCastId);
  //     })

  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   //----------------------------------------------------------------------------------------------------------------------

  //   await service.liveBroadcasts
  //     .bind({
  //       auth: auth,
  //       part: "snippet,status,contentDetails,id",
  //       id: `${broadCastId}`,
  //       streamId: `${streamIdKey}`,
  //     })
  //     .then((data) => {
  //       const args = [
  //         "-loglevel",
  //         "debug",
  //         "-threads:v",
  //         "2",
  //         "-threads:a",
  //         "8",
  //         "-filter_threads",
  //         "2",
  //         "-thread_queue_size",
  //         "512",
  //         "-f",
  //         "dshow",
  //         "-i",
  //         "video=HP Webcam",
  //         "-f",
  //         "dshow",
  //         "-i",
  //         "audio=Microphone Array (Realtek(R) Audio)",
  //         "-pix_fmt",
  //         "yuv420p",

  //         "-c:v",
  //         "libx264",
  //         "-qp:v",
  //         "19",
  //         "-profile:v",
  //         "high",
  //         "-rc:v",
  //         "cbr_ld_hq",
  //         "-level:v",
  //         "4.2",
  //         "-r:v",
  //         "60",
  //         "-g:v",
  //         "120",
  //         "-bf:v",
  //         "3",
  //         "-refs:v",
  //         "16",
  //         "-f",
  //         "flv",

  //         `${keyStream}`,
  //       ];

  //       var proc = spawn(ffmpegPath, args);
  //       proc.stdout.on("data", function (data) {
  //         console.log(data);
  //       });
  //       proc.stderr.setEncoding("utf8");
  //       proc.stderr.on("data", function (data) {
  //         console.log(data);
  //       });
  //       proc.on("close", function () {
  //         console.log("finished");
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
};
liveBroadcast();

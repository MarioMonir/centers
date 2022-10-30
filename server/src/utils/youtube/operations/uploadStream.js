const spawn = require("child_process").spawn,
  { exec } = require("child_process");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

const args = [
  "-loglevel",
  "debug",
  "-threads:v",
  "2",
  "-threads:a",
  "8",
  "-filter_threads",
  "2",
  "-thread_queue_size",
  "512",
  "-f",
  "dshow",
  "-i",
  "video=HP Webcam",
  "-f",
  "dshow",
  "-i",
  "audio=Stereo Mix (Realtek(R) Audio)",
  "-pix_fmt",
  "yuv420p",

  "-c:v",
  "libx264",
  "-qp:v",
  "19",
  "-profile:v",
  "high",
  "-rc:v",
  "cbr_ld_hq",
  "-level:v",
  "4.2",
  "-r:v",
  "60",
  "-g:v",
  "120",
  "-bf:v",
  "3",
  "-refs:v",
  "16",
  "-f",
  "flv",
  "rtmp://a.rtmp.youtube.com/live2/a0xt-ez0m-2u5g-5vpr-d27d",
];

var proc = spawn(ffmpegPath, args);
proc.stdout.on("data", function (data) {
  console.dir(data);
});
proc.stderr.setEncoding("utf8");
proc.stderr.on("data", function (data) {
  console.dir(data);
});
proc.on("close", function () {
  console.dir("finished");
});

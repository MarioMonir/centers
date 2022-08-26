import { google } from "googleapis";
// import authorize from "../auth/authorization.js";
// const service = google.youtube("v3");

// ==============================================

const uploadVideo = async (
  title,
  description,
  localPath = null,
  media = null
) => {
  // -----------------------------------------------
  // const auth = await authorize();
  // -----------------------------------------------
  // service.videos.insert(
  //   {
  //     auth: auth,
  //     part: "snippet,contentDetails,status",
  //     requestBody: {
  //       // Video title and description
  //       snippet: {
  //         title,
  //         description,
  //       },
  //       // only EduHub account can access the video
  //       status: {
  //         privacyStatus: "private",
  //       },
  //     },
  //     // Create the readable stream to upload the video
  //     media: {
  //       // body: media,
  //       // body: fs.createReadStream(localPath),
  //     },
  //   },
  //   (error, data) => {
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }
  //     console.log("https://www.youtube.com/watch?v=" + data.data.id);
  //   }
  // );
};

// ==============================================

export default uploadVideo;

// ==============================================

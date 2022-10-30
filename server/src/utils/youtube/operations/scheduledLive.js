const { google } = require("googleapis");
const { authorize } = require("../auth/authorization");
const service = google.youtube("v3");
const fs = require("fs");

const scheduledBroadcast = async (title, localPath) => {
  console.log("hello");
  console.log(new Date().toISOString());

  // const auth = await authorize();

  // service.liveBroadcasts
  //   .insert({
  //     auth: auth,
  //     part: "snippet,status,contentDetails,id",
  //     requestBody: {
  //       // Video title and description
  //       snippet: {
  //         title: "title",
  //         description: "This is a test broadcast.",
  //         scheduledStartTime: "2022-12-12T00:00:00Z",
  //       },
  //       // only EduHub account can access the video
  //       status: {
  //         privacyStatus: "private",
  //       },
  //     },
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // Create the readable stream to upload the video
};

scheduledBroadcast();

import { Vimeo } from "vimeo";

// ==============================================

const client = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);

// ==============================================

const uploadVideo = (filePath) => {
  client.upload(
    filePath,
    {
      name: "Untitled",
      description: "The description goes here.",
    },
    function (uri) {
      console.log("Your video URI is: " + uri);
    },
    function (bytes_uploaded, bytes_total) {
      var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
      console.log(bytes_uploaded, bytes_total, percentage + "%");
    },
    function (error) {
      console.log("Failed because: " + error);
    }
  );
};

// ==============================================

export default uploadVideo;

import { Vimeo } from "vimeo";

// ==============================================

const client = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);

// ==============================================

const uploadVideo = (req, res, next) => {
  try {
    client.upload(
      req.body.filePath,
      {
        name: "Untitled",
        description: "The description goes here.",
      },
      function (uri) {
        res.end("Your video URI is: " + uri);
      },
      function (bytes_uploaded, bytes_total) {
        var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
        res.write(bytes_uploaded + " " + bytes_total + " " + percentage + "%");
      },
      function (error) {
        res.error("Failed because: " + error);
      }
    );
  } catch (error) {
    next(error);
  }
};

//  ============================================================

export default uploadVideo;

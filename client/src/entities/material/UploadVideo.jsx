import * as React from "react";
import { useState } from "react";
import {
  useNotify,
  useRedirect,
  fetchStart,
  fetchEnd,
  Button,
} from "react-admin";
// import { DropzoneArea } from "material-ui-dropzone";

// ============================================================

const UploadVideo = ({ record }) => {
  const redirect = useRedirect();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    const updatedRecord = { ...record, is_approved: true };
    fetch(`/comments/${record.id}`, { method: "PUT", body: updatedRecord })
      .then(() => {
        notify("Comment approved");
        redirect("/comments");
      })
      .catch((e) => {
        notify("Error: comment not approved", { type: "warning" });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <DropzoneArea
      acceptedFiles={["video/*"]}
      dropzoneText={"Drag and drop an image here or click"}
      onChange={(files) => console.log("Files:", files)}
    />
  );
};

// ============================================================

export default UploadVideo;

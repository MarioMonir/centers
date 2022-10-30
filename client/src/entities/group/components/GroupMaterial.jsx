import React, { useState, useEffect } from "react";

import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useTranslate, useGetList, useRedirect } from "react-admin";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import config from "../../../configs/config";

// =================================================================

// =================================================================

export default function GroupMaterial() {
  const translate = useTranslate();
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor:
        Quota / storageLimit <= 0.33
          ? "#7DCEA0"
          : Quota / storageLimit > 0.33 && Quota / storageLimit < 0.66
          ? "#F8C471"
          : "#F1948A",
    },
  }));
  const limiteSize = 2147483648;
  const [videoUrl, setVideoUrl] = useState();
  const [videoName, setVideoName] = useState("");
  const [VideoSize, setVideoSize] = useState("");
  const [fileObject, setFileObject] = useState({});
  const [LoggedUser, setLoggedUser] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [Error, setError] = useState(false);
  const redirect = useRedirect();
  // --------------------------------

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // --------------------------------
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoggedUser(user);
  }, []);
  const storageLimit = user?.videoTotalStorage;
  const Quota = user?.videoUsedStorage;

  //request to upload video to youtube
  var formData = new FormData();
  formData.append("file", fileObject);
  formData.append("title", videoName);
  formData.append("description", "video description");
  formData.append("videoSize", VideoSize);

  var requestOptions = {
    body: formData,

    url: `${config.baseUrl}/upload`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    onUploadProgress: (progressEvent) => {
      console.log(
        "Upload Progress: " +
          Math.round((progressEvent.loaded / progressEvent.total) * 100) +
          "%"
      );
    },
  };
  const uploadVideo = async () => {
    if (!Error) {
      // please use api factory pattern and baseURl from configs
      setUploaded(true);
      const { data } = await axios.post(
        `${config.baseUrl}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(data);
    }
    // if (!Error) {
    //   redirect("/");
    // }
    if (Error) {
      setError(false);
    }
  };

  //------------------------------------------------------

  // get video from user
  const fileVideo = (e) => {
    e.preventDefault();
    const file = e?.target?.files?.[0];
    setFileObject(file);
    setVideoName(file?.name);
    setVideoSize(file?.size);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setUploaded(false);
  };
  if (VideoSize > limiteSize) {
    setError(true);
  }

  // --------------------------------

  const [Groups, setGroups] = useState([]);

  const { data: GroupData } = useGetList("group", {
    filter: { ownerUserId: LoggedUser?.id },
    sort: { field: "id", order: "ASC" },
  });

  // --------------------------------

  useEffect(() => {
    if (GroupData?.length) {
      setGroups(GroupData);
    }
  }, [GroupData]);

  // --------------------------------

  return (
    <>
      <Box
        sx={{
          width: "50%",

          marginTop: 5,
          marginBottom: "20px",
          marginLeft: 1,
        }}
      >
        <BorderLinearProgress
          variant="determinate"
          value={(Quota / storageLimit) * 100}
        />

        <Typography variant="body2">
          {Quota} GB of {storageLimit} GB
        </Typography>
      </Box>

      <TextField
        id="outlined-basic"
        label={translate("resources.uploadVideo.fields.tittle")}
        sx={{ margin: 1 }}
        variant="standard"
        name="Name"
        required
        inputProps={{
          pattern: "[a-z]*",
          title: " only letters no numbers",
        }}
      />
      <TextField
        id="outlined-basic"
        label={translate("resources.uploadVideo.fields.lectureNumber")}
        sx={{ margin: 1 }}
        variant="standard"
        type="number"
        name="lectureNumber"
        required
        inputProps={{
          min: 1,
          pattern: "[1-9]*",
          title: " only numbers",
        }}
      />

      <TextField
        id="standard-multiline-static"
        label={translate("resources.uploadVideo.fields.description")}
        multiline
        required={true}
        rows={4}
        sx={{ margin: 1 }}
        variant="standard"
      />
      <div>
        {Groups &&
          Groups?.map((group, index) => {
            return (
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                sx={{ marginLeft: 1 }}
                required={true}
                label={`${translate(
                  "resources.uploadVideo.fields.groupNumber"
                )}:${group.id}`}
              />
            );
          })}
        {!Groups.length && (
          <Typography variant="h6" sx={{ margin: "10px" }}>
            No Groups
          </Typography>
        )}
      </div>

      {!videoUrl && (
        <Button variant="contained" component="label" onChange={fileVideo}>
          {translate("resources.uploadVideo.fields.importVideo")}
          <input hidden accept="video/*" type="file" />
        </Button>
      )}
      {videoUrl && (
        <>
          <Button variant="contained" component="label" onChange={fileVideo}>
            {translate("resources.uploadVideo.fields.importOtherVideo")}
            <input hidden accept="video/*" type="file" />
          </Button>
          <Card
            sx={{
              padding: 1.5,
              display: "block",
              margin: "auto",
              marginTop: 3,
            }}
          >
            <video src={videoUrl} width="400" height="240" controls>
              Your browser does not support the video tag.
            </video>
            {Error && (
              <Typography
                sx={{ marginTop: "10px", color: "#f24336", fontSize: "1 rem" }}
              >
                {translate("resources.uploadVideo.fields.videoSize")}
              </Typography>
            )}
          </Card>
        </>
      )}
      {videoUrl && (
        <>
          {uploaded ? (
            <LinearProgress
              sx={{ marginY: "10px" }}
              variant="determinate"
              value={progress}
            />
          ) : (
            <Button
              variant="contained"
              component="label"
              sx={{ marginTop: 2 }}
              onClick={uploadVideo}
            >
              {translate("resources.uploadVideo.fields.uploadVideo")}
            </Button>
          )}
        </>
      )}
    </>
  );
}

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonIcon from "@mui/icons-material/Person";

import { useEffect, useState } from "react";
import { useGetList, useTranslate } from "react-admin";
import config from "../../configs/config";
export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loggedUser, setLoggedUser] = useState([]);
  const [userData, setUserData] = useState([]);
  const translate = useTranslate();
  useEffect(() => {
    setLoggedUser(user);
  }, []);
  useEffect(() => {
    axios
      .get(`${config.baseUrl}/user/` + loggedUser.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setUserData(res.data);
      });
  }, [loggedUser]);
  const date = new Date(userData?.createdAt)?.toLocaleDateString();

  const [avatar, setAvatar] = useState(null);

  const uploadProfilePicture = (e) => {
    e.preventDefault();
    setAvatar(URL.createObjectURL(e.target.files[0]));

    const formData = new FormData();
    formData.append("photo", e.target.files[0]);
    const name = e.target.files[0].name.split(".")[0];
    localStorage.setItem("name", name);
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };

    fetch(`${config.baseUrl}/uploadProfile`, {
      method: "POST",
      body: formData,
      headers: config.headers,
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => console.error(err));
  };

  return (
    <Box
      sx={{
        Width: "100%",
        marginTop: 5,
        padding: "10px",
        Height: "100%",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minHeight: "100%",
          backgroundColor: "#fafafb",
          minWidth: "25%",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Avatar
            alt="walid hassan"
            src={"../../../public/inbound8966086389108990020.png"}
            sx={{
              width: 200,
              height: 200,
              margin: "20px",
            }}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={uploadProfilePicture}
              />
              <PhotoCameraIcon sx={{ color: "#2196f3" }} />
            </IconButton>
          </Avatar>
        </Stack>
        <Stack
          direction="row"
          sx={{ width: "100%", margin: "10px", marginLeft: "20px" }}
          spacing={2}
        >
          {translate("resources.userProfile.fields.work")}
          <hr
            style={{
              width: "80%",
              height: "2px",

              marginTop: "10PX",
            }}
          />
        </Stack>
        <Stack
          direction="column"
          sx={{
            width: "95%",
            height: "200px",
          }}
          spacing={2}
        ></Stack>
        <Stack
          direction="row"
          sx={{ width: "100%", margin: "10px", marginLeft: "20px" }}
          spacing={2}
        >
          {translate("resources.userProfile.fields.skills")}
          <hr
            style={{
              width: "80%",
              height: "2px",

              marginTop: "10PX",
            }}
          />
        </Stack>
        <Stack
          direction="column"
          sx={{
            width: "95%",
            height: "150px",

            // border: 1,
          }}
          spacing={2}
        ></Stack>
      </div>
      <div
        style={{
          minHeight: "100%",
          minWidth: "75%",
          backgroundColor: " #fafafb",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <Stack
          direction="column"
          sx={{ padding: "10px", margin: "10px" }}
          spacing={2}
        >
          <span style={{ fontSize: "30px", marginBottom: "-10px" }}>
            {userData.name?.toUpperCase()}
          </span>
          <span
            style={{ fontSize: "16px", marginLeft: "5px", color: "#015b85" }}
          >
            {loggedUser.userType}
          </span>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            padding: "10px",
            // border: 1,
            margin: "10px",
            minHeight: "150px",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {translate("resources.userProfile.fields.followers") + ":"}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {translate("resources.userProfile.fields.following") + ":"}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {translate("resources.userProfile.fields.videos") + ":"}
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {translate("resources.userProfile.fields.since") + ":"}
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#015b85", display: "inline" }}
            >
              {" "}
              {date}
            </Typography>
          </Typography>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            padding: "10px",
            // border: 1,
            margin: "10px",
            minHeight: "370px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: "-15px",
              padding: 1,
              cursor: "pointer",
              color: "#015b85",
            }}
          >
            <PersonIcon
              sx={{
                fontSize: "30px",
                marginRight: "5px",
                marginBottom: "-5px",
                color: "black",
              }}
            />
            {translate("resources.userProfile.fields.about")}
          </Typography>
          <hr />
          <Stack
            direction="column"
            spacing={2}
            sx={{ height: "250px", padding: "10px" }}
          >
            <Stack direction="row" sx={{ width: "100%" }} spacing={2}>
              <Typography
                variant="span"
                sx={{
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#015b85",
                }}
              >
                {translate("resources.userProfile.fields.contactInformation")}
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {translate("resources.userProfile.fields.email") + ": "}
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "#015b85", display: "inline" }}
              >
                {userData?.email}
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {translate("resources.userProfile.fields.phone") + ": "}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {translate("resources.userProfile.fields.address") + ": "}
            </Typography>

            <Stack direction="row" sx={{ width: "100%" }} spacing={2}>
              <Typography
                variant="span"
                sx={{
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#015b85",
                }}
              >
                {translate("resources.userProfile.fields.basicInformation")}
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {translate("resources.userProfile.fields.birthday") + ": "}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {translate("resources.userProfile.fields.gender") + ": "}
            </Typography>
          </Stack>
        </Stack>
      </div>
    </Box>
  );
}

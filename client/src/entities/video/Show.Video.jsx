import React, { useState, useEffect } from "react";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  TopToolbar,
  useRedirect,
  useTranslate,
  useGetList,
  ListContextProvider,
  useListController,
  List,
  Toolbar,
  useShowController,
} from "react-admin";
import VideoCard from "./components/VideoCard";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
// =======================================================

const styles = {
  typography: { marginBottom: "10px", color: "#1976d2" },
};

// =======================================================

export default function ShowVideo({ groupId }) {
  const [videoData, setVideoData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoggedUser(user);
  }, []);
  const { record: group } = useShowController();

  const { data, isLoading, error } = useGetList("video", {
    filter: { ownerUserId: loggedUser.id },
    pagination: { page, perPage: 6 },
    sort: { field: "lectureNumber", order: "ASC" },
  });

  useEffect(() => {
    if (data?.length) {
      setVideoData(data);
      setTotalPages(Math.floor(data?.length / 6) + 1);
    }
  }, [data]);

  // ------------------------------------------------

  const translate = useTranslate();
  const redirect = useRedirect();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleupload = () => {
    redirect("/uploadmaterials");
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // ------------------------------------------------

  const listContext = useListController();
  return (
    <>
      <ListContextProvider value={listContext}>
        <TopToolbar sx={{ margin: 3 }}>
          {loggedUser?.userType?.toLowerCase() === "student" ? (
            <></>
          ) : (
            <Button
              size="small"
              color="primary"
              resource="uploadmaterials"
              onClick={handleupload}
              startIcon={<UploadIcon />}
              variant="contained"
            >
              {translate("resources.uploadVideo.fields.uploadNewvideo")}
            </Button>
          )}
        </TopToolbar>

        {/* ------------------------------------------------ */}
        <Grid container spacing={2}>
          {videoData?.map((Data, index) => {
            return (
              <VideoCard loggedUser={loggedUser} key={index} videoData={Data} />
            );
          })}
        </Grid>
        <Stack spacing={2}>
          <Pagination onChange={handleChange} count={totalPages} page={page} />
        </Stack>
      </ListContextProvider>
    </>
  );
}

import { useState } from "react";

import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslate } from "react-admin";

import Card from "@mui/material/Card";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import config from "../../../configs/config";

// =======================================================

const styles = {
  typography: { marginBottom: "10px", color: "white" },
};

// =======================================================

export default function VideoCard({ videoData, loggedUser }) {
  const { id, title, link, updatedAt, lectureNumber } = videoData;
  const [Agreed, setAgreed] = useState(
    // localStorage.getItem("Agreed") === "true"
    false
  );
  // useEffect(() => {
  //   localStorage.setItem("Agreed", Agreed);
  // }, [Agreed]);

  const translate = useTranslate();
  const date = new Date(updatedAt).toLocaleString();

  const [anchorEl, setAnchorEl] = useState(null);
  const [opened, setOpened] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickOpen = () => {
    setOpened(true);
  };

  const handleClickClose = () => {
    setOpened(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAgree = () => {
    fetch(`${config.baseUrl}/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        attendance: {
          userId: loggedUser.id,
          groupId: 1,
          lectureNumber: 1,
        },
      }),
    })
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
    setAgreed(true);
  };

  // ------------------------------------------------

  return (
    <>
      {loggedUser?.userType?.toLowerCase() === "student" ? (
        <Card
          sx={{
            maxWidth: 400,
            margin: 1,

            cursor: "pointer",
            background: "linear-gradient(to right, #36d1dc, #5b86e5)",
            color: "white",

            boxShadow: "1px 3px 2px #013e5a",
            borderRadius: "20px",

            "&:hover": {
              //   boxShadow: "0px 0px 10px #013e5a",

              background: "linear-gradient(to right, #36d1dc9c, #5b87e5a0)",
            },
          }}
        >
          {/* ------------------------------------------------ */}

          {loggedUser?.userType?.toLowerCase() === "student" ? (
            <></>
          ) : (
            <>
              <CardHeader
                action={
                  <IconButton
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    aria-label="settings"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <VisibilityIcon
                    sx={{ marginRight: 1, marginLeft: 1, color: "#2196f3" }}
                  />
                  {translate("resources.uploadVideo.fields.show")}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <EditIcon sx={{ marginRight: 1, marginLeft: 1 }} />
                  {translate("resources.uploadVideo.fields.edit")}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <DeleteIcon
                    sx={{ marginRight: 1, marginLeft: 1, color: "red" }}
                  />
                  {translate("resources.uploadVideo.fields.delete")}
                </MenuItem>
              </Menu>
            </>
          )}

          {/* ------------------------------------------------ */}

          <CardMedia>
            {Agreed ? (
              <iframe
                width="400"
                height="240"
                src={link}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center ",
                  alignItems: "center",
                  minWidth: "400px",
                  minHeight: "240px",
                  backgroundColor: "black",
                  position: "relative",
                }}
              >
                <iframe
                  width="400"
                  height="240"
                  src={link}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    pointerEvents: Agreed ? "auto" : "none",
                    opacity: Agreed ? 1 : 0.3,
                  }}
                />

                <div style={{ position: "absolute" }}>
                  <Button variant="contained" onClick={handleClickOpen}>
                    {translate(
                      "resources.uploadVideo.fields.clickHereToWatchThisVideo"
                    )}
                  </Button>
                  <Dialog
                    open={opened}
                    onClose={handleClickClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title"></DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        WITH AGREE YOU CAN WATCH THIS VIDEO
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClickClose}>Disagree</Button>
                      <Button onClick={handleAgree} autoFocus>
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            )}
          </CardMedia>

          {/* ------------------------------------------------ */}

          <CardContent>
            <Typography
              sx={{ marginBottom: "10px", color: "white" }}
              component={"h3"}
            >
              {translate("resources.uploadVideo.fields.tittle")} :{title}
            </Typography>
            <Typography sx={styles.typography} component={"h3"}>
              {translate("resources.uploadVideo.fields.lectureNumber")} :
              {lectureNumber}
            </Typography>
            <Typography sx={styles.typography} component={"h3"}>
              {translate("resources.uploadVideo.fields.lectureDate")} :{date}
            </Typography>
          </CardContent>
          {/* <CardActions disableSpacing></CardActions> */}
        </Card>
      ) : (
        <Card
          sx={{
            maxWidth: 400,
            margin: 1,
            boxShadow: 2,
            cursor: "pointer",
            background: "linear-gradient(to right, #36d1dc, #5b86e5)",
            color: "white",

            boxShadow: "1px 3px 2px #013e5a",
            borderRadius: "20px",

            "&:hover": {
              //   boxShadow: "0px 0px 10px #013e5a",

              background: "linear-gradient(to right, #36d1dc9c, #5b87e5a0)",
            },
          }}
        >
          <CardHeader
            action={
              <IconButton
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                aria-label="settings"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            }
          />

          {/* ------------------------------------------------ */}

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleClose}>
              <VisibilityIcon
                sx={{ marginRight: 1, marginLeft: 1, color: "#2196f3" }}
              />
              {translate("resources.uploadVideo.fields.show")}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <EditIcon sx={{ marginRight: 1, marginLeft: 1 }} />
              {translate("resources.uploadVideo.fields.edit")}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <DeleteIcon
                sx={{ marginRight: 1, marginLeft: 1, color: "red" }}
              />
              {translate("resources.uploadVideo.fields.delete")}
            </MenuItem>
          </Menu>

          {/* ------------------------------------------------ */}

          <CardMedia>
            <iframe
              width="400"
              height="240"
              src={link}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </CardMedia>

          {/* ------------------------------------------------ */}

          <CardContent>
            <Typography
              sx={{ marginBottom: "10px", color: "white" }}
              component={"h3"}
            >
              {translate("resources.uploadVideo.fields.tittle")} :{title}
            </Typography>
            <Typography sx={styles.typography} component={"h3"}>
              {translate("resources.uploadVideo.fields.lectureNumber")} :
              {lectureNumber}
            </Typography>
            <Typography sx={styles.typography} component={"h3"}>
              {translate("resources.uploadVideo.fields.lectureDate")} :{date}
            </Typography>
          </CardContent>
          {/* <CardActions disableSpacing></CardActions> */}
        </Card>
      )}
    </>
  );
}

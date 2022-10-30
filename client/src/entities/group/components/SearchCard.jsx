import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { CardActionArea } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetList, useTranslate } from "react-admin";
import EnrolementCard from "./EnrolementCard";
import config from "../../../configs/config";

// ------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ------------------------------------------------------------------

export default function SearchCard({ GroupsAndUsers }) {
  const [loggedUser, setLoggedUser] = useState([]);
  const [Groups, setGroups] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const translate = useTranslate();
  // - - - - - - - - - - - - -
  useEffect(() => setLoggedUser(user), []);

  // - - - - - - - - - - - - -

  const [open, setOpen] = useState(false);

  const { data, loading, error } = useGetList("group", {
    filter: { ownerUserId: GroupsAndUsers?.id },
  });

  if (error) console.error(error);

  // - - - - - - - - - - - -- -

  useEffect(() => setGroups(data), [data]);

  // - - - - - - - - - - - -- -

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedButton, setSelectedButton] = useState(false);
  const [message, setMessage] = useState("enrolement");
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));
  const handleRequest = (e, group) => {
    e.preventDefault();

    if (selectedButton || Success || Error) {
      setMessage("You already enroled in this group");
      return;
    }

    // please use api factory pattern and baseURl from configs
    fetch(`${config.baseUrl}/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        fromUserId: loggedUser?.id,
        toUserId: GroupsAndUsers?.name
          ? GroupsAndUsers?.id
          : GroupsAndUsers?.teacherUserId,
        note: "",
        info: {},
        toGroupId: group ? group : GroupsAndUsers?.id,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          setSuccess(true);
          setError(false);
          setMessage("You have successfully enroled in this group");
        } else {
          setError(true);
          setSuccess(false);
          setMessage("something went wrong");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setSuccess(false);
        setMessage("something went wrong");
      });
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  // - - - - - - - - - - - -- -

  return (
    <>
      <Card
        sx={{
          minWidth: 345,
          minHeight: 300,
          background: "linear-gradient(to right, #36d1dc, #5b86e5)",
          color: "white",
          boxShadow: "1px 3px 2px #013e5a",
          borderRadius: "20px",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            background: "linear-gradient(to right, #36d1dc9c, #5b87e5a0)",
            transform: "scale(1.1)",
          },
        }}
        onClick={handleClickOpen}
      >
        <CardActionArea
          sx={{
            minHeight: 300,
          }}
        >
          <CardHeader
            sx={{ minHeight: 100 }}
            title={GroupsAndUsers?.name || GroupsAndUsers?.courseName}
            titleTypographyProps={{
              fontSize: "50px",

              fontWeight: "bold",
            }}
          />

          <CardContent
            sx={{
              minHeight: 200,
            }}
          >
            <Typography
              color="text.secondary"
              sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}
            >
              {translate("resources.search.fields.type")}:
              {lang === "ar"
                ? `${
                    GroupsAndUsers?.userType === "Teacher"
                      ? "مدرس"
                      : GroupsAndUsers?.userType === "Center"
                      ? "مركز"
                      : "مجموعة"
                  }`
                : ""}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                paddingTop: 1,
                fontSize: "1.5rem",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {!GroupsAndUsers?.level
                ? ""
                : translate("resources.search.fields.level") + ":"}
              {GroupsAndUsers?.level || ""}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {!GroupsAndUsers?.courseName ? (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {translate("resources.search.fields.groupsYouCanJoin")}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                {translate("resources.search.fields.close")}
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            {Groups?.map((group, i) => (
              <>
                <EnrolementCard group={group} GroupsAndUsers={GroupsAndUsers} />
              </>
            ))}
          </List>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to join this group?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              After agree this message You will be added to this group.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleRequest} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

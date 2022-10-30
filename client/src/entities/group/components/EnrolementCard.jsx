import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";

import Divider from "@mui/material/Divider";
import { useTranslate } from "react-admin";
import config from "../../../configs/config";

function EnrolementCard({ group, GroupsAndUsers }) {
  const [loggedUser, setLoggedUser] = useState([]);
  const [Groups, setGroups] = useState([]);
  const translate = useTranslate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoggedUser(user);
  }, []);
  const [selectedButton, setSelectedButton] = useState(false);
  const [message, setMessage] = useState("enrolement");
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
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
        fromUserId: loggedUser.id,
        toUserId: GroupsAndUsers.name
          ? GroupsAndUsers.id
          : GroupsAndUsers.teacherUserId,
        note: "",
        info: {},
        toGroupId: group ? group : GroupsAndUsers.id,
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
        setError(true);
        setSuccess(false);
        setMessage("something went wrong");
      });
    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  return (
    <>
      <ListItem>
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",

            fontWeight: "bold",
            color: "#000",
          }}
        >
          {translate("resources.search.fields.courseName")}:{" "}
        </Typography>

        <ListItemText
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
          primary={group.courseName}
        />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {translate("resources.search.fields.id")}:{" "}
        </Typography>

        <ListItemText
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
          primary={group.id}
        />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {translate("resources.search.fields.level")}:{" "}
        </Typography>
        <ListItemText
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
          primary={group.level}
        />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {translate("resources.search.fields.type")}:{" "}
        </Typography>
        <ListItemText
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
          primary={group.groupType}
        />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {translate("resources.search.fields.payment")}:
        </Typography>
        <ListItemText
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
          primary={group.paymentType}
        />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {translate("resources.search.fields.location")}:
        </Typography>
        <ListItemText
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
          primary={group.location}
        />
        <FormControlLabel
          control={
            <Button
              onClick={(e) => {
                setSelectedButton(true);
                handleRequest(e, group.id);
              }}
              variant="contained"
              sx={{
                backgroundColor: `${
                  Error ? "red" : Success ? "green" : "#013e5a"
                }`,
                "&:hover": {
                  backgroundColor: `${
                    Error ? "red" : Success ? "green" : "#007cb5"
                  }`,
                },
              }}
            >
              {Error ? "Error" : Success ? "Success" : "enroll"}
            </Button>
          }
          required
        />
      </ListItem>
      <Divider />
    </>
  );
}

export default EnrolementCard;

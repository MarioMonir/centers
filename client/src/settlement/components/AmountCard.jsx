import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

function AmountCard() {
  return (
    <>
      <ListItem>
        <FormControlLabel control={<Checkbox />} required />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Course Name:{" "}
        </Typography>

        <ListItemText primary={"group.courseName"} />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Id:{" "}
        </Typography>

        <ListItemText primary={"group.id"} />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Level:{" "}
        </Typography>
        <ListItemText primary={"group.level"} />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Type:{" "}
        </Typography>
        <ListItemText primary={"group.groupType"} />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Payment:{" "}
        </Typography>
        <ListItemText primary={"group.paymentType"} />
        <Typography
          variant="subtitle1"
          sx={{
            marginRight: "2px",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Location:
        </Typography>
        <ListItemText primary={"group.location"} />
      </ListItem>
      <Divider />
    </>
  );
}

export default AmountCard;

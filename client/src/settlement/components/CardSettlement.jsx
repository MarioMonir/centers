import React, { useEffect, useState, useTransition } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import EnrolementCard from "../../entities/group/components/EnrolementCard";
import AmountCard from "./AmountCard";
import { useTranslate } from "react-admin";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function CardSettlement({ item }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const translate = useTranslate();
  return (
    <>
      <Card
        onClick={handleClickOpen}
        sx={{
          Width: 345,
          minHeight: 300,
          background: "linear-gradient(to right, #36d1dc, #5b86e5)",
          color: "white",

          boxShadow: "1px 3px 2px #013e5a",
          borderRadius: "20px",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            //   boxShadow: "0px 0px 10px #013e5a",

            background: "linear-gradient(to right, #36d1dc9c, #5b87e5a0)",
            transform: "scale(1.1)",
          },
        }}
      >
        <CardActionArea
          sx={{
            minHeight: 300,
          }}
        >
          <CardHeader
            sx={{
              minHeight: 100,
            }}
            title={item?.name}
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
              gutterBottom
              sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
              variant="h5"
              component="h2"
            >
              {translate("resources.settlement.fields.id")}: {item?.id}
            </Typography>
            <Typography
              gutterBottom
              sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
              variant="h5"
              component="h2"
            >
              {translate("resources.settlement.fields.email")}: {item?.email}
            </Typography>
            <Typography
              gutterBottom
              sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
              variant="h5"
              component="h2"
            >
              {translate("resources.settlement.fields.since")}:{" "}
              {new Date(item?.createdAt)?.toLocaleDateString()}
            </Typography>
            <Typography
              gutterBottom
              sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
              variant="h5"
              component="h2"
            >
              {translate("resources.settlement.fields.videoUsageStorage")}:{" "}
              {item?.videoTotalStorage}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
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
              Groups you can join
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <AmountCard />
        </List>
        <Typography variant="h6" component="div"></Typography>
      </Dialog>
    </>
  );
}

export default CardSettlement;

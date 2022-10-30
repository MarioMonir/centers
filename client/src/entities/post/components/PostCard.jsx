import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import StepConnector from "@mui/material/StepConnector";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { FunctionField, ReferenceField, useTranslate } from "react-admin";
import { dateHandling, numberHandling } from "../../../utils/dataHandling";
import EditPost from "../edit.post";
import PostActionButton from "./PostActionsButton";
import PostComments from "./PostComments";
import PostLikeButton from "./PostLikeButton";

// ------------------------------------------------

// ------------------------------------------------

const PostCard = (record) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoggedUser(user);
  }, []);

  // ------------------------------------------------

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // ------------------------------------------------
  const translate = useTranslate();

  return (
    <Card
      sx={{
        width: 800,
        paddingLeft: 1.5,
        paddingRight: 1.5,
        //margin: 2,
      }}
    >
      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      <CardHeader
        avatar={<AccountCircleIcon color="action" sx={{ fontSize: 45 }} />}
        action={
          record?.userId === loggedUser.id ? (
            <PostActionButton {...{ postId: record.id, setIsEditing }} />
          ) : (
            <></>
          )
        }
        title={
          <ReferenceField
            record={record}
            reference="user"
            source="userId"
            link={false} //"show"
          >
            <FunctionField
              render={(record) => `${record?.name}, ${record?.userType}`}
            />
          </ReferenceField>
        }
        subheader={dateHandling(record?.createdAt || new Date())}
      />

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      <CardContent>
        {isEditing ? (
          <EditPost {...{ post: record, setIsEditing }} />
        ) : (
          <Typography variant="body1" sx={{ whiteSpace: "pre" }}>
            {record?.content}
          </Typography>
        )}
      </CardContent>

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      {/* <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
            /> */}

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      <StepConnector orientation="horizontal" />
      <div style={{ display: "flex" }}>
        <Typography
          variant="body2"
          sx={{
            padding: 0.5,
            paddingLeft: 2,
            paddingRight: 2,
            whiteSpace: "pre",
          }}
        >
          {numberHandling(record?.likes?.userIds?.length || " 0 ")}{" "}
          {translate("resources.post.fields.likes")}{" "}
          {numberHandling(record?.comments?.list?.length || " 0 ")}{" "}
          {translate("resources.post.fields.comments")}
        </Typography>
      </div>
      <StepConnector orientation="horizontal" />

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      <CardActions>
        <PostLikeButton {...record} />

        <IconButton onClick={handleExpandClick}>
          <ChatBubbleIcon />
        </IconButton>
      </CardActions>

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      <PostComments {...{ post: record, expanded }} />

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
    </Card>
  );
};

export default PostCard;

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { FunctionField, ReferenceField, useTheme } from "react-admin";
import { dateHandling, numberHandling } from "./dataHandling";
import CommentLikeButton from "./CommentLikeButton";

// ------------------------------------------------

const CommentCard = ({ post, comment, commentId }) => {
  console.log({ post });
  const [theme] = useTheme();
  return (
    <div
      style={{
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
      }}
    >
      <Card
        sx={{
          backgroundColor: theme?.palette?.background?.default,
          borderRadius: 10,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <ReferenceField
              record={comment}
              reference="user"
              source="userId"
              link={false} //"show"
            >
              <FunctionField
                render={(record) => `${record.name}, ${record.userType}`}
              />
            </ReferenceField>
          }
          subheader={comment.content}
        />
      </Card>
      <div style={{ display: "flex", marginLeft: 50, marginRight: 50 }}>
        <CommentLikeButton {...{ post, comment, commentId }} type="comment" />
        <Typography
          variant="body2"
          sx={{
            padding: 0.5,
            paddingLeft: 1,
            paddingRight: 1,
          }}
        >
          {numberHandling(comment.likes.number) + " likes"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            padding: 0.5,
            paddingLeft: 1,
            paddingRight: 1,
          }}
        >
          {dateHandling(comment.createdAt)}
        </Typography>
      </div>
    </div>
  );
};

export default CommentCard;

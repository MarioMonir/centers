import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { FunctionField, ReferenceField, useTheme } from "react-admin";
import { dateHandling, numberHandling } from "../../../utils/dataHandling";
import EditComment from "../edit.comment";
import CommentActionButton from "./CommentActionsButton";
import CommentLikeButton from "./CommentLikeButton";

// ------------------------------------------------

// ------------------------------------------------

const CommentCard = ({ post, comment, commentId }) => {
  const [theme] = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoggedUser(user);
  }, []);

  // ------------------------------------------------

  return (
    <div>
      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      <Card
        sx={{
          backgroundColor: theme?.palette?.background?.default,
          borderRadius: 5,
        }}
      >
        <CardHeader
          avatar={<AccountCircleIcon color="action" sx={{ fontSize: 45 }} />}
          action={
            comment?.userId === loggedUser.id ? (
              <CommentActionButton {...{ setIsEditing, post, commentId }} />
            ) : null
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
          subheader={
            isEditing ? (
              <EditComment {...{ post, comment, commentId, setIsEditing }} />
            ) : (
              <Typography variant="body1" sx={{ whiteSpace: "pre" }}>
                {comment?.content}
              </Typography>
            )
          }
        />
      </Card>

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

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
          {numberHandling(comment.likes.userIds.length) + " likes"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            padding: 0.5,
            paddingLeft: 1,
            paddingRight: 1,
          }}
        >
          {/* {dateHandling(comment.createdAt)} */}
        </Typography>
      </div>

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
    </div>
  );
};

export default CommentCard;

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { FunctionField, ReferenceField, useTheme } from "react-admin";
import { dateHandling, numberHandling } from "../../../utils/dataHandling";
import CommentLikeButton from "./CommentLikeButton";

// ------------------------------------------------

const loggedInUserId = 1;

// ------------------------------------------------

const CommentCard = ({ post, comment, commentId }) => {
  const [theme] = useTheme();

  // ------------------------------------------------

  return (
    <div
      style={{
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
      }}
    >
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
            comment.userId === loggedInUserId ? (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
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
            <Typography variant="body1" sx={{ whiteSpace: "pre" }}>
              {comment?.content}
            </Typography>
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
          {dateHandling(comment.createdAt)}
        </Typography>
      </div>

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
    </div>
  );
};

export default CommentCard;

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import StepConnector from "@mui/material/StepConnector";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { FunctionField, ReferenceField } from "react-admin";
import { dateHandling, numberHandling } from "../../../utils/dataHandling";
import PostComments from "./PostComments";
import PostLikeButton from "./PostLikeButton";

// ------------------------------------------------

const loggedInUserId = 1;

// ------------------------------------------------

const PostCard = (record) => {
  const [expanded, setExpanded] = React.useState(false);

  // ------------------------------------------------

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // ------------------------------------------------

  return (
    <Card
      sx={{
        maxWidth: 800,
        paddingLeft: 1.5,
        paddingRight: 1.5,
        //margin: 2,
      }}
    >
      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      <CardHeader
        avatar={<AccountCircleIcon color="action" sx={{ fontSize: 45 }} />}
        action={
          record.userId === loggedInUserId ? (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
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
              render={(record) => `${record.name}, ${record.userType}`}
            />
          </ReferenceField>
        }
        subheader={dateHandling(record.createdAt)}
      />

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      <CardContent>
        <Typography
          variant="body1" //sx={{ whiteSpace: "pre" }}
        >
          {/* we have to make sure that spaces and new lines are displayed  */}
          {record?.content}
        </Typography>
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
          {numberHandling(record?.likes?.userIds?.length) +
            " likes" +
            "     " +
            numberHandling(record?.comments?.list?.length) +
            " Comments"}
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

      <PostComments expanded={expanded} {...record} />

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
    </Card>
  );
};

export default PostCard;

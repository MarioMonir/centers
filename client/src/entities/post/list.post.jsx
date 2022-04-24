import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import StepConnector from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
  FunctionField,
  ListBase,
  ReferenceField,
  useGetList,
} from "react-admin";
import { dateHandling, numberHandling } from "./dataHandling";
import LikeButton from "./LikeButton";
import PostComments from "./PostComments";

// ------------------------------------------------

const ShowComments = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  color: !expand ? "primary" : "secondary",
}));

// ------------------------------------------------

const ListPost = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // ------------------------------------------------

  const { data } = useGetList("post");

  return (
    <ListBase>
      <Grid>
        {data?.map((record) => (
          <Card
            key={record.id}
            sx={{
              maxWidth: 800,
              paddingLeft: 1.5,
              paddingRight: 1.5,
              margin: 2,
            }}
          >
            {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

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
                {numberHandling(record.likes.number) +
                  " likes" +
                  "     " +
                  numberHandling(
                    Object.keys(record.comments ? record.comments : {}).length
                  ) +
                  " Comments"}
              </Typography>
            </div>
            <StepConnector orientation="horizontal" />

            {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

            <CardActions>
              <LikeButton {...record} />

              <IconButton aria-label="comments" onClick={handleExpandClick}>
                <ChatBubbleIcon />
              </IconButton>
            </CardActions>

            {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

            <PostComments expanded={expanded} />

            {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}
          </Card>
        ))}
      </Grid>
    </ListBase>
  );
};

export default ListPost;

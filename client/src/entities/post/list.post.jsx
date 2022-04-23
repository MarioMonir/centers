import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
  FunctionField,
  ListBase,
  ReferenceField,
  useGetList,
} from "react-admin";

// ------------------------------------------------

const dataHandling = (createdAt) => {
  createdAt = new Date(createdAt);
  const now = new Date();
  let difference = (now - new Date(createdAt)) / (1000 * 60);
  if (difference > 60) {
    difference = difference / 60;
    if (difference > 24) {
      difference = difference / 24;
      if (difference > 7) {
        const day = createdAt.getDay();
        const month = createdAt.getMonth(); // month (in integer 0-11)
        const year = createdAt.getFullYear(); // year
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return months[month] + " " + day + ", " + year;
      } else {
        return Math.round(difference) + "d";
      }
    } else {
      return Math.round(difference) + "h";
    }
  } else {
    return Math.round(difference) + "m";
  }
};

// ------------------------------------------------

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  visibility: !expand ? "" : "hidden",
}));

const ListPost = () => {
  // ------------------------------------------------

  //console.log("===>",record);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // ------------------------------------------------

  const { data } = useGetList("post");
  //console.log(data);

  return (
    <ListBase>
      <Grid>
        {data?.map((record) => (
          <Card
            key={record.id}
            sx={{ maxWidth: "80%", padding: 1.5, margin: 2 }}
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
              subheader={dataHandling(record.createdAt)}
            />
            {/* <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
          /> */}
            <CardContent>
              <Typography
                variant="body1"
                //sx={{ whiteSpace: "pre" }}
              >
                {record?.content}
                {/* {content.split("\n").map((i, key) => {
                return <p key={key}>{i}</p>;
              })} */}
              </Typography>
              {/* <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                See More
              </ExpandMore> */}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
          </Card>
        ))}
      </Grid>
    </ListBase>
  );
};

export default ListPost;

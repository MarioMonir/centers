import {
  Loading,
  NotFound,
  NumberField,
  RecordContextProvider,
  Show,
  SimpleShowLayout,
  TextField,
  useGetOne,
  Title,
  useGetMany,
  useTranslate,
} from "react-admin";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";

// ------------------------------------------------

export default function ShowUser({ id }) {
  const { data, isLoading, error } = useGetOne(
    "user",
    { id },
    { enabled: id ? true : false }
  );

  if (error) console.error({ error });

  if (isLoading) return <Loading />;

  if (!data || error) return null;

  const date = new Date(data?.createdAt).toLocaleDateString();
  const translate = useTranslate();
  return (
    <RecordContextProvider value={data}>
      {/* <Show hasEdit={false}> */}
      <div>
        <Card sx={{ minWidth: 350 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {data?.name.charAt(0)}
              </Avatar>
            }
            title={data?.name}
            subheader={`since:${date}`}
          />

          <CardContent>
            <Typography
              sx={{ margin: "10px" }}
              variant="h6"
              color="textSecondary"
              component="p"
            >
              {translate("resources.user.fields.id")}: {data?.id}
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ margin: "10px" }}
              component="p"
            >
              {translate("resources.user.fields.email")}: {data?.email}
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ margin: "10px" }}
              component="p"
            >
              {translate("resources.user.fields.userType")}: {data?.userType}
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ margin: "10px" }}
              component="p"
            >
              {translate("resources.user.fields.videoUsageStorage")}:{" "}
              {data?.videoUsedStorage}
            </Typography>
          </CardContent>
          <CardActions disableSpacing></CardActions>
        </Card>
      </div>
      {/* <SimpleShowLayout>
            <Typography variant="h5">Student Info</Typography>

            <NumberField source="id" />
            <TextField source="name" />

            <TextField source="email" />
            <TextField source="password" />
            <TextField source="permission" />
          </SimpleShowLayout> */}
      {/* </Show> */}
    </RecordContextProvider>
  );
}

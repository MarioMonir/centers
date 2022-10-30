import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import React from "react";
import { useEffect, useState } from "react";
import {
  ReferenceField,
  TextField,
  useTheme,
  useTranslate,
  useGetList,
  useShowController,
} from "react-admin";
import PostActionButton from "../../post/components/PostActionsButton";

// ------------------------------------------------

const user = JSON.parse(localStorage.getItem("user"));
const loggedInUserId = user?.id;

// ------------------------------------------------

//-----------------------------------------------------

const GroupCard = (record) => {
  // ------------------------------------------------
  //filter groups by ownerId
  const [Groups, setGroups] = useState([]);

  const { data: GroupData, loading } = useGetList("group", {
    filter: { ownerUserId: loggedInUserId },
  });

  useEffect(() => {
    if (GroupData?.length) {
      setGroups(GroupData);
    }
  }, [GroupData]);
  // ------------------------------------------------
  const translate = useTranslate();
  const [theme] = useTheme();
  return (
    <Card
      sx={{
        width: 345,
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
        href={"#/group/" + record.id + "/show"}
        sx={{ minHeight: 300 }}
      >
        <CardHeader
          // action={
          //   record?.userId === loggedInUserId ? (
          //     <PostActionButton {...{ postId: record.id, setIsEditing }} />
          //   ) : null
          // }
          title={record.courseName + " - " + record.level}
          subheader={`# ${record.id}`}
        />

        <CardContent>
          <Typography color="text.secondary">
            {translate("resources.group.labels.teacher")}
          </Typography>
          <ReferenceField
            record={record}
            reference="user"
            source="teacherUserId"
            link={false} //"show"
          >
            <TextField source="name" />
          </ReferenceField>

          <Typography color="text.secondary" sx={{ paddingTop: 1 }}>
            {translate("resources.group.fields.groupType")}
          </Typography>
          <Typography variant="body2">
            {translate("resources.group.groupType." + record?.groupType, {
              _: "Translating...",
            })}
          </Typography>
          <Typography color="text.secondary" sx={{ paddingTop: 1 }}>
            {translate("resources.group.labels.weeklyDates")}
          </Typography>
          {Array.isArray(record?.dates) &&
            record?.dates?.map((date, index) => (
              <Typography key={index} variant="body2">
                {/* {translate("weekDays." + date.day)} {date.from} - {date.to} */}
                {date.day} {date.from} - {date.to}
              </Typography>
            ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GroupCard;

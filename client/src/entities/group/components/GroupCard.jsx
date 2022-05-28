import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import React from "react";
import { ReferenceField, TextField, useTheme, useTranslate } from "react-admin";

// ------------------------------------------------

const loggedInUserId = 1;

// ------------------------------------------------

const GroupCard = (record) => {
  // console.log(record);
  const translate = useTranslate();
  const [theme] = useTheme();
  return (
    <Card sx={{ width: 345, minHeight: 300 }}>
      <CardActionArea
        href={"#/group/" + record.id + "/show"}
        sx={{ minHeight: 300 }}
      >
        <CardHeader
          sx={{ color: "#000", backgroundColor: "#E7E7E7" }}
          action={
            record?.userId === loggedInUserId ? (
              <PostActionButton {...{ postId: record.id, setIsEditing }} />
            ) : null
          }
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
            {translate("resources.group.groupType." + record?.groupType)}
          </Typography>
          <Typography color="text.secondary" sx={{ paddingTop: 1 }}>
            {translate("resources.group.labels.weeklyDates")}
          </Typography>
          {record?.dates?.map((date, index) => (
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

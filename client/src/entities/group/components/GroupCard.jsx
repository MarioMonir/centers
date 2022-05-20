import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import React from "react";
import { ReferenceField, TextField, useTheme } from "react-admin";

// ------------------------------------------------

const loggedInUserId = 1;

// ------------------------------------------------

const GroupCard = (record) => {
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
          title={record.name + " - " + record.level}
          subheader={`Group # ${record.id}`}
        />

        <CardContent>
          <Typography color="text.secondary">Teacher</Typography>
          <ReferenceField
            record={record}
            reference="user"
            source="teacherId"
            link={false} //"show"
          >
            <TextField source="name" />
          </ReferenceField>

          <Typography color="text.secondary" sx={{ paddingTop: 1 }}>
            Via
          </Typography>
          <Typography variant="body2">{record.groupType}</Typography>
          <Typography color="text.secondary" sx={{ paddingTop: 1 }}>
            Weekly Dates
          </Typography>
          {record?.dates?.list?.map((date, index) => (
            <Typography key={index} variant="body2">
              {date.day} {date.from} - {date.to}
            </Typography>
          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GroupCard;

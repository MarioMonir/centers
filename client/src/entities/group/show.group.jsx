import AddTaskIcon from "@mui/icons-material/AddTask";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ClassIcon from "@mui/icons-material/Class";
import PeopleIcon from "@mui/icons-material/People";
import TimelineIcon from "@mui/icons-material/Timeline";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import React, { useState } from "react";
import {
  Button,
  Show,
  Tab,
  TabbedShowLayout,
  useCreate,
  useShowController,
} from "react-admin";
import { useParams } from "react-router-dom";
import ListAttendance from "../attendance/list.attendance";
import ListEnrolment from "../enrolment/list.enrolment";
import ListFlow from "../flow/list.flow";
import ListPost from "../post/list.post";
import ShowUser from "../user/show.user";

// ====================================================================

export default function ShowGroup() {
  // ------------------------------------------------

  const { id } = useParams();
  const { record } = useShowController();
  console.log({ record });
  // const record = useRecordContext();
  //console.log(record);

  // ------------------------------------------------

  const [create, { data: createdAttendance, isLoading, error }] = useCreate();
  const [formData, setFormData] = useState({
    groupId: parseInt(id),
    userId: undefined,
  });
  console.log("==>", formData);
  // ------------------------------------------------

  const handleFormChange = (e) => {
    // if (!e?.target?.value) return;
    setFormData({ ...formData, userId: parseInt(e?.target?.value) });
  };
  // ------------------------------------------------

  const submitCreateAttendance = () => {
    setFormData({ groupId: parseInt(id) });
    create("attendance", { data: formData });
  };

  // ------------------------------------------------

  return (
    <Show title={record.name}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "80%" }}>
          <TabbedShowLayout>
            <Tab label="Timeline" icon={<TimelineIcon />}>
              <ListPost groupId={parseInt(id)} />
            </Tab>

            <Tab
              label="Take Attendance"
              icon={<AddTaskIcon />}
              path="attendance/create"
            >
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%", padding: 10 }}>
                  <Card
                    sx={{
                      padding: 3,
                      marginTop: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Input
                      // sx={{ margin: 1 }}
                      placeholder="Student Code"
                      type="number"
                      value={formData.userId}
                      onChange={handleFormChange}
                      label="Student Code"
                      variant="outlined"
                    />
                    <Button
                      //disabled={!content || isLoading}
                      label="Save"
                      onClick={submitCreateAttendance}
                    />
                  </Card>
                </div>

                <div style={{ width: "50%", padding: 10 }}>
                  <ShowUser id={formData.userId} />
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ width: "50%", padding: 10 }}>
                  <ListAttendance />
                </div>

                <div style={{ width: "50%", padding: 10 }}>
                  <ListFlow />
                </div>
              </div>
            </Tab>

            <Tab
              label="Attendance Record"
              icon={<CheckBoxIcon />}
              path="attendance"
            >
              <ListAttendance />
            </Tab>

            <Tab label="Enrolments" icon={<PeopleIcon />} path="enrolment">
              <ListEnrolment groupId={parseInt(id)} />
            </Tab>

            <Tab label="Materials" icon={<ClassIcon />} path="material"></Tab>
          </TabbedShowLayout>
        </div>

        {/* <div
          style={{
            padding: 20,
            marginLeft: "auto",
             marginRight: "auto",
            // justifyContent: "space-evenly",
            // direction: "column",
          }}
        >
          <GroupCard {...record} />

          <Button
            variant="outlined"
            sx={{ width: 345, height: 80, marginTop: 2, fontSize: 17 }}
          >
            <AddTaskIcon sx={{ fontSize: 25, paddingRight: 2 }} />
            Take Attendance
          </Button>
          <Button
            variant="outlined"
            sx={{ width: 345, height: 80, marginTop: 2, fontSize: 17 }}
          >
            <PersonAddAltIcon sx={{ fontSize: 25, paddingRight: 2 }} />
            Enroll
          </Button>
        </div> */}
      </div>
    </Show>
  );
}

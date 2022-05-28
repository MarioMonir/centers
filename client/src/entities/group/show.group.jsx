import AddTaskIcon from "@mui/icons-material/AddTask";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ClassIcon from "@mui/icons-material/Class";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import TimelineIcon from "@mui/icons-material/Timeline";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import {
  Button,
  ShowBase,
  Tab,
  TabbedShowLayout,
  useCreate,
  useGetList,
  useShowController,
} from "react-admin";
import ListAttendance from "../attendance/list.attendance";
import ListEnrolment from "../enrolment/list.enrolment";
import ListFlow from "../flow/list.flow";
import ListPost from "../post/list.post";
import ShowUser from "../user/show.user";
import GroupCard from "./components/GroupCard";
// ====================================================================

export default function ShowGroup() {
  // ------------------------------------------------

  const { record } = useShowController();
  console.log({ record });

  // ------------------------------------------------

  const [create, { data: createdAttendance, isLoading, error }] = useCreate();
  const [formData, setFormData] = useState({
    studentId: null,
    homework: null,
    notes: "",
    lectureNumber: 1,
  });
  console.log({ formData });

  const { data: EnrolledStudents } = useGetList("enrolment", {
    filter: { groupId: record?.id },
  });

  // console.log("==>", { EnrolledStudents });
  // ------------------------------------------------

  const handleFormChange = (e) => {
    // if (!e?.target?.value) return;
    setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
  };
  // ------------------------------------------------

  const handleAutocompleteChange = (e, value) => {
    // if (!e?.target?.value) return;
    // console.log({ value });
    setFormData({ ...formData, studentId: value });
  };
  // ------------------------------------------------

  const submitCreateAttendance = () => {
    create("attendance", { data: { ...formData, groupId: record?.id } });
    setFormData({
      studentId: null,
      homework: null,
      notes: "",
      lectureNumber: 1,
    });
  };

  // ------------------------------------------------

  return (
    <ShowBase /*title={record.courseName}*/ hasEdit={false}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "75%", minWidth: 850 }}>
          <TabbedShowLayout>
            <Tab label="Timeline" icon={<TimelineIcon />}>
              <ListPost groupId={record?.id} />
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
                      // marginTop: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Autocomplete
                      sx={{ width: 235, marginBottom: 2 }}
                      value={formData.studentId}
                      onChange={handleAutocompleteChange}
                      variant="outlined"
                      options={
                        EnrolledStudents
                          ? EnrolledStudents.map((option) => option.studentId)
                          : []
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Student Code" />
                      )}
                    />

                    {/* <TextField
                      sx={{ marginBottom: 3 }}
                      label="Payment"
                      type="number"
                      variant="outlined"
                      name="amount"
                      value={formData.amount}
                      onChange={handleFormChange}
                    /> */}

                    <FormControl sx={{ marginBottom: 1 }}>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Homework
                      </FormLabel>
                      <RadioGroup
                        row
                        value={formData.homework}
                        onChange={handleFormChange}
                        // aria-labelledby="demo-row-radio-buttons-group-label"
                        name="homework"
                      >
                        <FormControlLabel
                          value="done"
                          control={<Radio />}
                          label="done"
                        />
                        <FormControlLabel
                          value="partial"
                          control={<Radio />}
                          label="partial"
                        />
                        <FormControlLabel
                          value="none"
                          control={<Radio />}
                          label="none"
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      sx={{ marginBottom: 2 }}
                      label="Homework Notes"
                      variant="outlined"
                      name="notes"
                      value={formData.notes}
                      onChange={handleFormChange}
                    />
                    <Button
                      sx={{  padding: 1 }}
                       variant="outlined"
                      disabled={!formData.studentId}
                      label="Save"
                      onClick={submitCreateAttendance}
                    />
                  </Card>
                </div>

                <div style={{ width: "50%", padding: 10 }}>
                  <ShowUser id={formData.studentId} />
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ width: "50%", padding: 10 }}>
                  {/* <ListAttendance /> */}
                </div>

                <div style={{ width: "50%", padding: 10 }}>
                  {/* <ListFlow /> */}
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
              <ListEnrolment groupId={record?.id} />
            </Tab>

            <Tab label="Materials" icon={<ClassIcon />} path="material"></Tab>
            <Tab label="Settings" icon={<SettingsIcon />} path="settings"></Tab>
          </TabbedShowLayout>
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            // marginRight: "auto",
            marginTop: 15,
            height: 300,
          }}
        >
          <GroupCard {...record} />
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
    </ShowBase>
  );
}

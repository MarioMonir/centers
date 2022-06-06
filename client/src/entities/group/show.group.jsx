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
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
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

// =======================================================

const loggedInUserId = 1;

// =======================================================

export default function ShowGroup() {
  const { record: group } = useShowController();

  // ------------------------------------------------

  const [create, { data: createdAttendance, isLoading, error }] = useCreate();

  const { data: EnrolledStudents } = useGetList("enrolment", {
    filter: { groupId: group?.id },
  });

  // ------------------------------------------------

  const [formData, setFormData] = useState({
    studentId: null,
    homework: null,
    homeworkNotes: "",
    lectureNumber: 1,
  });

  const [amount, setAmount] = useState("");

  // ------------------------------------------------

  const lectureDatesSize = group?.actualLectureDates?.length;

  useEffect(() => {
    if (
      !formData.lectureNumber &&
      (lectureDatesSize || lectureDatesSize === 0)
    ) {
      setFormData({
        ...formData,
        lectureNumber:
          lectureDatesSize > 0
            ? new Date() -
                new Date(group?.actualLectureDates[lectureDatesSize - 1]) <
              24 * 60 * 60 * 1000
              ? lectureDatesSize
              : lectureDatesSize + 1
            : 1,
      });
    }
  }, [lectureDatesSize]);

  // ------------------------------------------------

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
  };
  // ------------------------------------------------

  const handleAutocompleteChange = (e, value) => {
    setFormData({ ...formData, studentId: value });
  };
  // ------------------------------------------------

  const handleAmountChange = (e) => {
    setAmount(parseInt(e?.target?.value));
  };
  // ------------------------------------------------

  const submitCreateAttendance = () => {
    create("attendance", {
      data:
        amount > 0
          ? {
              toUserId: loggedInUserId,
              attendance: {
                ...formData,
                groupId: group?.id,
                studentId: parseInt(formData.studentId),
                lectureNumber: parseInt(formData.lectureNumber),
              },
              flow: {
                fromUserId: parseInt(formData.studentId),
                toUserId: loggedInUserId,
                groupId: group?.id,
                description: "payOnEntry",
                credit: amount,
              },
            }
          : {
              toUserId: loggedInUserId,
              attendance: {
                ...formData,
                groupId: group?.id,
                studentId: parseInt(formData.studentId),
                lectureNumber: parseInt(formData.lectureNumber),
              },
            },
    });
    setFormData({
      ...formData,
      studentId: null,
      homework: null,
      homeworkNotes: "",
    });
    setAmount("");
  };

  // ------------------------------------------------

  return (
    <ShowBase /*title={group.courseName}*/ hasEdit={false}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "75%", minWidth: 850 }}>
          <TabbedShowLayout>
            <Tab label="Timeline" icon={<TimelineIcon />}>
              <ListPost groupId={group?.id} />
            </Tab>

            {/* ----------------------------------------------------- */}

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
                    <TextField
                      sx={{ marginBottom: 2 }}
                      size="small"
                      label="Lecture Auto-Numbering"
                      type="number"
                      variant="outlined"
                      name="lectureNumber"
                      value={formData.lectureNumber}
                      onChange={handleFormChange}
                    />
                    <Autocomplete
                      sx={{ width: 235, marginBottom: 2 }}
                      size="small"
                      value={formData.studentId}
                      onChange={handleAutocompleteChange}
                      variant="outlined"
                      options={
                        EnrolledStudents
                          ? EnrolledStudents.map(
                              (option) => "" + option.studentId
                            )
                          : []
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Student Code" />
                      )}
                    />

                    <TextField
                      InputProps={{ inputProps: { min: 0 } }}
                      sx={{ marginBottom: 2 }}
                      size="small"
                      label="Payment"
                      type="number"
                      variant="outlined"
                      name="amount"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                    <div style={{ display: "flex" }}>
                      <FormControl sx={{ marginBottom: 2 }}>
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
                        sx={{ margin: "auto" }}
                        size="small"
                        label="Homework Notes"
                        variant="outlined"
                        name="homeworkNotes"
                        value={formData.notes}
                        onChange={handleFormChange}
                      />
                    </div>
                    <Button
                      size="medium"
                      fullWidth
                      variant="outlined"
                      disabled={!formData.studentId}
                      label="Save"
                      onClick={submitCreateAttendance}
                    />
                  </Card>
                </div>
                {formData?.studentId ? (
                  <div style={{ width: "50%", padding: 10 }}>
                    <Typography variant="h6" /*sx={{ padding: 2 }}*/>
                      Student Info
                    </Typography>
                    <ShowUser id={formData.studentId} />
                  </div>
                ) : null}
              </div>
              {formData?.studentId ? (
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%", padding: 10 }}>
                    <Typography variant="h6" /*sx={{ padding: 2 }}*/>
                      Attendance Record
                    </Typography>
                    <ListAttendance
                      {...{
                        studentId: parseInt(formData?.studentId),
                        groupId: group?.id,
                      }}
                    />
                  </div>

                  <div style={{ width: "50%", padding: 10 }}>
                    <Typography variant="h6" /*sx={{ padding: 2 }}*/>
                      Payment Record
                    </Typography>
                    <ListFlow studentId={parseInt(formData?.studentId)} />
                  </div>
                </div>
              ) : null}
            </Tab>

            {/* ----------------------------------------------------- */}

            <Tab
              label="Attendance Record"
              icon={<CheckBoxIcon />}
              path="attendance"
            >
              <ListAttendance />
            </Tab>

            {/* ----------------------------------------------------- */}

            <Tab label="Enrolments" icon={<PeopleIcon />} path="enrolment">
              <ListEnrolment groupId={group?.id} />
            </Tab>

            {/* ----------------------------------------------------- */}

            <Tab label="Materials" icon={<ClassIcon />} path="material"></Tab>

            {/* ----------------------------------------------------- */}

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
          <GroupCard {...group} />
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
          <GroupCard {...group} />

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

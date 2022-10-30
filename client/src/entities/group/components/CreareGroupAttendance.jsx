import { useState } from "react";
import {
  useGetList,
  useShowController,
  useCreate,
  useTranslate,
} from "react-admin";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "react-admin";
import ListAttendance from "../../attendance/list.attendance";

import ListFlow from "../../flow/list.flow";
import ShowUser from "../../user/show.user";

import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Protected from "../../../reactAdmin/components/Protected";
// =================================================================

const styles = {
  container: { display: "flex" },
  body: { width: "50%", padding: 10 },
  card: {
    padding: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
};

// =================================================================

// =================================================================

export default function GroupAttendance({ formData, setFormData }) {
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));
  // -------------------------------------
  const translate = useTranslate();
  const [amount, setAmount] = useState("");
  const studentId = parseInt(formData?.studentId) || null;
  const lectureNumber = parseInt(formData?.lectureNumber);

  // -------------------------------------

  const { record: group } = useShowController();

  const [create, { data: createdAttendance, isLoading, error }] = useCreate();

  // -------------------------------------

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
  };

  const handleAutocompleteChange = (e, value) => {
    setFormData({ ...formData, studentId: parseInt(value) });
  };

  const [groupNumber, setGroupNumber] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const [loggedUser, setLoggedUser] = useState([]);

  useEffect(() => {
    setLoggedUser(user);
  }, []);
  const { data: groupsNumber } = useGetList("group", {
    filter: { ownerUserId: loggedUser?.id },
    sort: { field: "id", order: "ASC" },
  });

  useEffect(() => {
    if (groupsNumber?.length) {
      setGroupNumber(groupsNumber);
    }
  }, [groupsNumber]);

  const [groupNumberId, setGroupNumberId] = useState(1);
  const [intNumber, setIntNumber] = useState();

  const handleGroupNumberChange = (e, value) => {
    groupNumber.find((group) => {
      if (group.courseName === value.props.value) {
        setGroupNumberId(group.id);
        setFormData({
          ...formData,
          groupSelected: value.props.value,
          groupId: group.id,
        });
      }
    });
  };
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const handleChangePagination = (event, value) => {
    setPage(value);
  };
  const { data: EnrolledStudents } = useGetList("enrolment", {
    filter: { groupId: groupNumberId },
    pagination: { page, perPage: 10 },
  });

  useEffect(() => {
    if (EnrolledStudents) {
      setTotalPages(Math.floor(EnrolledStudents?.length / 6) + 1);
    }
  }, [EnrolledStudents]);

  // -------------------------------------
  const submitCreateAttendance = () => {
    create("attendance", {
      data:
        amount > 0
          ? {
              toUserId: loggedUser?.id,
              attendance: {
                ...formData,
                groupId: group?.id,
                studentId: parseInt(formData?.studentId),
                lectureNumber: parseInt(formData?.lectureNumber),
              },
              flow: {
                fromUserId: parseInt(formData?.studentId),
                toUserId: loggedUser?.id,
                groupId: group?.id,
                description: "payOnEntry",
                credit: amount,
              },
            }
          : {
              toUserId: loggedUser?.id,
              attendance: {
                ...formData,
                groupId: group?.id,
                studentId: parseInt(formData?.studentId),
                lectureNumber: parseInt(formData?.lectureNumber),
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

  // -------------------------------------

  return (
    <Protected loggedUser={loggedUser}>
      <>
        <div style={styles.container}>
          <div style={styles.body}>
            <Card sx={styles.card}>
              <TextField
                required={true}
                sx={{ marginBottom: 2, minWidth: 235 }}
                size="small"
                label={translate("resources.group.labels.lectureNumber")}
                type="number"
                variant="outlined"
                name="lectureNumber"
                value={lectureNumber}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 1,
                  step: 1,
                }}
                onChange={handleFormChange}
              />

              <TextField
                required={true}
                variant="outlined"
                select
                sx={{ marginBottom: 2, minWidth: 235 }}
                onChange={handleGroupNumberChange}
                label={translate("resources.group.labels.SelectGroup")}
              >
                {groupNumber?.map((group) => (
                  <MenuItem key={group?.id} value={group?.courseName}>
                    {group?.courseName}
                  </MenuItem>
                ))}
              </TextField>

              <Autocomplete
                sx={{ width: 235, marginBottom: 2 }}
                size="small"
                value={studentId}
                onChange={handleAutocompleteChange}
                variant="outlined"
                options={
                  EnrolledStudents
                    ? EnrolledStudents?.map((option) => "" + option?.studentId)
                    : []
                }
                renderInput={(params) => (
                  <TextField
                    required={true}
                    {...params}
                    label={translate("resources.group.labels.studentCode")}
                    variant="outlined"
                  />
                )}
              />

              <TextField
                required={true}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                  setIntNumber(onlyNums);
                }}
                inputProps={{
                  value: intNumber,
                }}
                sx={{ marginBottom: 2, minWidth: 235 }}
                size="small"
                label={translate("resources.group.labels.payment")}
                type="number"
                variant="outlined"
                name="amount"
              />
              <div style={{ display: "flex" }}>
                <FormControl sx={{ marginBottom: 2 }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    {translate("resources.group.labels.homework")}
                  </FormLabel>
                  <RadioGroup
                    row
                    value={formData?.homework}
                    onChange={handleFormChange}
                    name="homework"
                  >
                    <FormControlLabel
                      value="done"
                      control={<Radio />}
                      label={translate("resources.group.labels.done")}
                    />
                    <FormControlLabel
                      value="partial"
                      control={<Radio />}
                      label={translate("resources.group.labels.partial")}
                    />
                    <FormControlLabel
                      value="none"
                      control={<Radio />}
                      label={translate("resources.group.labels.none")}
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  sx={{ marginRight: 3, marginTop: 4 }}
                  size="small"
                  label={translate("resources.group.labels.homeworkNotes")}
                  variant="outlined"
                  name="homeworkNotes"
                  value={formData?.notes}
                  onChange={handleFormChange}
                />
              </div>
              <Button
                size="medium"
                fullWidth
                variant="outlined"
                disabled={!studentId}
                label="Save"
                onClick={submitCreateAttendance}
              />
            </Card>
          </div>
          {studentId ? (
            <div style={{ width: "50%", padding: 10 }}>
              <Typography variant="h6" /*sx={{ padding: 2 }}*/>
                {lang === "ar" ? "معلومات الطالب" : "Student Information"}
              </Typography>
              <ShowUser id={formData?.studentId} />
            </div>
          ) : null}
        </div>
        {studentId ? (
          <>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "50%",
                  padding: 10,

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" /*sx={{ padding: 2 }}*/>
                  {lang === "ar" ? "سجل الحضور" : "Attendance Record"}
                </Typography>
                <ListAttendance dataFormated={formData} />
                {/* <Stack spacing={2} sx={{ margin: 4 }}>
                <Pagination onChange={handleChangePagination} page={page} />
              </Stack> */}
                <Stack spacing={2}>
                  <Typography>
                    {lang === "ar" ? "الصفحة" : "Page"} {page}
                  </Typography>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePagination}
                  />
                </Stack>
              </div>
              <div
                style={{
                  width: "50%",
                  padding: 10,

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" /*sx={{ padding: 2 }}*/>
                  {lang === "ar" ? "المدفوعات" : "Payments"}
                </Typography>
                <ListFlow studentId={studentId} />
                <Stack spacing={2} sx={{ marginTop: 2, marginLeft: 2 }}>
                  <Pagination count={Array(formData).length} />
                </Stack>
              </div>
            </div>
          </>
        ) : null}
      </>
    </Protected>
  );
}

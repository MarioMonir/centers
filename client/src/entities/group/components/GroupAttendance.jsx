import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ListAttendance from "../../attendance/list.attendance";
import ListFlow from "../../flow/list.flow";
import ShowUser from "../../user/show.user";
import { Button } from "react-admin";

// ================================================================

const styles = {
  sx: {
    padding: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
};

// ================================================================

export default function GroupAttendance({
  formData,
  handleFormChange,
  handleAutocompleteChange,
  handleAmountChange,
  submitCreateAttendance,
  EnrolledStudents,
  amount,
}) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", padding: 10 }}>
          <Card sx={styles.sx}>
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
                  ? EnrolledStudents.map((option) => "" + option.studentId)
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
    </>
  );
}

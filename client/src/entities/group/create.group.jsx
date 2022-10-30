import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Stack from "@mui/material/Stack";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import {
  ArrayInput,
  AutocompleteInput,
  BooleanInput,
  Create,
  FormDataConsumer,
  NumberInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useTranslate,
  regex,
  ReferenceInput,
  DateInput,
} from "react-admin";

import levels from "../../utils/levels";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Protected from "../../reactAdmin/components/Protected";

// ------------------------------------------------

const Levels = JSON.parse(localStorage.getItem("levels")) || levels;

// ------------------------------------------------

export default function CreateGroup() {
  const translate = useTranslate();

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  const [dataForm, setDataForm] = useState({
    paymentType: "",
    numberOfLectures: 0,
    paymentCost: 0,
    public: false,
    ownerUserId: 1,
    dates: [{ day: "", from: "", to: "" }],
    lectures: {},

    centerCollectsFees: false,
    centeCostPerLecture: 0,
  });

  const [hoverText, setHoverText] = useState("");
  const [fromDate, setFromDate] = useState([]);
  const [toDate, setToDate] = useState("");
  const [saleToggle, setSaleToggle] = useState(false);
  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    setLoggedUser(user);
  }, []);

  const transform = (data) => {
    return {
      ...data,
      ownerUserId: loggedUser.id,
      teacherUserId:
        loggedUser.userType === "Teacher" ? loggedUser.id : data.teacherUserId,
    };
  };

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Protected loggedUser={loggedUser}>
      <Create
        redirect="show"
        transform={transform}
        sx={{
          marginTop: 3,
        }}
      >
        <SimpleForm>
          {loggedUser?.userType !== "Teacher" && (
            <>
              <div
                style={{
                  display: "flex",

                  alignItems: "center",
                }}
              >
                <ReferenceInput
                  source="teacherUserId"
                  reference="user"
                  filter={{ userType: "Teacher" }}
                >
                  <AutocompleteInput
                    label={translate("resources.group.labels.teacher")}
                    sx={{ minWidth: 235 }}
                    source="teacherUserId"
                    variant="outlined"
                    optionText="name"
                  />
                </ReferenceInput>
                <InfoOutlinedIcon
                  sx={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    cursor: "pointer",
                    color: "#00bcd4",
                  }}
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  onMouseOver={() => {
                    setHoverText("TeacherName");
                  }}
                />
              </div>
            </>
          )}

          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <TextInput
              required={true}
              source="courseName"
              variant="outlined"
              onChange={(e) => {
                setDataForm({ ...dataForm, courseName: e.target.value });
              }}
              sx={{ minWidth: 235 }}
            />
            <InfoOutlinedIcon
              sx={{
                marginLeft: "10px",
                marginRight: "10px",
                cursor: "pointer",
                color: "#00bcd4",
              }}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              onMouseOver={() => {
                setHoverText("CourseName");
              }}
            />
          </div>
          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <SelectInput
              required={true}
              sx={{ minWidth: 235 }}
              variant="outlined"
              source="level"
              choices={Levels}
              optionText="name"
              optionValue="id"
              createLabel="asd"
              onCreate={(value) => {
                const newLevel = {
                  id: value,
                  name: value,
                };
                Levels.push(newLevel);
                localStorage.setItem("levels", JSON.stringify(Levels));
                return newLevel;
              }}
              onChange={(e, value) => {
                setDataForm({ ...dataForm, level: e.target.value });
              }}
            />
            <InfoOutlinedIcon
              sx={{
                marginLeft: "10px",
                marginRight: "10px",
                cursor: "pointer",
                color: "#00bcd4",
              }}
            />
          </div>

          {/* <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="normal"
              sx={{ marginTop: "-1rem", marginLeft: "10px" }}
            >
              <FormControlLabel
                value="normal"
                control={<Radio />}
                label={translate("resources.group.labels.normal")}
                onClick={() => setSaleToggle(false)}
                labelPlacement={translate("resources.group.labels.normal")}
              />
              <FormControlLabel
                value="sale"
                onClick={() => {
                  setSaleToggle(true);
                }}
                control={<Radio />}
                label={translate("resources.group.labels.sale")}
                labelPlacement={translate("resources.group.labels.sale")}
              />
            </RadioGroup>
          </FormControl> */}
          {/* {saleToggle && (
            <>
              <div
                style={{
                  display: "flex",

                  alignItems: "center",
                }}
              >
                <TextInput
                  required={true}
                  label="payment cost"
                  source="paymentCost"
                  variant="outlined"
                  type="number"
                  inputProps={{ min: "0" }}
                  sx={{ minWidth: 235 }}
                />
                <InfoOutlinedIcon
                  sx={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    cursor: "pointer",
                    color: "#00bcd4",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",

                  alignItems: "center",
                }}
              >
                <TextInput
                  required={true}
                  label="cost per lecture"
                  source="costPerCenterlecture"
                  type="number"
                  inputProps={{ min: "0" }}
                  variant="outlined"
                  sx={{ minWidth: 235 }}
                />
                <InfoOutlinedIcon
                  sx={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    cursor: "pointer",
                    color: "#00bcd4",
                  }}
                />
              </div>
            </>
          )} */}
          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <SelectInput
              sx={{ minWidth: 235 }}
              required={true}
              choices={[
                { id: "InPerson", name: "resources.group.groupType.InPerson" },
                { id: "Online", name: "resources.group.groupType.Online" },
                { id: "Hypred", name: "resources.group.groupType.Hypred" },
              ]}
              variant="outlined"
              source="groupType"
            />
            <InfoOutlinedIcon
              sx={{
                marginLeft: "10px",
                marginRight: "10px",
                cursor: "pointer",
                color: "#00bcd4",
              }}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              onMouseOver={() => {
                setHoverText("groupType");
              }}
            />
          </div>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>{hoverText}</Typography>
          </Popover>

          <FormDataConsumer>
            {({ formData, ...rest }) =>
              (formData.groupType === "InPerson" ||
                formData.groupType === "Hypred") &&
              loggedUser.userType === "Teacher" && (
                <TextInput
                  variant="outlined"
                  source="location"
                  required={true}
                />
              )
            }
          </FormDataConsumer>

          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <SelectInput
              sx={{ minWidth: 235 }}
              required={true}
              choices={[
                { id: "Lecture", name: "resources.group.paymentType.Lecture" },
                { id: "Month", name: "resources.group.paymentType.Month" },
                {
                  id: "Installment",
                  name: "resources.group.paymentType.Installment",
                },
              ]}
              variant="outlined"
              source="paymentType"
              onChange={(e, value) => {
                console.log("CAHNGE");
                setDataForm({
                  ...dataForm,
                  paymentType: e.target.value,
                  centeCostPerLecture: 0,
                  paymentCost: 0,
                  numberOfLectures: 0,
                });
              }}
            />
            <InfoOutlinedIcon
              sx={{
                marginLeft: "10px",
                marginRight: "10px",
                cursor: "pointer",
                color: "#00bcd4",
              }}
            />
          </div>

          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.paymentType === "Month" && (
                <>
                  <div
                    style={{
                      display: "flex",

                      alignItems: "center",
                    }}
                  >
                    <NumberInput
                      required={true}
                      sx={{ minWidth: 235 }}
                      variant="outlined"
                      onChange={(e, value) => {
                        console.log(e.target.value);
                        setDataForm({
                          ...dataForm,
                          numberOfLectures: e.target.value,
                        });
                      }}
                      inputProps={{
                        value: dataForm.numberOfLectures,
                      }}
                      source="numberOfLectures"
                      min={1}
                      label={translate(
                        "resources.group.labels.numberOfLectures"
                      )}
                    />
                    <InfoOutlinedIcon
                      sx={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#00bcd4",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",

                      alignItems: "center",
                    }}
                  >
                    <NumberInput
                      sx={{ minWidth: 235 }}
                      variant="outlined"
                      source="paymentCost"
                      required={true}
                      onChange={(e) => {
                        setDataForm({
                          ...dataForm,
                          paymentCost: e.target.value,
                        });
                      }}
                      inputProps={{
                        value: dataForm.paymentCost,
                        pattern: "[0-9]*",
                      }}
                      min={1}
                      label={translate(
                        "resources.group.paymentCostlabel." +
                          formData.paymentType
                      )}
                    />

                    <InfoOutlinedIcon
                      sx={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#00bcd4",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",

                      alignItems: "center",
                    }}
                  >
                    {/* <NumberInput
                      sx={{ minWidth: 235 }}
                      variant="outlined"
                     label={
                      "total cost"
                     }
                      inputProps={{
                        value: dataForm.paymentCost / dataForm.numberOfLectures,
                        pattern: "[0-9]*",
                      }}
                      disabled={true}
                      min={1}
                    /> */}
                  </div>
                </>
              )
            }
          </FormDataConsumer>

          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.paymentType === "Lecture" && (
                <>
                  <div
                    style={{
                      display: "flex",

                      alignItems: "center",
                    }}
                  >
                    {/* <NumberInput
                      required={true}
                      sx={{ minWidth: 235 }}
                      variant="outlined"
                      source="numberOfLectures"
                      min={1}
                      inputProps={{
                        pattern: "[0-9]*",
                      }}
                      label={translate(
                        "resources.group.labels.numberOfLectures"
                      )}
                    /> */}
                    {/* <InfoOutlinedIcon
                      sx={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#00bcd4",
                      }}
                    /> */}
                  </div>
                  <div
                    style={{
                      display: "flex",

                      alignItems: "center",
                    }}
                  >
                    <NumberInput
                      required={true}
                      sx={{ minWidth: 235 }}
                      variant="outlined"
                      source="paymentCost"
                      min={1}
                      onChange={(e) => {
                        setDataForm({
                          ...dataForm,
                          paymentCost: e.target.value,
                        });
                      }}
                      inputProps={{
                        value: dataForm.paymentCost,
                        pattern: "[0-9]*",
                      }}
                      label={translate(
                        "resources.group.paymentCostlabel." +
                          formData.paymentType
                      )}
                    />
                    <InfoOutlinedIcon
                      sx={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#00bcd4",
                      }}
                    />
                  </div>
                </>
              )
            }
          </FormDataConsumer>

          {/* <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.paymentType && (
              <NumberInput
                variant="outlined"
                source="paymentCost"
                defaultValue={0}
                min={1}
                label={translate(
                  "resources.group.paymentCostlabel." + formData.paymentType
                )}
              />
            )
          }
        </FormDataConsumer> */}

          <FormDataConsumer>
            {({ formData, ...rest }) =>
              formData.paymentType &&
              loggedUser.userType === "Center" && (
                <>
                  <div
                    style={{
                      display: "flex",

                      alignItems: "center",
                    }}
                  >
                    <NumberInput
                      required={true}
                      variant="outlined"
                      sx={{ minWidth: 235 }}
                      min={1}
                      onChange={(e) => {
                        setDataForm({
                          ...dataForm,
                          centeCostPerLecture: e.target.value,
                        });
                      }}
                      inputProps={{
                        value: dataForm.centeCostPerLecture,
                        pattern: "[0-9]*",
                      }}
                      source="centerCostPerLecture"
                      label={translate(
                        "resources.group.fields.centerCostPerLecture"
                      )}
                    />
                    <InfoOutlinedIcon
                      sx={{
                        marginLeft: "10px",
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#00bcd4",
                      }}
                    />
                  </div>
                </>
              )
            }
          </FormDataConsumer>
          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <BooleanInput
              required={true}
              variant="outlined"
              isRequired={true}
              source="public"
              onChange={(e) => {
                setDataForm({ ...dataForm, public: e.target.checked });
              }}
            />
            <InfoOutlinedIcon
              sx={{
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "20px",
                cursor: "pointer",
                color: "#00bcd4",
              }}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              onMouseOver={(e) => {
                setHoverText("public to All users");
              }}
            />
          </div>

          <ArrayInput
            source="dates"
            sx={{ minWidth: 235 }}
            label={translate("resources.group.labels.weeklyDates")}
            required={true}
          >
            <SimpleFormIterator>
              <SelectInput
                required
                label={translate("resources.group.labels.day")}
                sx={{ minWidth: 255 }}
                source="day"
                choices={[
                  { id: "sat", name: "weekDays.sat" },
                  { id: "sun", name: "weekDays.sun" },
                  { id: "mon", name: "weekDays.mon" },
                  { id: "tue", name: "weekDays.tue" },
                  { id: "wed", name: "weekDays.wed" },
                  { id: "thu", name: "weekDays.thu" },
                  { id: "fri", name: "weekDays.fri" },
                ]}
                variant="outlined"
              />
              <TextField
                sx={{ minWidth: 255, marginTop: "-10px" }}
                source="from"
                required={true}
                type="time"
                helperText="from"
                variant="outlined"
              />
              <TextField
                required={true}
                sx={{ minWidth: 255 }}
                source="to"
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
                type="time"
                helperText="To"
                variant="outlined"
              />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleForm>
      </Create>
    </Protected>
  );
}

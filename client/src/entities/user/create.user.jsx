import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  Title,
  SimpleForm,
  TextInput,
  SelectInput,
  Create,
  useTranslate,
} from "react-admin";
import Protected from "../../../src/reactAdmin/components/Protected";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import emailjs from "@emailjs/browser";
import config from "../../configs/config";
const Permissions = [
  { title: "start stream" },
  { title: "take attendance" },
  { title: "upload videos" },
  { title: "enrolment" },
];
const RoleDeveloper = [
  {
    type: "TeacherAssistant",
  },
  {
    type: "Teacher",
  },
  {
    type: "Student",
  },
  {
    type: "Center",
  },
  {
    type: "CenterEmployee",
  },
];
const RoleTeacher = [
  {
    type: "TeacherAssistant",
  },
];
const RoleCenter = [
  {
    type: "CenterEmployee",
  },
];

function CreateUser() {
  const translate = useTranslate();
  let passwordgenerated;
  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));
  useEffect(() => {
    setLoggedUser(user);
  }, []);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PermissionsValue, setPermissionsValue] = useState({});
  const [Role, setRole] = useState("");

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.title,
  });

  const passwordGenerator = () => {
    passwordgenerated = Math.random().toString(36).slice(-10);

    return passwordgenerated;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    // commented out for testing purposes
    console.log(Email, passwordgenerated, Name, Role, PermissionsValue);
    await emailjs
      .sendForm(
        "service_85f219m",
        "template_hp9zvaw",
        e.target,
        "HQ0LoaHvpuzLLf5Hv"
      )
      .then((result) => {})
      .catch((error) => {});

    fetch(`${config.baseUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: Name,
        email: Email,
        password: passwordgenerated,
        userType: Role,
        permission: PermissionsValue,
      }),
    })
      .then((res) => {})
      .catch((err) => console.error(err));
  };

  return (
    <Protected loggedUser={loggedUser}>
      <div>
        <Card
          sx={{
            marginTop: 5,
          }}
        >
          <Create transform={(data) => ({ ...data, info: {} })}>
            <form onSubmit={sendEmail}>
              <Stack spacing={2} sx={{ margin: 3 }}>
                <Typography
                  sx={{
                    // marginRight: "10px",
                    // marginLeft: "10px",
                    cursor: "pointer",
                    color: "blue",
                  }}
                  variant="overline"
                  gutterBottom
                >
                  {lang === "ar" ? "إنشاء مستخدم جديد" : "Create New User"}
                </Typography>
                <TextField
                  id="outlined-basic"
                  label={translate("resources.user.fields.name")}
                  name="Name"
                  required
                  inputProps={{
                    pattern: "[a-z]*",
                    title:
                      "Only lowercase letters allowed no spaces no numbers",
                  }}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  sx={{ width: "20%", marginY: "10px" }}
                />
                <TextField
                  id="outlined-basic"
                  label={translate("resources.user.fields.email")}
                  required
                  inputProps={{
                    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                    title: "Please enter a valid email",
                  }}
                  name="To_Email"
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  sx={{ width: "20%", marginY: "10px" }}
                />
                <input
                  type="hidden"
                  id="custId"
                  name="OTP_Password"
                  value={passwordGenerator()}
                />

                <Autocomplete
                  multiple
                  required
                  id="tags-standard"
                  sx={{ width: "20%", marginY: "10px", cursor: "pointer" }}
                  options={
                    loggedUser?.userType?.toLowerCase() === "developer"
                      ? RoleDeveloper
                      : loggedUser?.userType?.toLowerCase() === "teacher"
                      ? RoleTeacher
                      : RoleCenter
                  }
                  getOptionLabel={(option) => option?.type}
                  onChange={(e, value) => {
                    setRole(e.target.textContent);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={lang === "ar" ? "نوع المستخدم" : "User Type"}
                      placeholder={"role"}
                    />
                  )}
                />
                <Autocomplete
                  multiple
                  required
                  id="tags-standard"
                  sx={{ width: "20%", marginY: "10px", cursor: "pointer" }}
                  options={Permissions}
                  getOptionLabel={(option) => option?.title}
                  onChange={(e, value) => setPermissionsValue(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={translate("resources.user.fields.permission")}
                      placeholder={translate(
                        "resources.user.fields.permission"
                      )}
                    />
                  )}
                />
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  type="submit"
                  sx={{ width: "20%" }}
                >
                  {translate("resources.user.fields.create")}
                </Button>
              </Stack>
            </form>
          </Create>
        </Card>
      </div>
    </Protected>
  );
}

export default CreateUser;

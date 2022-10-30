import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const userType = ["Teacher", "Student", "TeacherAssistant"];
import levels from "../../utils/levels";
import { signup } from "../../configs/external-http-client/external-api.queries";
import config from "../../configs/config";

// ===============================================================
const arabicLevels = [
  { id: "الصف الاول الابتدائي", name: "الصف الاول الابتدائي" },
  { id: "الصف الثاني الابتدائي", name: "الصف الثاني الابتدائي" },
  { id: "الصف الثالث الابتدائي", name: "الصف الثالث الابتدائي" },
  { id: "الصف الرابع الابتدائي", name: "الصف الرابع الابتدائي" },
  { id: "الصف الخامس الابتدائي", name: "الصف الخامس الابتدائي" },
  { id: "الصف السادس الابتدائي", name: "الصف السادس الابتدائي" },

  { id: "الصف الاول الاعدادي", name: "الصف الاول الاعدادي" },
  { id: "الصف الثاني الاعدادي", name: "الصف الثاني الاعدادي" },
  { id: "الصف الثالث الاعدادي", name: "الصف الثالث الاعدادي" },

  { id: "الصف الاول الثانوي", name: "الصف الاول الثانوي" },
  { id: "الصف الثاني الثانوي", name: "الصف الثاني الثانوي" },
  { id: "الصف الثالث الثانوي", name: "الصف الثالث الثانوي" },
];
const EnglishLevels = [
  { id: "Junior 1", name: "Junior 1" },
  { id: "Junior 2", name: "Junior 2" },
  { id: "Junior 3", name: "Junior 3" },
  { id: "Junior 4", name: "Junior 4" },
  { id: "Junior 5", name: "Junior 5" },
  { id: "Junior 6", name: "Junior 6" },

  { id: "Middle 1", name: "Middle 1" },
  { id: "Middle 2", name: "Middle 2" },
  { id: "Middle 3", name: "Middle 3" },

  { id: "Senior 1", name: "Senior 1" },
  { id: "Senior 2", name: "Senior 2" },
  { id: "Senior 3", name: "Senior 3" },
];
// ===============================================================
const Levels = JSON.parse(localStorage.getItem("levels")) || levels;
export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [PasswordUser, setPasswordUser] = useState("");
  const [PasswordConfirmation, setPasswordConfirmation] = useState("");
  const [UserLevel, setUserLevel] = useState("");
  const [language, setLanguage] = useState(false);
  const [passToggle, setPassToggle] = useState(false);
  const [confirmPassToggle, setConfirmPassToggle] = useState(false);
  const [Name, setName] = useState("");
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const handleCreate = (e) => {
    e.preventDefault();
    if (PasswordUser !== PasswordConfirmation) {
      setError(true);
      setErrorMessage("Passwords do not match");
    } else {
      fetch(`${config.baseUrl}/oauth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          email: email,
          password: PasswordUser,
          userType: "Student",
          permission: [{ level: UserLevel }],
          info: { info2: "student" },
        }),
      })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            setOpen(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "30%",
          },

          marginTop: {
            xs: "10px",
            md: "0px",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            margin: "10px",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "#013e5a",

            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "bold",
            }}
          >
            {language ? " welcome back" : " مرحبا بعودتك"}
          </h1>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",

              lineHeight: "1.5",
            }}
          >
            {language
              ? " to keep connected with us please login with your personal info"
              : " للبقاء متصلاً معنا يرجى تسجيل الدخول باستخدام معلوماتك الشخصية"}
          </span>
          <Button
            sx={{
              background: "linear-gradient(to right, #36d1dc, #5b86e5)",

              color: "white",
              width: "70%",
              padding: "10px",
              borderRadius: "20px",
              marginTop: "10px",
              "&:hover": {
                boxShadow: "0px 0px 10px #013e5a",
                scale: "1.1",
              },
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            {language ? "Login" : "تسجيل الدخول"}
          </Button>
          <span
            style={{
              color: "#013e5a",
              marginTop: "10px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              setLanguage(!language);
            }}
          >
            {language ? "arabic" : "english"}
          </span>
        </Box>
      </Box>
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "70%",
          },

          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "#013e5a",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            margin: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              {language ? "create account" : "انشاء حساب"}
            </h1>
            <span
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {language
                ? "Sign up with your social"
                : "تسجيل الدخول باستخدام حسابك الاجتماعي"}
            </span>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: {
                xs: "0px",
                md: "10px",
              },
            }}
          >
            <FacebookIcon
              fontSize="large"
              sx={{
                margin: "10px",
                color: "blue",
                "&:hover": {
                  color: "white",
                },
                cursor: "pointer",
              }}
            />
            <GoogleIcon
              sx={{
                margin: "10px",
                color: "red",
                "&:hover": {
                  color: "white",
                },
                cursor: "pointer",
              }}
              fontSize="large"
            />
            <LinkedInIcon
              sx={{
                margin: "10px",
                color: "blue",
                "&:hover": {
                  color: "white",
                },
                cursor: "pointer",
              }}
              fontSize="large"
            />
          </Box>
          <hr
            style={{
              width: "80%",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            width: {
              xs: "90%",
              md: "70%",
            },
            flexDirection: "column",
          }}
        >
          <form
            onSubmit={handleCreate}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
              width: "100%",

              flexDirection: "column",

              borderRadius: "20px",
              color: "white",
              border: "none",
            }}
          >
            <TextField
              label={language ? "name" : "الاسم"}
              InputProps={{
                style: {
                  backgroundColor: "#edf5f3",
                },
              }}
              required
              inputProps={{
                pattern: "[a-z]*",
                title: "Only lowercase letters allowed no spaces no numbers",
              }}
              onChange={(e) => {
                setName(e.target.value);
                console.log(e.target.value);
              }}
              sx={{
                marginY: "10px",
                width: {
                  xs: "100%",
                  md: "100%",
                },
              }}
            />
            <TextField
              label={language ? "email " : "البريد الالكتروني"}
              InputProps={{
                style: {
                  backgroundColor: "#edf5f3",
                },
              }}
              required
              inputProps={{
                pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                title: "Please enter a valid email",
              }}
              onChange={(e) => {
                console.log(e.target.value);
                setEmail(e.target.value);
              }}
              sx={{
                marginY: "10px",
                width: {
                  xs: "100%",
                  md: "100%",
                },
              }}
            />
            <TextField
              type={passToggle ? "text" : "password"}
              label={language ? "password" : "كلمة المرور"}
              error={Error}
              helperText={ErrorMessage}
              InputProps={{
                style: {
                  backgroundColor: "#edf5f3",
                },
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      setPassToggle(!passToggle);
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    {passToggle ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </InputAdornment>
                ),
              }}
              required
              onChange={(e) => {
                console.log(e.target.value);
                setPasswordUser(e.target.value);
              }}
              sx={{
                marginY: "10px",
                width: {
                  xs: "100%",
                  md: "100%",
                },
              }}
            />
            <TextField
              error={Error}
              helperText={ErrorMessage}
              type={confirmPassToggle ? "text" : "password"}
              label={language ? "confirm password" : "تأكيد كلمة المرور"}
              InputProps={{
                style: {
                  backgroundColor: "#edf5f3",
                },
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      setConfirmPassToggle(!confirmPassToggle);
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    {confirmPassToggle ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </InputAdornment>
                ),
              }}
              required
              onChange={(e) => {
                console.log(e.target.value);
                setPasswordConfirmation(e.target.value);
              }}
              sx={{
                marginY: "10px",
                width: {
                  xs: "100%",
                  md: "100%",
                },
              }}
            />

            <Autocomplete
              disablePortal
              autoHighlight
              options={language ? EnglishLevels : arabicLevels}
              getOptionLabel={(option) => option.name}
              sx={{
                width: "100%",
                borderRadius: "20px",
                color: "white",
                border: "none",
              }}
              onChange={(e, value) => {
                setUserLevel(value.name);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label={language ? "Select your level" : "اختر مستواك الدراسي"}
                  sx={{
                    backgroundColor: "#edf5f3",
                    border: "none",
                  }}
                />
              )}
            />
            <Button
              sx={{
                background: "linear-gradient(to right, #36d1dc, #5b86e5)",

                color: "white",
                width: {
                  xs: "50%",
                  md: "30%",
                },
                //   padding: "10px",
                marginTop: {
                  xs: "10px",
                  md: "10px",
                },
                borderRadius: "20px",
                "&:hover": {
                  boxShadow: "0px 0px 10px white",
                  scale: "1.1",
                },
              }}
              type="submit"
            >
              create account
            </Button>
          </form>
        </Box>
      </Box>
      {open && (
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              background: "linear-gradient(to right, #36d1dc, #5b86e5)",
            }}
          >
            <DialogContentText
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                marginTop: "10px",
                borderRadius: "20px",
              }}
              id="alert-dialog-description"
            >
              Account created successfully
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              background: "linear-gradient(to right, #36d1dc, #5b86e5)",

              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                background: "red",
                color: "white",
                borderRadius: "10px",
                margin: "10px",
                "&:hover": {
                  background: "red",
                  opacity: "0.8",
                  boxShadow: "0px 0px 10px black",
                },
              }}
              onClick={() => {
                setOpen(false);
              }}
            >
              cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
              sx={{
                background: "green",
                color: "white",
                margin: "10px",

                borderRadius: "10px",
                "&:hover": {
                  background: "green",
                  opacity: "0.8",
                  boxShadow: "0px 0px 10px black",
                },
              }}
              autoFocus
            >
              return to login
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

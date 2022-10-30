import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTranslate } from "react-admin";
import config from "../../configs/config";
export default function RestUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  ////////////////////////////////////////////////////////////////
  const [loggedUser, setLoggedUser] = useState([]);
  ////////////////////////////////////////////////////////////////

  // handle errors
  const [Error, setError] = useState(false);
  const [Error2, setError2] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [ErrorMessage2, setErrorMessage2] = useState("");
  ////////////////////////////////////////////////////////////////

  // handle form inputs
  const [sucessfully, setSucessfully] = useState(false);
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [newPass, setNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));
  // show password toggle
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  ////////////////////////////////////////////////////////////////

  useEffect(() => {
    setLoggedUser(user);
  }, []);
  // change password handle
  const restPass = (e) => {
    if (newPass !== newPassConfirm) {
      setError2(true);
      setErrorMessage2("Passwords do not match");

      return;
    }
    if (newPass === oldPass) {
      setError(true);
      setErrorMessage("New password must be different from old password");
      return;
    }
    setError(false);
    setErrorMessage("");
    setError2(false);
    setErrorMessage2("");
    setSucessfully(true);
    try {
      fetch(`${config.baseUrl}/user/${loggedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          password: newPass,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };
  const translate = useTranslate();
  return (
    <Box
      sx={{
        marginTop: 10,
      }}
    >
      <form onSubmit={restPass}>
        <Stack spacing={2}>
          <TextField
            type={`${toggle1 ? "text" : "password"}`}
            error={Error}
            helperText={ErrorMessage}
            label={translate("resources.user.fields.oldPassword")}
            onChange={(e) => {
              setOldPass(e.target.value);
            }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position={lang === "ar" ? "start" : "end"}
                  onClick={() => {
                    setToggle1(!toggle1);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  {toggle1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type={`${toggle2 ? "text" : "password"}`}
            label={translate("resources.user.fields.newPassword")}
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment
                  onClick={() => {
                    setToggle2(!toggle2);
                  }}
                  position={lang === "ar" ? "start" : "end"}
                  sx={{ cursor: "pointer" }}
                >
                  {toggle2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type={`${toggle3 ? "text" : "password"}`}
            label={translate("resources.user.fields.confirmPassword")}
            onChange={(e) => {
              setNewPassConfirm(e.target.value);
            }}
            error={Error2}
            helperText={ErrorMessage2}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position={lang === "ar" ? "start" : "end"}
                  onClick={() => {
                    setToggle3(!toggle3);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  {toggle3 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: `${sucessfully ? "#66bb6a" : "#2196f3"}`,
            }}
            type="submit"
          >
            {sucessfully
              ? translate("resources.user.fields.SucessfullyChangedPassword")
              : translate("resources.user.fields.changePassword")}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

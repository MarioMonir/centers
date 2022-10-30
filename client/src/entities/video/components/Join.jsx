import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
function Join({ handleCreateMeeting, handleJoinMeeting, success, roomUrl }) {
  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoggedUser(user);
  }, []);
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const copy = async () => {
    await navigator.clipboard.writeText(roomUrl);

    window.open(roomUrl);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        width: "100%",
        padding: "1rem",
        flexDirection: "column",
      }}
    >
      {success ? (
        <>
          <TextField
            id="outlined-basic"
            value={roomUrl}
            variant="outlined"
            sx={{
              width: "80%",
            }}
          />
          <Button
            sx={{
              marginTop: "5px",
              backgroundColor: "#6419e6",
              height: "40px",
              marginLeft: "10px",
            }}
            variant="contained"
            onClick={copy}
            disabled={!roomUrl}
          >
            copy url to join meeting
          </Button>
        </>
      ) : (
        <>
          <Box sx={{ width: "80%", display: "flex", alignItems: "center" }}>
            <TextField
              id="outlined-basic"
              label="Meeting Id"
              onChange={(e) => setRoomId(e.target.value)}
              sx={{ width: "70%" }}
              variant="outlined"
            />
            <Button
              sx={{
                marginTop: "5px",
                backgroundColor: "#6419e6",
                height: "40px",
                marginLeft: "10px",
              }}
              variant="contained"
              onClick={() => {
                handleJoinMeeting(roomId, username);
              }}
            >
              join existing meeting
            </Button>
          </Box>
          {loggedUser.userType !== "Student" && (
            <>
              <h3>or</h3>
              <Box sx={{ width: "80%", display: "flex", alignItems: "center" }}>
                <TextField
                  id="outlined-basic"
                  label="room name"
                  onChange={(e) => setRoomName(e.target.value)}
                  sx={{ width: "70%" }}
                  variant="outlined"
                />
                <Button
                  sx={{
                    marginTop: "5px",
                    backgroundColor: "#6419e6",
                    height: "40px",
                    marginLeft: "10px",
                  }}
                  variant="contained"
                  onClick={() => handleCreateMeeting(username, roomName)}
                >
                  Create New Meeting
                </Button>
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default Join;

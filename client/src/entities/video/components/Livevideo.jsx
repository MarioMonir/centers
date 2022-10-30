import React, { useState, useEffect, useRef } from "react";

import Webcam from "react-webcam";

import logo from "../../../../public/logo2.png";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// -----------------------------------------------------------------------

// export default function Livevideo() {
//   const [streamedVideo, setStreamedVideo] = useState(false);
//   const [streamChat, setStreamChat] = useState(false);
//   const [loggedUser, setLoggedUser] = useState("");

//   //   const { data, loading, error } = useGetList("video",{
//   //     filter: {}
//   //   });
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const getUserMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getUserMedia();
//   }, []);

//   // - - - - - - - - - - - - - - - - - - -

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const loggedInUserType = user?.userType;
//     setLoggedUser(loggedInUserType);
//   }, [loggedUser]);

//   // const endLive = () => {
//   //   fetch("http://localhost:5000/startStream", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //       "Access-Control-Allow-Origin": "*",
//   //       Authorization: "Bearer " + localStorage.getItem("accessToken"),
//   //     },
//   //     body: JSON.stringify({
//   //       endStream: true,
//   //     }),
//   //   })
//   //     .then((res) => {})
//   //     .then((res) => {})
//   //     .catch((err) => {
//   //       console.log(err);
//   //     });
//   //   setStreamedVideo(false);
//   //   setStreamChat(false);
//   // };

//   // - - - - - - - - - - - - - - - - - - -

//   const startLive = async () => {
//     fetch("http://localhost:5000/startStream", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         Authorization: "Bearer " + localStorage.getItem("accessToken"),
//       },
//       body: JSON.stringify({ camName: devices[0]?.label?.split("(")[0] }),
//     })
//       .then((res) => {})
//       .then((res) => {})
//       .catch((err) => {
//         console.error(err);
//       });
//     setStreamedVideo(true);
//     setStreamChat(true);
//   };

//   // - - - - - - - - - - - - - - - - - - -

//   const endLive = () => {
//     fetch("http://localhost:5000/startStream", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         Authorization: "Bearer " + localStorage.getItem("accessToken"),
//       },
//       body: JSON.stringify({
//         endStream: true,
//       }),
//     })
//       .then((res) => {})
//       .then((res) => {})
//       .catch((err) => {
//         console.error(err);
//       });
//     setStreamedVideo(false);
//     setStreamChat(false);
//   };

//   // - - - - - - - - - - - - - - - - - - -

//   return loggedUser?.toLowerCase() === "student" ? (
//     <div
//       style={{
//         display: "flex",
//         justifyItems: "center",
//         minWidth: "100%",
//       }}
//     >
//       <Box
//         sx={{
//           minWidth: "75%",
//         }}
//       >
//         <CardMedia
//           sx={{
//             textAlign: "center",
//           }}
//         >
//           {streamedVideo ? (
//             <iframe
//               src="https://www.youtube.com/embed/JQt75BHz_pI"
//               frameborder="0"
//               width="100%"
//               height="600"
//               // onClick={()=>{}}
//             ></iframe>
//           ) : (
//             <Typography>No Streams</Typography>
//           )}
//         </CardMedia>
//       </Box>

//       <Card
//         sx={{
//           minWidth: "25%",
//           marginLeft: 2,
//           display: "flex",
//           justifyItems: "center",
//           flexDirection: "column",
//           marginRight: "10px",
//         }}
//       >
//         <CardHeader
//           avatar={<img src={logo} alt="logo" height="30px" />}
//           sx={{ background: "#2196f3" }}
//         />
//         <CardContent
//           sx={{
//             maxHeight: "450px",
//             minHeight: "450px",
//             overflowY: "scroll",
//           }}
//         >
//           <Typography paragraph>
//             {streamChat ? (
//               <Typography>
//                 Add rice and stir very gently to distribute. Top with artichokes
//                 and peppers, and cook without stirring, until most of the liquid
//                 is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
//                 reserved shrimp and mussels, tucking them down into the rice,
//                 and cook again without stirring, until mussels have opened and
//                 rice is just tender
//               </Typography>
//             ) : (
//               <></>
//             )}
//           </Typography>
//         </CardContent>
//         <CardContent sx={{ minHeight: "50px" }}>
//           <Button sx={{ minWidth: "100%", minHeight: "100%" }}>
//             hide the chat
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   ) : (
//     <div
//       style={{
//         display: "flex",
//         justifyItems: "center",
//         minWidth: "100%",
//       }}
//     >
//       {" "}
//       <Box
//         sx={{
//           minWidth: "75%",
//         }}
//       >
//         {" "}
//         <CardMedia
//           sx={{
//             textAlign: "center",
//           }}
//         >
//           {true ? (
//             <div>
//               <video ref={videoRef} autoPlay />
//             </div>
//           ) : (
//             <Button variant="contained" onClick={startLive}>
//               Start Streaming
//             </Button>
//           )}
//           {streamedVideo ? (
//             <Button onClick={endLive} variant="contained">
//               end live
//             </Button>
//           ) : (
//             <></>
//           )}
//         </CardMedia>
//       </Box>
//       <Card
//         sx={{
//           minWidth: "25%",
//           marginLeft: 2,
//           display: "flex",
//           justifyItems: "center",
//           flexDirection: "column",
//           marginRight: "10px",
//         }}
//       >
//         <CardHeader
//           avatar={<img src={logo} alt="logo" height="30px" />}
//           sx={{ background: "#2196f3" }}
//         />
//         <CardContent
//           sx={{
//             maxHeight: "450px",
//             minHeight: "450px",
//             overflowY: "scroll",
//           }}
//         >
//           <Typography paragraph>
//             {streamChat ? (
//               <Typography>
//                 Add rice and stir very gently to distribute. Top with artichokes
//                 and peppers, and cook without stirring, until most of the liquid
//                 is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
//                 reserved shrimp and mussels, tucking them down into the rice,
//                 and cook again without stirring, until mussels have opened and
//                 rice is just tender
//               </Typography>
//             ) : (
//               <></>
//             )}
//           </Typography>
//         </CardContent>
//         <CardContent sx={{ minHeight: "50px" }}>
//           <Button sx={{ minWidth: "100%", minHeight: "100%" }}>
//             hide the chat
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import Join from "./Join";
import Meeting from "./Meeting";
const meteredMeeting = new window.Metered.Meeting();
import axios from "axios";
import MeetingEnded from "./MeetingEnded";
import { TextField } from "react-admin";
import config from "../../../configs/config";

export default function Livevideo({ groupId }) {
  // Will set it to true when the user joins the meeting
  // and update the UI.

  const [meetingJoined, setMeetingJoined] = useState(false);
  // Storing onlineUsers, updating this when a user joins
  // or leaves the meeting
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [remoteTracks, setRemoteTracks] = useState([]);
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);
  const [roomUrl, setRoomUrl] = useState("");
  const [localVideoStream, setLocalVideoStream] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [micShared, setMicShared] = useState(false);
  const [cameraShared, setCameraShared] = useState(false);
  const [screenShared, setScreenShared] = useState(false);
  const [meetingEnded, setMeetingEnded] = useState(false);
  const [roomName, setRoomName] = useState(null);
  const [meetingInfo, setMeetingInfo] = useState({});
  async function handleMicBtn() {
    if (micShared) {
      await meteredMeeting.stopAudio();
      setMicShared(false);
    } else {
      await meteredMeeting.startAudio();
      setMicShared(true);
    }
  }

  async function handleCameraBtn() {
    if (!cameraShared) {
      await meteredMeeting.startVideo();
      var stream = await meteredMeeting.getLocalVideoStream();
      console.log(stream);
      setLocalVideoStream(stream);
      setCameraShared(true);
    } else {
      await meteredMeeting.stopVideo();
      setCameraShared(false);

      setLocalVideoStream(null);
    }
  }

  async function handelScreenBtn() {
    if (!screenShared) {
      const screen = await meteredMeeting.startScreenShare();
      console.log(screen);
      setLocalVideoStream(screen);
      setScreenShared(true);
    } else {
      await meteredMeeting.stopVideo();
      setCameraShared(false);
      setScreenShared(false);
    }
  }

  async function handleLeaveBtn() {
    await meteredMeeting.leaveMeeting();
    setMeetingEnded(true);
    setCameraShared(false);
    setScreenShared(false);
    setMicShared(false);
    setMeetingJoined(false);
    setLocalVideoStream(null);
    setRemoteTracks([]);
    setOnlineUsers([]);
  }
  // This useEffect hooks will contain all
  // event handler, like participantJoined, participantLeft etc.
  useEffect(() => {
    meteredMeeting.on("remoteTrackStarted", (trackItem) => {
      remoteTracks.push(trackItem);
      setRemoteTracks([...remoteTracks]);
    });

    meteredMeeting.on("remoteTrackStopped", (trackItem) => {
      for (let i = 0; i < remoteTracks.length; i++) {
        if (trackItem.streamId === remoteTracks[i].streamId) {
          remoteTracks.splice(i, 1);
        }
      }
      setRemoteTracks([...remoteTracks]);
    });

    meteredMeeting.on("participantJoined", (localTrackItem) => {});

    meteredMeeting.on("participantLeft", (localTrackItem) => {});

    meteredMeeting.on("onlineParticipants", (onlineParticipants) => {
      setOnlineUsers([...onlineParticipants]);
    });

    return () => {
      meteredMeeting.removeListener("remoteTrackStarted");
      meteredMeeting.removeListener("remoteTrackStopped");
      meteredMeeting.removeListener("participantJoined");
      meteredMeeting.removeListener("participantLeft");
      meteredMeeting.removeListener("onlineParticipants");
    };
  });
  useEffect(() => {
    async function getMeetings() {
      const response = await fetch(`${config.baseUrl}/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ groupId }),
      });
      const data = await response.json();

      if (data.length > 0) {
        setMeetings(data);
      } else {
        setMeetings([]);
      }
    }
    getMeetings();
  }, []);
  console.log(meetings);
  // Will call the API to create a new
  // room and join the user.
  async function handleCreateMeeting(username, RoomName) {
    // Calling API to create room
    const data = await fetch(`${config.baseUrl}/create-meeting-room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        roomName: RoomName,
        groupId: groupId,
      }),
    });
    // Calling API to fetch Metered Domain
    const userData = await data.json();
    console.log(userData.groupId);
    const roomName = userData.roomName;
    if (userData.success) {
      setSuccess(true);
      setRoomUrl(`https://eduhub.metered.live/${roomName}`);
    } else {
      setSuccess(false);
      alert("Room already exists");
    }

    // Calling the join() of Metered SDK

    // Extracting Metered Domain and Room Name
    // From responses.
  }

  // Will call th API to validate the room
  // and join the user
  async function handleJoinMeeting(roomName, username) {
    const response = await axios.get(
      `http://localhost:5000/validate-meeting?roomName=${roomName}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );

    if (response.data.success) {
      // Calling API to fetch Metered Domain
      const { data } = await axios.get(`${config.baseUrl}/metered-domain`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setSuccess(true);
      setRoomUrl(`https://eduhub.metered.live/${roomName}`);
      // Extracting Metered Domain and Room Name
      // From responses.
    } else {
      alert("Invalid roomName");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        flexDirection: "column",
      }}
    >
      <Join
        handleCreateMeeting={handleCreateMeeting}
        handleJoinMeeting={handleJoinMeeting}
        roomUrl={roomUrl}
        success={success}
      />
      {meetings.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
          }}
        >
          {meetings.map((meeting) => (
            <Button
              variant="contained"
              onClick={() =>
                window.open(
                  `https://eduhub.metered.live/${meeting.room.roomName}`
                )
              }
            >
              {meeting.room.roomName}
            </Button>
          ))}
        </Box>
      ) : (
        <h1>No Meetings</h1>
      )}
    </Box>
  );
}

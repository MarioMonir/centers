import VideoTag from "./VideoTag";
import MicIcon from "@mui/icons-material/Mic";
import LogoutIcon from "@mui/icons-material/Logout";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import Box from "@mui/material/Box";
function Meeting({
  handleMicBtn,
  handleCameraBtn,
  handelScreenBtn,
  handleLeaveBtn,
  localVideoStream,
  onlineUsers,
  remoteTracks,
  username,
  roomName,
  meetingInfo,
}) {
  let userStreamMap = {};
  for (let trackItem of remoteTracks) {
    if (!userStreamMap[trackItem.participantSessionId]) {
      userStreamMap[trackItem.participantSessionId] = [];
    }
    userStreamMap[trackItem.participantSessionId].push(trackItem);
  }

  let remoteParticipantTags = [];
  for (let user of onlineUsers) {
    // Skip if self
    if (user._id === meetingInfo.participantSessionId) {
      continue;
    }
    let videoTags = [];
    if (userStreamMap[user._id] && userStreamMap[user._id].length > 0) {
      // User has remote tracks
      for (let trackItem of userStreamMap[user._id]) {
        let stream = new MediaStream();
        stream.addTrack(trackItem.track);

        if (trackItem.type === "video") {
          videoTags.push(<VideoTag srcObject={stream} />);
        }

        if (trackItem.type === "audio") {
          videoTags.push(
            <VideoTag
              key={trackItem.streamId}
              srcObject={stream}
              style={{ display: "none" }}
            />
          );
        }
      }
    }

    remoteParticipantTags.push(
      <div key={user._id}>
        <div id="remoteVideos">{videoTags}</div>
        <div id="username">{user.name}</div>
      </div>
    );
  }

  return (
    <div
      id="meetingView"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",

        width: "100%",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        MeetingID: {roomName}
      </div>
      <div
        className="flex-1 grid grid-cols-2 grid-rows-2"
        id="remoteParticipantContainer"
        style={{ display: "flex" }}
      >
        {remoteParticipantTags}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          id="meetingAreaUsername"
          style={{
            textAlign: "center",
          }}
        >
          Name:{username}
        </div>
        {localVideoStream ? (
          <Box sx={{ backgroundColor: "black" }}>
            <VideoTag
              id="meetingAreaLocalVideo"
              muted={true}
              srcObject={localVideoStream}
            />
          </Box>
        ) : (
          <Box sx={{ width: 400, height: 400, backgroundColor: "black" }}></Box>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          width: "100%",
          backgroundColor: "black",
        }}
        className="space-x-4"
      >
        <button
          id="meetingViewMicrophone"
          className="btn"
          onClick={handleMicBtn}
        >
          <MicIcon />
        </button>

        <button
          id="meetingViewCamera"
          className="btn"
          onClick={handleCameraBtn}
        >
          <CameraAltIcon />
        </button>

        <button
          id="meetingViewScreen"
          className="btn"
          onClick={handelScreenBtn}
        >
          <ScreenShareIcon />
        </button>

        <button id="meetingViewLeave" className="btn" onClick={handleLeaveBtn}>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
}

export default Meeting;

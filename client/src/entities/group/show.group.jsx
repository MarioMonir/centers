import AddTaskIcon from "@mui/icons-material/AddTask";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import PeopleIcon from "@mui/icons-material/People";

import TimelineIcon from "@mui/icons-material/Timeline";
import { useEffect, useState } from "react";
import {
  List,
  ShowBase,
  Tab,
  TabbedShowLayout,
  useShowController,
  useTranslate,
} from "react-admin";

import ListEnrolment from "../enrolment/list.enrolment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ListPost from "../post/list.post";
import CreateGroupAttendance from "./components/CreareGroupAttendance";
import GroupCard from "./components/GroupCard";

import Livevideo from "../video/components/Livevideo";
import SensorsIcon from "@mui/icons-material/Sensors";

import ShowVideo from "../video/Show.Video";
import RestUser from "../user/rest.user";
import ListAllattendance from "../attendance/listAll.attendance";
import PasswordIcon from "@mui/icons-material/Password";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ListFlow from "../flow/list.flow";
import ListAllFlow from "../flow/listAll.flow";
import WalletUser from "../user/wallet.user";
import Protected from "../../reactAdmin/components/Protected";
import ListWallet from "../flow/list.wallet";
// =======================================================

const styles = {
  aside: {
    display: "flex",
    marginLeft: "10px",
    marginTop: 100,
    height: 300,
    width: "20%",
  },
};

// =======================================================

export default function ShowGroup() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loggedUser, setLoggedUser] = useState([]);

  useEffect(() => {
    setLoggedUser(user);
  }, []);

  // ------------------------------------------------

  const { record: group } = useShowController();

  // ------------------------------------------------

  const [formData, setFormData] = useState({
    studentId: null,
    homework: null,
    homeworkNotes: "",
    lectureNumber: 1,
  });

  // ------------------------------------------------

  const lectureDatesSize = group?.actualLectureDates?.length;

  useEffect(() => {
    localStorage.setItem("groupId", group?.id);

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
  const translate = useTranslate();

  return (
    <ShowBase hasEdit={false}>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div
          style={{
            width: "80%",
            minWidth: 850,
            marginTop: 10,
          }}
        >
          <TabbedShowLayout>
            <Tab
              label={translate("resources.menuTab.timeline")}
              icon={<TimelineIcon />}
            >
              <ListPost groupId={group?.id} />
            </Tab>

            {/* ----------------------------------------------------- */}

            {loggedUser?.userType?.toLowerCase() !== "student" && (
              <Tab
                label={translate("resources.menuTab.takeAttendance")}
                icon={<AddTaskIcon />}
                path="attendance/create"
              >
                <Protected loggedUser={loggedUser}>
                  <CreateGroupAttendance {...{ formData, setFormData }} />
                </Protected>
              </Tab>
            )}
            {loggedUser?.userType?.toLowerCase() !== "student" && (
              <Tab
                label={translate("resources.menuTab.attendanceRecord")}
                icon={<CheckBoxIcon />}
                path="attendance"
              >
                <ListAllattendance
                  dataFormated={formData}
                  groupId={group?.id}
                />
              </Tab>
            )}
            {loggedUser?.userType?.toLowerCase() !== "student" && (
              <Tab
                label={translate("resources.menuTab.enrolment")}
                icon={<PeopleIcon />}
                path="enrolment"
              >
                <ListEnrolment groupId={group?.id} />
              </Tab>
            )}

            {/* ----------------------------------------------------- */}

            <Tab
              label={translate("resources.menuTab.videos")}
              icon={<SmartDisplayIcon />}
              path="Videos"
            >
              <ShowVideo groupId={group?.id} />
            </Tab>
            {/* ----------------------------------------------------- */}
            <Tab
              label={
                loggedUser?.userType?.toLowerCase() === "student"
                  ? translate("resources.menuTab.live")
                  : translate("resources.menuTab.liveVideo")
              }
              icon={<SensorsIcon />}
              path="videoStream"
            >
              <Livevideo groupId={group?.id} />
            </Tab>
            {/* ----------------------------------------------------- */}

            {/* <Tab
              label={translate("resources.menuTab.settings")}
              icon={<SettingsIcon />}
              path="settings"
            ></Tab> */}
            {loggedUser?.userType?.toLowerCase() !== "student" && (
              <Tab
                label={translate("resources.menuTab.groupflow")}
                icon={<AttachMoneyIcon />}
                path="listGroupFlow"
              >
                <ListAllFlow groupId={group?.id} />
              </Tab>
            )}
            {loggedUser?.userType?.toLowerCase() === "student" && (
              <Tab
                label={"wallet"}
                icon={<AccountBalanceWalletIcon />}
                path="wallet"
              >
                <ListWallet groupId={group?.id} />
              </Tab>
            )}
          </TabbedShowLayout>
        </div>
        <div style={styles.aside}>
          <GroupCard {...group} />
        </div>
      </div>
    </ShowBase>
  );
}

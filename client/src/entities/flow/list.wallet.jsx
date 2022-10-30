import TextField2 from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ResourceContextProvider,
  TextField,
  useGetList,
} from "react-admin";

// ------------------------------------------------

var today = new Date();

// ------------------------------------------------

export default function ListWallet({ groupId }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loggedUser, setLoggedUser] = useState([]);
  const [enrolmentData, setEnrolmentData] = useState([]);

  // - - - - - - - - - - - - - - --  - -- -

  useEffect(() => setLoggedUser(user), []);

  // - - - - - - - - - - - - - - --  - -- -

  const { data } = useGetList("enrolment", {
    filter: { groupId: groupId, studentId: loggedUser.id },
  });

  // - - - - - - - - - - - - - - --  - -- -

  useEffect(() => setEnrolmentData(data), [data]);

  // - - - - - - - - - - - - - - --  - -- -

  const [value, setValue] = useState(new Date(today));
  const [value2, setValue2] = useState(new Date(today));
  const handleChange = (newValue) => {
    //return date to format 2022-08-03T10:20:55.969Z
    const date = new Date(newValue).toISOString();
    setValue(date);
  };

  const handleChange2 = (newValue) => {
    //return date to format 2022-08-03T10:20:55.969Z
    const date = new Date(newValue).toISOString();
    setValue2(date);
  };

  return (
    <>
      {enrolmentData?.length > 0 && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ResourceContextProvider value="flow">
            <div
              style={{
                display: "flex",
                padding: "10px",
                justifyContent: "space-between",
              }}
            >
              <List
                sx={{
                  width: "80%",
                }}
                hasCreate={false}
                hasEdit={false}
                exporter={false}
                actions={groupId ? false : true}
                filter={{ groupId: groupId, fromUserId: loggedUser.id }}
              >
                <Datagrid
                  bulkActionButtons={groupId ? false : true}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <NumberField source="fromUserId" />
                  <NumberField source="toUserId" />
                  <DateField source="createdAt" showTime />
                  <TextField source="description" />
                  <TextField source="notes" />
                  <NumberField source="credit" />
                  <NumberField source="debit" />
                  <NumberField source="balance" />
                </Datagrid>
              </List>

              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  flexDirection: "column",
                  marginLeft: "10px",
                  width: "20%",
                }}
              >
                <Typography variant="outline" gutterBottom>
                  Debit:
                </Typography>
                <Typography variant="outline" gutterBottom>
                  Credited:
                </Typography>
                <Typography variant="outline" gutterBottom>
                  wallet balance:
                  {enrolmentData?.length > 0 ? enrolmentData[0].balance : ""}
                </Typography>
              </div>
            </div>
          </ResourceContextProvider>
        </LocalizationProvider>
      )}
    </>
  );
}

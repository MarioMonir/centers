import React from "react";
import {
  CreateButton,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  ResourceContextProvider,
  TextField,
} from "react-admin";
import NoRecords from "../../reactAdmin/components/NoRecords";
import CreateAttendance from "./create.attendance";

// ------------------------------------------------

export default function listAllattendance(props) {
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));

  // - - - - - - - - - - - - - -

  // Empty object is also true
  // this if never be false
  if (!props)
    return (
      <NoRecords>
        <h1>No attendance</h1>
      </NoRecords>
    );

  // - - - - - - - - - - - - - -

  return (
    <ResourceContextProvider value="attendance">
      <List actions={<CreateButton />}>
        <Datagrid>
          <NumberField
            source="studentId"
            label={lang === "ar" ? "رقم الطالب" : "Student ID"}
          />
          <ReferenceField
            source="studentId"
            label={lang === "ar" ? "اسم الطالب" : "Student name"}
            reference="user"
            link="show"
          >
            <TextField source="name" />
          </ReferenceField>
          <NumberField
            source={lang === "ar" ? "رصيد" : "balance"}
            options={{ style: "currency", currency: "EGP" }}
          />
          <TextField source={lang === "ar" ? "تكلفه الحصه" : "lecture cost"} />
          <TextField source={lang === "ar" ? "تكلفه المركز" : "center cost"} />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
}

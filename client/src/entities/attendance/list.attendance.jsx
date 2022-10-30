import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  ResourceContextProvider,
  TextField,
} from "react-admin";
import NoRecords from "../../reactAdmin/components/NoRecords";

// ------------------------------------------------

export default function ListAttendance({ dataFormated, setFormData }) {
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));
  const studentId = dataFormated?.studentId;
  const groupId = dataFormated?.groupId;

  // -------------------------------

  if (!studentId)
    return (
      <NoRecords>
        <h1>{lang === "ar" ? "لا يوجد حضور" : "No Attendance"}</h1>
      </NoRecords>
    );

  // -------------------------------

  return (
    <ResourceContextProvider value="attendance">
      <List
        pagination={false}
        hasCreate={studentId ? false : true}
        exporter={studentId ? false : true}
        actions={studentId ? false : true}
        filter={{ studentId: studentId, groupId: groupId }}
      >
        <Datagrid>
          <NumberField
            source="studentId"
            label={lang === "ar" ? "رقم الطالب" : "Student ID"}
          />
          <ReferenceField
            source="studentId"
            label={lang === "ar" ? "اسم الطالب" : "Student Name"}
            reference="user"
            link="show"
          >
            <TextField source="name" />
          </ReferenceField>
          <NumberField
            source={lang === "ar" ? "الرصيد" : "balance"}
            options={{ style: "currency", currency: "EGP" }}
          />
          <TextField
            source="lectureCost"
            label={lang === "ar" ? "تكلفة الحصة" : "Lecture Cost"}
          />
          <TextField
            source="centerCost"
            label={lang === "ar" ? "تكلفة المركز" : "Center Cost"}
          />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
}

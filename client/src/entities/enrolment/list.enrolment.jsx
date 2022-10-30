import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  ResourceContextProvider,
  TextField,
  CreateButton,
} from "react-admin";

// ------------------------------------------------

export default function ListEnrolment(groupId) {
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));
  return (
    <ResourceContextProvider value="enrolment">
      <List filter={groupId} actions={<CreateButton />}>
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
            source="balance"
            options={{ style: "currency", currency: "EGP" }}
          />
          <TextField source="lectureCost" />
          <TextField source="centerCost" />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
}

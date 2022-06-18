import {
  BooleanField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ResourceContextProvider,
  ShowButton,
  TextField,
  TextInput,
} from "react-admin";
import Actions from "../../reactAdmin/components/Actions";
import Typography from "@mui/material/Typography";

// ------------------------------------------------

const ListAttendance = ({ studentId, groupId }) => {
  const filters = [
    <TextInput source="q" label="Search" alwaysOn />,
    <NumberInput source="lectureNumber" />,
  ];
  return (
    <ResourceContextProvider value="attendance">
      <List
        // hasCreate={studentId ? false : true}
        // exporter={studentId ? false : true}
        actions={false}
        filter={studentId ? { studentId: studentId, groupId: groupId } : {}}
        filters={studentId ? null : filters}
      >
        <Datagrid bulkActionButtons={studentId ? false : true}>
          {/* <NumberField source="studentId" label="Student code" />
          <ReferenceField
            source="studentId"
            label="Student name"
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
          <TextField source="centerCost" /> */}
        </Datagrid>
      </List>

      {/* <List
      // hasCreate={studentId ? false : true}
      // exporter={studentId ? false : true}
      // actions={studentId ? false : true}
      // filter={{ studentId: studentId, groupId: groupId }}
      >
        <Datagrid bulkActionButtons={false}>
          <NumberField source="id" />
          <DateField source="createdAt" showTime />
          <NumberField source="lectureNumber" />

          <TextField source="homework" />
          <TextField source="homeworkNotes" />
        </Datagrid>
      </List> */}
    </ResourceContextProvider>
  );
};

// ------------------------------------------------

{
  /* <NumberField source="studentId" label="Student code" />
          <ReferenceField
            source="studentId"
            label="Student name"
            reference="user"
            link="show"
          >
            <TextField source="name" />
          </ReferenceField> */
}

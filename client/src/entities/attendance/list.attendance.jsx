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
import Actions from "../../reactAdmin/Actions";
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
          </ReferenceField> */}

          <NumberField source="id" />
          <DateField source="createdAt" showTime />
          <NumberField source="lectureNumber" />

          <TextField source="homework" />
          <TextField source="homeworkNotes" />

          {/* <Actions>
            <ShowButton />
            <EditButton />
            <DeleteButton />
          </Actions> */}
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};

// ------------------------------------------------

export default ListAttendance;

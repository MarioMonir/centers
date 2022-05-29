import {
  BooleanField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  ResourceContextProvider,
  ShowButton,
  TextField,
} from "react-admin";
import Actions from "../../reactAdmin/Actions";
import Typography from "@mui/material/Typography";

// ------------------------------------------------

const ListAttendance = ({ studentId, groupId }) => {
  return (
    <ResourceContextProvider value="attendance">
      <List
        // hasCreate={studentId ? false : true}
        // exporter={studentId ? false : true}
        actions={studentId ? false : true}
        filter={{ studentId: studentId, groupId: groupId }}
      >
        <Datagrid bulkActionButtons={false}>
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

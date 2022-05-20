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

export default function ListAttendance(props) {
  return (
    <ResourceContextProvider value="attendance">
      <List hasCreate={false} exporter={false}>
        <Typography variant="h5" sx={{ padding: 2 }}>
          Attendance Record
        </Typography>
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
          <DateField source="createdAt" showTime />

          <BooleanField source="homework" />
          <TextField source="notes" />

          {/* <Actions>
            <ShowButton />
            <EditButton />
            <DeleteButton />
          </Actions> */}
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
}

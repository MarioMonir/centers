import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  ShowButton,
  TextField,
} from "react-admin";
import Actions from "../../reactAdmin/Actions";

// ------------------------------------------------

export default function ListAttendance(props) {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id" />

        <NumberField source="groupId" />

        <NumberField source="studentId" />
        <TextField source="notes" />

        <Actions>
          <ShowButton />
          <EditButton />
          <DeleteButton />
        </Actions>
      </Datagrid>
    </List>
  );
}

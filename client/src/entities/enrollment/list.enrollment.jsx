import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ShowButton,
  EditButton,
  DeleteButton,
} from "react-admin";
import Actions from "../../reactAdmin/Actions";

// ------------------------------------------------

export default function ListEnrollment(props) {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="groupId" />

        <NumberField source="studentId" />
        <TextField source="lectureCost" />
        <TextField source="centerCost" />
        <NumberField source="balance" />

        <Actions label="">
          <ShowButton label="show" />
          <EditButton label="edit" />
          <DeleteButton label="delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}

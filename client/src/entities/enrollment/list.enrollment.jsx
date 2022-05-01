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

export default function ListEnrollment(props) {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="groupId" />

        <NumberField source="studentId" />
        <TextField source="lectureCost" />
        <TextField source="centerCost" />
        <NumberField source="balance" />

        <Actions>
          <ShowButton />
          <EditButton />
          <DeleteButton />
        </Actions>
      </Datagrid>
    </List>
  );
}

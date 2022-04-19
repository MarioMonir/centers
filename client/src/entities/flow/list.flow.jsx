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

export default function ListFlow(props) {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id" />

        <NumberField source="fromUserId" />

        <NumberField source="toUserId" />
        <NumberField source="balance" />
        <TextField source="notes" />

        <Actions label="">
          <ShowButton label="show" />
          <EditButton label="edit" />
          <DeleteButton label="delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}

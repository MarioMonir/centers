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

export default function ListUser(props) {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="name" />

        <TextField source="email" />
        <TextField source="password" />
        <TextField source="permission" />

        <Actions label="">
          <ShowButton label="show" />
          <EditButton label="edit" />
          <DeleteButton label="delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}

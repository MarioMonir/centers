import {
  List,
  Datagrid,
  TextField,
  NumberField,
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

        <Actions>
          <ShowButton />
          <EditButton />
          <DeleteButton />
        </Actions>
      </Datagrid>
    </List>
  );
}

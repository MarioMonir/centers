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

export default function ListUserRelation(props) {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="followerId" />

        <NumberField source="followingId" />

        <Actions label="">
          <ShowButton label="show" />
          <EditButton label="edit" />
          <DeleteButton label="delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}

import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  ShowButton,
} from "react-admin";
import Actions from "../../reactAdmin/Actions";

// ------------------------------------------------

export default function ListPost(props) {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id" />
        <Actions>
          <ShowButton />
          <EditButton />
          <DeleteButton />
        </Actions>
      </Datagrid>
    </List>
  );
}

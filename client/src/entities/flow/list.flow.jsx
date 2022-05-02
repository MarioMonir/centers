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

export default function ListFlow(props) {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id" />

        <NumberField source="fromUserId" />

        <NumberField source="toUserId" />
        <NumberField source="balance" />
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

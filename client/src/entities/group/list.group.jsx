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

export default function ListGroup(props) {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id" />

        <NumberField source="ownerUserId" />

        <NumberField source="teacherId" />

        <NumberField source="collectorUserId" />

        <NumberField source="ownerFees" />
        <BooleanField source="public" />

        <Actions label="">
          <ShowButton label="show" />
          <EditButton label="edit" />
          <DeleteButton label="delete" />
        </Actions>
      </Datagrid>
    </List>
  );
}

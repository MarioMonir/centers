import {
  BooleanField,
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  ShowButton,
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

        <Actions>
          <ShowButton />
          <EditButton />
          <DeleteButton />
        </Actions>
      </Datagrid>
    </List>
  );
}

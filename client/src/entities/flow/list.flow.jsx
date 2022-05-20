import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  ShowButton,
  TextField,
  ResourceContextProvider,
  DateField,
} from "react-admin";
import Actions from "../../reactAdmin/Actions";
import Typography from "@mui/material/Typography";

// ------------------------------------------------

export default function ListFlow(props) {
  return (
    <ResourceContextProvider value="flow">
      <List hasCreate={false} exporter={false}>
        <Typography variant="h5" sx={{ padding:2}}>
          Payment Record
        </Typography>
        <Datagrid bulkActionButtons={false}>
          <NumberField source="id" />
          <DateField source="createdAt" showTime />

          {/* <NumberField source="fromUserId" />

        <NumberField source="toUserId" /> */}
          <NumberField source="balance" />
          <TextField source="notes" />

          {/* <Actions>
            <ShowButton />
            <EditButton />
            <DeleteButton />
          </Actions> */}
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
}

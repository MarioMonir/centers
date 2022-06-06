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
import Actions from "../../reactAdmin/components/Actions";
import Typography from "@mui/material/Typography";

// ------------------------------------------------

const ListFlow = ({ studentId }) => {
  return (
    <ResourceContextProvider value="flow">
      <List
        // hasCreate={studentId ? false : true}
        // exporter={studentId ? false : true}
        actions={studentId ? false : true}
        filter={{ fromUserId: studentId, toUserId: studentId }}
        sort={{ field: "createdAt", order: "DESC" }}
      >
        {/* <Typography variant="h5" sx={{ padding: 2 }}>
          Payment Record
        </Typography> */}
        {/* <Datagrid bulkActionButtons={studentId ? false : true}>
          <NumberField source="id" />
          <DateField source="createdAt" showTime />

          {studentId ? null : <NumberField source="fromUserId" />}
          {studentId ? null : <NumberField source="toUserId" />}

          <TextField source="description" />
          <TextField source="notes" />

          <NumberField source="credit" />
          <NumberField source="debit" />
          <NumberField source="balance" />
        </Datagrid> */}
      </List>
    </ResourceContextProvider>
  );
};

// ------------------------------------------------

export default ListFlow;

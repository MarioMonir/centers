import {
  Datagrid,
  List,
  NumberField,
  TextField,
  ResourceContextProvider,
  DateField,
} from "react-admin";

// ------------------------------------------------

const ListFlow = ({ studentId }) => (
  <ResourceContextProvider value="flow">
    <List
      actions={studentId ? false : true}
      filter={{ toUserId: studentId }}
      sort={{ field: "createdAt", order: "DESC" }}
    >
      <Datagrid bulkActionButtons={studentId ? false : true}>
        <NumberField source="id" />
        <DateField source="createdAt" showTime />
        {studentId ? null : <NumberField source="fromUserId" />}
        {studentId ? null : <NumberField source="toUserId" />}
        <TextField source="description" />
        <TextField source="notes" />
        <NumberField source="credit" />
        <NumberField source="debit" />
        <NumberField source="balance" />
      </Datagrid>
    </List>
  </ResourceContextProvider>
);

// ------------------------------------------------

export default ListFlow;

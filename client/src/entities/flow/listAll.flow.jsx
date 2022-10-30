import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ResourceContextProvider,
  TextField,
  CreateButton,
} from "react-admin";
import NoRecords from "../../reactAdmin/components/NoRecords";

// ------------------------------------------------

export default function ListAllFlow({ groupId }) {
  // ------------------------------------------------
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));
  return (
    <>
      {groupId && (
        <ResourceContextProvider value="flow">
          <List
            exporter={false}
            bulkActionButtons={false}
            filter={{ groupId }}
            sort={{ field: "createdAt", order: "DESC" }}
            actions={<CreateButton />}
          >
            <Datagrid bulkActionButtons={groupId ? false : true}>
              <NumberField source="id" />
              <DateField source="createdAt" showTime />
              {groupId ? null : <NumberField source="fromUserId" />}
              {groupId ? null : <NumberField source="toUserId" />}
              <TextField
                source="description"
                label={lang === "ar" ? "الوصف" : "Description"}
              />
              <TextField source="notes" />
              <NumberField
                source="credit"
                label={lang === "ar" ? "المبلغ المدفوع" : "Credit"}
              />
              <NumberField
                source="debit"
                label={lang === "ar" ? "المبلغ المستلم" : "Debit"}
              />
              <NumberField
                source="balance"
                label={lang === "ar" ? "الرصيد" : "Balance"}
              />
            </Datagrid>
          </List>
        </ResourceContextProvider>
      )}
      {!groupId && (
        <NoRecords>
          <h1>No flow</h1>
        </NoRecords>
      )}
    </>
  );
}

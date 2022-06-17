import { Box, Stack } from "@mui/material";
import {
  CreateButton,
  ExportButton,
  FilterButton,
  FilterForm,
  ListContextProvider,
  NumberInput,
  Pagination,
  SelectInput,
  SortButton,
  useListController,
} from "react-admin";
import RequestCard from "./components/RequestCard";

// ------------------------------------------------

const requestFilters = [
  <NumberInput label="Search Student ID" source="fromUserId" alwaysOn />,

  <SelectInput
    choices={[
      { id: "Pending", name: "Pending" },
      { id: "Accpeted", name: "Accpeted" },
      { id: "Refused", name: "Refused" },
    ]}
    source="requestStatus"
  />,
  // <TextInput source="level" size="small" />,
];

// ------------------------------------------------

const ListToolbar = () => (
  <Stack direction="row" justifyContent="space-between">
    <FilterForm filters={requestFilters} />
    <div style={{ paddingTop: 20 }}>
      <FilterButton filters={requestFilters} />
      <SortButton fields={["id", "toGroupId", "createdAt"]} />
      <CreateButton />
      <ExportButton />
    </div>
  </Stack>
);

// ------------------------------------------------

export default function ListRequest(props) {
  const listContext = useListController({
    filter: { requestStatus: "Pending" },
    sort: { field: "createdAt", order: "ASC" },
  });

  return (
    <ListContextProvider value={listContext}>
      <ListToolbar />
      <Box gap={2} display="grid">
        {listContext?.data?.map((record) => (
          <RequestCard {...record} key={record.id} />
        ))}
      </Box>
      <Pagination />
    </ListContextProvider>
  );
}

// ------------------------------------------------

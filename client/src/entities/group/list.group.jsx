import { Grid } from "@mui/material";
import {
  CreateButton,
  ExportButton,
  FilterButton,
  FilterForm,
  ListContextProvider,
  // ListToolbar,
  Pagination,
  SortButton,
  TextInput,
  TopToolbar,
  useListController,
} from "react-admin";
import GroupCard from "./components/GroupCard";
import { Stack } from "@mui/material";

// ------------------------------------------------
const postFilters = [
  <TextInput label="Search" source="q" size="small" alwaysOn />,
  <TextInput source="name" size="small" />,
  <TextInput source="level" size="small" />,
];

const ListToolbar = () => (
  <Stack direction="row" justifyContent="space-between">
    <FilterForm filters={postFilters} />
    <div style={{ paddingTop: 20 }}>
      <FilterButton filters={postFilters} />
      <SortButton fields={["id", "name", "level", "createdAt"]} />
      <CreateButton />
      <ExportButton />
    </div>
  </Stack>
);

const ListGroup = (props) => {
  const listContext = useListController();
  return (
    <ListContextProvider value={listContext}>
      <ListToolbar />

      <Grid container spacing={3}>
        {listContext?.data?.map((record) => (
          <Grid key={record?.id} item>
            <GroupCard {...record} />
          </Grid>
        ))}
      </Grid>
      <Pagination />
    </ListContextProvider>
  );
};

// ------------------------------------------------

export default ListGroup;

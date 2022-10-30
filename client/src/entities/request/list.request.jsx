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
import React, { useState, useEffect } from "react";
import NoRecords from "../../reactAdmin/components/NoRecords";

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
  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setLoggedUser(user);
  }, []);
  const listContext = useListController({
    filter: { requestStatus: "Pending", toUserId: loggedUser.id },
    sort: { field: "createdAt", order: "ASC" },
  });

  return (
    <ListContextProvider value={listContext}>
      <Box gap={2} display="grid">
        {listContext?.data?.length > 0 && (
          <>
            {listContext?.data?.map((record, key) => (
              <RequestCard record={record} key={key} />
            ))}
          </>
        )}
        {listContext?.data?.length <= 0 && (
          <NoRecords>
            <h1>No Requests</h1>
          </NoRecords>
        )}
      </Box>
      <Pagination />
    </ListContextProvider>
  );
}

// ------------------------------------------------

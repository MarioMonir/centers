import { Grid } from "@mui/material";
import {
  CreateButton,
  FilterButton,
  FilterForm,
  ListContextProvider,
  Pagination,
  SortButton,
  TextInput,
  useGetList,
  useListController,
} from "react-admin";
import { useState, useEffect } from "react";
import GroupCard from "./components/GroupCard";
import { Stack } from "@mui/material";

// ------------------------------------------------

const postFilters = [
  <TextInput label="Search" source="q" size="small" alwaysOn />,
  <TextInput source="courseName" size="small" />,
  <TextInput source="level" size="small" />,
];

// ------------------------------------------------

const ListToolbar = ({ user }) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <FilterForm filters={postFilters} />
      <div style={{ paddingTop: 20 }}>
        <FilterButton filters={postFilters} />
        <SortButton fields={["id", "courseName", "level", "createdAt"]} />
        <CreateButton />
      </div>
    </Stack>
  );
};

// ------------------------------------------------

export default function ListGroup(props) {
  const [loggedUser, setLoggedUser] = useState([]);
  const [Groups, setGroups] = useState([]);
  const [CenterGroups, setCenterGroups] = useState([]);
  const [TeacherGroups, setTeacherGroups] = useState([]);
  const [contextData, setContextData] = useState([]);
  const [enrolment, setEnrolment] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const listContext = useListController();

  // - - - - - - - - - - - - - -
  useEffect(() => {
    setLoggedUser(user);
  }, []);
  const { data: AllGroups } = useGetList("group");
  const { data, ids, total, loading, loaded, error, refetch } = useGetList(
    "enrolment",
    {
      filter: { studentId: loggedUser.id },
    }
  );

  useEffect(() => {
    if (data) {
      setEnrolment(data);
    }
    if (listContext.data) {
      setContextData(listContext.data);
      contextData.map((group) => {
        if (group.ownerUserId === loggedUser.id) {
          setCenterGroups((CenterGroups) => [...CenterGroups, group]);
        }
        if (group.teacherUserId === loggedUser.id) {
          setTeacherGroups((TeacherGroups) => [...TeacherGroups, group]);
        }
        enrolment.map((enrol) => {
          if (group.id === enrol.groupId) {
            console.log("group", group);
            setGroups((Groups) => [...Groups, group]);
          }
        });
      });
    }
  }, [data, contextData]);
  console.log("Groups", CenterGroups);
  // - - - - - - - - - - - - - -

  return (
    <ListContextProvider value={listContext}>
      {loggedUser.userType === "Student" ? (
        <></>
      ) : (
        <ListToolbar user={loggedUser} />
      )}
      <Grid
        container
        sx={{
          marginTop: 5,
        }}
        spacing={3}
      >
        {loggedUser.userType === "Student" &&
          Groups?.map((record) => (
            <Grid
              key={record?.id}
              sx={{
                marginTop: "20px",
              }}
              item
            >
              <GroupCard {...record} />
            </Grid>
          ))}
        {loggedUser.userType === "Center" &&
          CenterGroups?.map((record) => (
            <Grid
              key={record?.id}
              sx={{
                marginTop: "20px",
              }}
              item
            >
              <GroupCard {...record} />
            </Grid>
          ))}
        {loggedUser.userType === "Teacher" &&
          TeacherGroups?.map((record) => (
            <Grid
              key={record?.id}
              sx={{
                marginTop: "20px",
              }}
              item
            >
              <GroupCard {...record} />
            </Grid>
          ))}
        {loggedUser.userType === "Developer" &&
          AllGroups?.map((record) => (
            <Grid
              key={record?.id}
              sx={{
                marginTop: "20px",
              }}
              item
            >
              <GroupCard {...record} />
            </Grid>
          ))}
      </Grid>
      <Pagination />
    </ListContextProvider>
  );
}

// ------------------------------------------------

import React, { useState, useEffect } from "react";
import SearchCard from "./SearchCard";
import TextField from "@mui/material/TextField";
import NoRecords from "../../../reactAdmin/components/NoRecords";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import levels from "../../../utils/levels";
import {
  useGetList,
  useTranslate,
  TopToolbar,
  FilterButton,
  FilterForm,
  CreateButton,
  ListBase,
  SortButton,
  TextInput,
  useListContext,
  BooleanInput,
  ListContextProvider,
} from "react-admin";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,
});

const EnglishLevels = [
  { id: "Junior 1", name: "Junior 1" },
  { id: "Junior 2", name: "Junior 2" },
  { id: "Junior 3", name: "Junior 3" },
  { id: "Junior 4", name: "Junior 4" },
  { id: "Junior 5", name: "Junior 5" },
  { id: "Junior 6", name: "Junior 6" },

  { id: "Middle 1", name: "Middle 1" },
  { id: "Middle 2", name: "Middle 2" },
  { id: "Middle 3", name: "Middle 3" },

  { id: "Senior 1", name: "Senior 1" },
  { id: "Senior 2", name: "Senior 2" },
  { id: "Senior 3", name: "Senior 3" },
];

const arabicLevels = [
  { id: "الصف الاول الابتدائي", name: "الصف الاول الابتدائي" },
  { id: "الصف الثاني الابتدائي", name: "الصف الثاني الابتدائي" },
  { id: "الصف الثالث الابتدائي", name: "الصف الثالث الابتدائي" },
  { id: "الصف الرابع الابتدائي", name: "الصف الرابع الابتدائي" },
  { id: "الصف الخامس الابتدائي", name: "الصف الخامس الابتدائي" },
  { id: "الصف السادس الابتدائي", name: "الصف السادس الابتدائي" },

  { id: "الصف الاول الاعدادي", name: "الصف الاول الاعدادي" },
  { id: "الصف الثاني الاعدادي", name: "الصف الثاني الاعدادي" },
  { id: "الصف الثالث الاعدادي", name: "الصف الثالث الاعدادي" },

  { id: "الصف الاول الثانوي", name: "الصف الاول الثانوي" },
  { id: "الصف الثاني الثانوي", name: "الصف الثاني الثانوي" },
  { id: "الصف الثالث الثانوي", name: "الصف الثالث الثانوي" },
];

const Type = [
  {
    id: 1,
    name: "Group",
  },
  {
    id: 2,
    name: "Teacher",
  },
  {
    id: 3,
    name: "Center",
  },
];

// --------------------------------------------------------------

export default function Search(props) {
  const [filter, setFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const translate = useTranslate();
  const [centerUsers, setCenterUsers] = useState([]);
  const [enrolStudents, setEnrolStudents] = useState([]);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));

  // - - - - - - - - - - - - -

  const searchTerm = (e) => {
    setFilter(e.target.value);
  };
  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // - - - - - - - - - - - - -

  useEffect(() => {
    setLoggedUser(user);
  }, []);

  // - - - - - - - - - - - - -

  const { data, error } = useGetList("user", {
    filter: { userType: "Teacher" },
  });
  const { data: enrolStudy } = useGetList("enrolment", {
    filter: {
      studentId: loggedUser.id,
    },
  });
  const { data: center } = useGetList("user", {
    filter: { userType: "Center" },
  });

  // - - - - - - - - - - - - -

  if (error) {
    console.error(error);
  }

  const { data: group, error: err } = useGetList("group");

  // - - - - - - - - - - - - -

  if (err) {
    console.error(err);
  }

  // - - - - - - - - - - - - -

  useEffect(() => {
    setGroups(group);
    setUsers(data);
    setEnrolStudents(enrolStudy);
    setCenterUsers(center);
  }, [data, group, center, enrolStudy]);
  let newGroups;
  let GroupsAndUsers;
  // - - - - - - - - - - - - -
  if (loggedUser?.userType === "Student" && !showAllGroups) {
    enrolStudy?.map((enrol) => {
      newGroups = group.filter((g) => {
        if (g.id === enrol.groupId) {
          return g;
        }
      });
    });

    GroupsAndUsers = [data, newGroups, centerUsers].flat();
  } else {
    GroupsAndUsers = [data, group, centerUsers].flat();
  }

  return (
    <ListContextProvider value={props}>
      <Box
        sx={{
          width: "100%",
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <TextField
            id="outlined-basic"
            label={lang === "ar" ? " البحث " : "search"}
            value={filter || ""}
            variant="outlined"
            sx={{
              width: "30%",
              marginBottom: "1rem",
              marginTop: "1rem",
              marginRight: "1rem",
            }}
            onChange={searchTerm}
          />
          <Autocomplete
            id="filter-demo"
            options={lang === "en" ? EnglishLevels : arabicLevels}
            getOptionLabel={(option) => option.name}
            filterOptions={filterOptions}
            sx={{ width: 300, marginRight: "1rem", marginLeft: "1rem" }}
            onChange={(e, value) => {
              if (levelFilter) {
                setLevelFilter("");
              } else {
                setLevelFilter(value.name);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  lang === "ar" ? " تصفيه حسب المستوي " : "filter by level"
                }
              />
            )}
          />
          <Autocomplete
            id="filter-demo"
            options={Type}
            getOptionLabel={(option) => option.name}
            filterOptions={filterOptions}
            sx={{ width: 300 }}
            onChange={(e, value) => {
              if (typeFilter) {
                setTypeFilter("");
              } else {
                setTypeFilter(value.name);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={lang === "ar" ? " تصفيه حسب النوع " : "filter by type"}
              />
            )}
          />
          {loggedUser?.userType === "Student" && (
            <FormControlLabel
              control={<Switch />}
              label={showAllGroups ? "Show All Groups" : "Show My Groups"}
              onChange={() => setShowAllGroups(!showAllGroups)}
            />
          )}
        </Box>
        <Grid container spacing={3}>
          {filter === "" && levelFilter === "" && typeFilter === "" ? (
            GroupsAndUsers.map((user, i) => (
              <Grid
                sx={{
                  marginTop: "20px",
                }}
                item
                key={i}
              >
                <SearchCard GroupsAndUsers={user} />
              </Grid>
            ))
          ) : (
            <>
              {typeFilter !== "" &&
                filter !== "" &&
                levelFilter !== "" &&
                GroupsAndUsers.filter((user) => {
                  if (typeFilter === "Group" && user.courseName) {
                    return (
                      user.courseName
                        .toLowerCase()
                        .includes(filter.toLowerCase()) &&
                      user.level
                        .toLowerCase()
                        .includes(levelFilter.toLowerCase())
                    );
                  } else if (typeFilter === "Teacher" && user.name) {
                    return user.name
                      .toLowerCase()
                      .includes(filter.toLowerCase());
                  } else if (typeFilter === "Center" && user.name) {
                    return user.name
                      .toLowerCase()
                      .includes(filter.toLowerCase());
                  } else {
                    return;
                  }
                }).map((user, i) => (
                  <Grid
                    sx={{
                      marginTop: "20px",
                    }}
                    item
                    key={i}
                  >
                    <SearchCard GroupsAndUsers={user} />
                  </Grid>
                ))}
              {typeFilter !== "" &&
                filter !== "" &&
                levelFilter === "" &&
                GroupsAndUsers.filter((user) => {
                  if (
                    user.courseName
                      ?.toLowerCase()
                      .includes(filter?.toLowerCase()) &&
                    typeFilter === "Group"
                  ) {
                    console.log("user3", user);
                    return user;
                  } else if (
                    user.name?.toLowerCase().includes(filter?.toLowerCase()) &&
                    typeFilter === "Teacher"
                  ) {
                    console.log("user", user);
                    return user?.userType?.toLowerCase() === "teacher";
                  } else if (
                    user?.name?.toLowerCase().includes(filter?.toLowerCase()) &&
                    typeFilter === "Center"
                  ) {
                    return user?.userType?.toLowerCase() === "center";
                  }
                }).map((user, i) => (
                  <Grid
                    sx={{
                      marginTop: "20px",
                    }}
                    item
                    key={i}
                  >
                    <SearchCard GroupsAndUsers={user} />
                  </Grid>
                ))}
              {levelFilter !== "" &&
                filter !== "" &&
                typeFilter === "" &&
                GroupsAndUsers.filter((user) => {
                  if (user.level) {
                    return (
                      user.courseName
                        .toLowerCase()
                        .includes(filter.toLowerCase()) &&
                      user.level.toLowerCase() === levelFilter.toLowerCase()
                    );
                  }
                }).map((user, i) => (
                  <Grid
                    sx={{
                      marginTop: "20px",
                    }}
                    item
                    key={i}
                  >
                    <SearchCard GroupsAndUsers={user} />
                  </Grid>
                ))}

              {filter !== "" && levelFilter === "" && typeFilter === "" && (
                <>
                  {GroupsAndUsers.filter((user) => {
                    if (user.courseName) {
                      return user.courseName
                        .toLowerCase()
                        .includes(filter.toLowerCase());
                    } else if (user.name) {
                      return user.name
                        .toLowerCase()
                        .includes(filter.toLowerCase());
                    }
                  }).map((user, i) => (
                    <Grid
                      sx={{
                        marginTop: "20px",
                      }}
                      item
                      key={i}
                    >
                      <SearchCard GroupsAndUsers={user} />
                    </Grid>
                  ))}
                </>
              )}
            </>
          )}
          {levelFilter !== "" &&
            filter === "" &&
            typeFilter === "" &&
            GroupsAndUsers.filter((user) => {
              if (user.level) {
                return user.level
                  .toLowerCase()
                  .includes(levelFilter.toLowerCase());
              }
            }).map((user, i) => (
              <Grid
                sx={{
                  marginTop: "20px",
                }}
                item
                key={i}
              >
                <SearchCard GroupsAndUsers={user} />
              </Grid>
            ))}
          {typeFilter !== "" &&
            filter === "" &&
            levelFilter === "" &&
            GroupsAndUsers.filter((user) => {
              if (user.courseName && typeFilter === "Group") {
                return user;
              } else if (user.name && typeFilter === "Teacher") {
                console.log("user", user);
                return user.userType.toLowerCase() === "teacher";
              } else if (user.name && typeFilter === "Center") {
                return user.userType.toLowerCase() === "center";
              }
            }).map((user, i) => (
              <Grid
                sx={{
                  marginTop: "20px",
                }}
                item
                key={i}
              >
                <SearchCard GroupsAndUsers={user} />
              </Grid>
            ))}
          {levelFilter !== "" && typeFilter !== "" && filter === "" && (
            <>
              {GroupsAndUsers.filter((user) => {
                if (typeFilter === "Group") {
                  return (
                    user?.level?.toLowerCase() === levelFilter?.toLowerCase()
                  );
                } else if (typeFilter === "Teacher") {
                  return (
                    user.level?.toLowerCase() === levelFilter?.toLowerCase() &&
                    user.userType?.toLowerCase() === "teacher"
                  );
                } else if (typeFilter === "Center") {
                  return (
                    user.level?.toLowerCase() === levelFilter?.toLowerCase() &&
                    user.userType?.toLowerCase() === "center"
                  );
                }
              }).map((user, i) => (
                <Grid
                  sx={{
                    marginTop: "20px",
                  }}
                  item
                  key={i}
                >
                  <SearchCard GroupsAndUsers={user} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Box>
    </ListContextProvider>
  );
}

import React, { useState, useEffect } from "react";
import { useGetList } from "react-admin";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CardSettlement from "./components/CardSettlement";
import NoRecords from "../reactAdmin/components/NoRecords";

function Settlement() {
  const [filter, setFilter] = useState("");
  const { data, loading, error } = useGetList("user", {
    filter: {
      userType: "Teacher",
    },
  });
  if (error) {
    console.error(error);
  }
  const lang = JSON.parse(localStorage.getItem("RaStore.locale"));
  return (
    <>
      <Box
        sx={{
          width: "100%",
          marginTop: 5,
        }}
      >
        <TextField
          id="outlined-basic"
          label={lang === "ar" ? "البحث " : "Search "}
          value={filter}
          variant="outlined"
          sx={{
            width: "30%",
            margin: "20px",
          }}
          onChange={(e) => setFilter(e?.target?.value)}
        />
        <Grid container spacing={3}>
          {data?.filter((val) => {
            if (
              val?.name?.toLowerCase().includes(filter?.toLocaleLowerCase())
            ) {
              return val;
            } else {
              return null;
            }
          })?.length === 0 ? (
            <NoRecords>No Records Found</NoRecords>
          ) : (
            data?.map((item) => (
              <Grid
                sx={{
                  margin: "20px",
                }}
                item
                key={item.id}
              >
                <CardSettlement item={item} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
}

export default Settlement;

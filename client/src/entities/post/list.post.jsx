import { Grid } from "@mui/material";
import * as React from "react";
import { useGetList } from "react-admin";
import PostCard from "./PostCard";

// ------------------------------------------------

const ListPost = () => {
  const { data } = useGetList("post");
  return (
    <Grid>
      {data?.map((record) => (
        <PostCard key={record.id} {...record} />
      ))}
    </Grid>
  );
};

// ------------------------------------------------

export default ListPost;

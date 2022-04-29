import { Box } from "@mui/material";
import React, { useState } from "react";
import { Button, useGetList } from "react-admin";
import PostCard from "./components/PostCard";
import CreatePost from "./create.post";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

// ------------------------------------------------

const ListPost = () => {
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, refetch } = useGetList("post", {
    pagination: { page: 1, perPage: perPage },
    sort: { field: "createdAt", order: "DESC" },
  });

  // ------------------------------------------------

  const handleClick = () => {
    setPerPage(perPage + 5);
  };

  // ------------------------------------------------

  return (
    <Box gap={2} display="grid" sx={{ maxWidth: 800 }}>
      <CreatePost refetch={refetch} />

      {data?.map((record) => (
        <PostCard key={record?.id} {...record} />
      ))}

      <Button
        disabled={isLoading}
        label="See More"
        onClick={handleClick}
        //icon={<ExpandCircleDownIcon />}
        sx={{ padding: 3 }}
      />
    </Box>
  );
};

// ------------------------------------------------

export default ListPost;

import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, useGetList } from "react-admin";
import PostCard from "./components/PostCard";
import CreatePost from "./create.post";

// ------------------------------------------------

const ListPost = () => {
  const [perPage, setPerPage] = useState(10);
  const [posts, setPosts] = useState([]);

  // ------------------------------------------------

  const { data, isLoading, refetch } = useGetList("post", {
    pagination: { page: 1, perPage: perPage },
    sort: { field: "createdAt", order: "DESC" },
  });

  // ------------------------------------------------

  useEffect(() => {
    if (!!data?.length) {
      setPosts(data);
    }
  }, [data]);

  // ------------------------------------------------

  const preAppendNewPost = (post) => setPosts([post, ...posts]);

  const handleClick = () => setPerPage(perPage + 5);

  // ------------------------------------------------

  return (
    <Box gap={2} display="grid" sx={{ maxWidth: 800 }}>
      <CreatePost refetch={refetch} />

      {posts?.map((record, index) => (
        <PostCard key={record?.id} {...record} />
      ))}

      <Button
        disabled={isLoading}
        label="See More"
        onClick={handleClick}
        sx={{ padding: 3 }}
      />
    </Box>
  );
};

// ------------------------------------------------

export default ListPost;

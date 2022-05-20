import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useGetList } from "react-admin";
import PostCard from "./components/PostCard";
import CreatePost from "./create.post";

// ------------------------------------------------

const ListPost = ({ groupId }) => {
  const [perPage, setPerPage] = useState(10);
  const [posts, setPosts] = useState([]);

  // ------------------------------------------------

  const { data, isLoading, refetch, total } = useGetList("post", {
    pagination: { page: 1, perPage: perPage },
    sort: { field: "createdAt", order: "DESC" },
    filter: { groupId }, //filter with followers and enrolments in home.
  });

  // ------------------------------------------------

  useEffect(() => {
    if (!!data?.length) {
      setPosts(data);
    }
  }, [data]);

  // ------------------------------------------------

  const handleClick = () => setPerPage(perPage + 5);

  // ------------------------------------------------

  return (
    <Box gap={2} display="grid" sx={{ maxWidth: 800 }}>
      <CreatePost {...{ refetch, groupId }} />

      {posts?.map((record, index) => (
        <PostCard key={record?.id} {...record} />
      ))}

      <Button
        disabled={isLoading}
        label="See More"
        onClick={handleClick}
        sx={{ padding: 3, display: perPage > total ? "none" : "" }}
      >
        <ExpandMoreIcon />
        See More
      </Button>
    </Box>
  );
};

// ------------------------------------------------

export default ListPost;

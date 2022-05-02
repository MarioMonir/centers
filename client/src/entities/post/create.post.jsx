import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import React, { useEffect, useState } from "react";
import { Button, useCreate } from "react-admin";

// ------------------------------------------------

const loggedInUserId = 1;

// ------------------------------------------------

const CreatePost = ({ refetch }) => {
  const [content, setContent] = useState("");
  const [create, { data: createdPost, isLoading, error }] = useCreate();

  // ------------------------------------------------

  const handlePostChange = (e) => setContent(e?.target?.value);

  // ------------------------------------------------

  const submitCreatePost = () => {
    setContent("");
    create("post", { data: { userId: loggedInUserId, content } });
  };

  // ------------------------------------------------

  useEffect(() => {
    if (createdPost) refetch();
  }, [createdPost]);

  // ------------------------------------------------

  return (
    <Card sx={{ padding: 1.5 }}>
      <div style={{ display: "flex" }}>
        <AccountCircleIcon
          color="action"
          sx={{ marginTop: 0.5, fontSize: 45 }}
        />
        <Input
          sx={{ margin: 1 }}
          placeholder="Write a post..."
          fullWidth
          value={content}
          onChange={handlePostChange}
          id="outlined-basic"
          label="Create Post"
          multiline
        />
        <Button
          disabled={!content || isLoading}
          label="Post"
          onClick={submitCreatePost}
        />
      </div>
    </Card>
  );
};

// ------------------------------------------------

export default CreatePost;

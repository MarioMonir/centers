import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import React, { useEffect, useState } from "react";
import { Button, useCreate } from "react-admin";
import { useParams } from "react-router-dom";

// ------------------------------------------------

const loggedInUserId = 1;

// ------------------------------------------------

const CreatePost = ({ refetch, groupId }) => {
  const [content, setContent] = useState("");
  const [create, { data: createdPost, isLoading, error }] = useCreate();

  // ------------------------------------------------

  const handlePostChange = (e) => setContent(e?.target?.value);

  // ------------------------------------------------

  const submitCreatePost = () => {
    setContent("");
    create("post", { data: { userId: loggedInUserId, groupId, content } });
  };

  // ------------------------------------------------

  useEffect(() => {
    if (createdPost) refetch();
  }, [createdPost]);

  // ------------------------------------------------
  const params = useParams();
  return (
    <Card sx={{ padding: 1.5 }}>
      <div style={{ display: "flex" }}>
        <AccountCircleIcon
          color="action"
          sx={{ marginTop: 0.5, fontSize: 45 }}
        />
        <Input
          sx={{ margin: 1 }}
          placeholder={
            groupId ? "Share with your group..." : "Share with your followers..."
          }
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

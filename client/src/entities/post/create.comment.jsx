import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";
import React, { useState } from "react";
import { Button, useUpdate } from "react-admin";

// ------------------------------------------------

const user = JSON.parse(localStorage.getItem("user"));
const loggedInUserId = user?.id;

// ------------------------------------------------

const CreateComment = ({ post }) => {
  const [content, setContent] = useState("");
  const [update, { isLoading, error }] = useUpdate();

  // ------------------------------------------------

  const handleCommentChange = (e) => setContent(e?.target?.value);

  // ------------------------------------------------

  const submitCreateComment = () => {
    setContent("");
    const newComment = {
      userId: loggedInUserId,
      content: content,
      createdAt: new Date(),
      likes: { userIds: [] },
    };
    const commentsList = post?.comments?.list;
    commentsList.push(newComment);
    update("post", {
      id: post.id,
      data: {
        comments: { list: commentsList },
      },
    });
  };

  // ------------------------------------------------

  return (
    <div
      style={{
        display: "flex",
        marginBottom: 30,
      }}
    >
      <AccountCircleIcon color="action" sx={{ marginTop: 0.5, fontSize: 45 }} />
      <Input
        sx={{ padding: 1 }}
        placeholder="Write a comment..."
        fullWidth
        value={content}
        onChange={handleCommentChange}
        id="outlined-basic"
        label="Create Comment"
        multiline
      />
      <Button
        disabled={!content || isLoading}
        label="Comment"
        onClick={submitCreateComment}
        sx={{ paddingLeft: 3, paddingRight: 3 }}
      />
    </div>
  );
};

// ------------------------------------------------

export default CreateComment;

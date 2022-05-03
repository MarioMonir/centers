import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import React, { useState } from "react";
import { Button, useUpdate } from "react-admin";

// ------------------------------------------------

const EditPost = ({ post, setIsEditing }) => {
  const [content, setContent] = useState(post.content);
  const [update, { isLoading }] = useUpdate();

  // ------------------------------------------------

  const handlePostChange = (e) => setContent(e?.target?.value);

  // ------------------------------------------------

  const clickAway = () => {
    if (content === post.content) setIsEditing(false);
  };

  // ------------------------------------------------

  const submitEditedPost = () => {
    const updatedPost = {
      ...post,
      content: content,
    };

    update("post", {
      id: post.id,
      data: updatedPost,
    });

    setIsEditing(false);
  };

  // ------------------------------------------------

  return (
    <ClickAwayListener onClickAway={clickAway}>
      <div style={{ display: "flex" }}>
        <Input
          sx={{ padding: 1 }}
          placeholder="Write a post..."
          fullWidth
          value={content}
          onChange={handlePostChange}
          multiline
          autoFocus={true}
        />
        <Button
          disabled={content === post.content || !content || isLoading}
          label="Save"
          onClick={submitEditedPost}
          sx={{ paddingLeft: 3, paddingRight: 3 }}
        />
      </div>
    </ClickAwayListener>
  );
};

// ------------------------------------------------

export default EditPost;

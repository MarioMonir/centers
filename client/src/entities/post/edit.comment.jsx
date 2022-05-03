import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import React, { useState } from "react";
import { Button, useUpdate } from "react-admin";

// ------------------------------------------------

const EditComment = ({ post, comment, commentId, setIsEditing }) => {
  const [content, setContent] = useState(comment.content);
  const [update, { isLoading }] = useUpdate();

  // ------------------------------------------------

  const handleCommentChange = (e) => setContent(e?.target?.value);

  // ------------------------------------------------

  const clickAway = () => {
    if (content === comment.content) setIsEditing(false);
  };

  // ------------------------------------------------

  const submitEditComment = () => {
    //post.comments[{"userId":123 ,"content":"comment content" ,"createdAt": date, "likes":{"userIds":[5,2,4,6]}}]

    const updatedComment = {
      ...comment,
      content: content,
    };

    const commentsList = post?.comments?.list;

    commentsList[commentId] = updatedComment;

    update("post", {
      id: post.id,
      data: {
        comments: { list: commentsList },
      },
    });
    setIsEditing(false);
  };

  // ------------------------------------------------

  return (
    <ClickAwayListener onClickAway={clickAway}>
      <div style={{ display: "flex" }}>
        <Input
          sx={{ padding: 1 }}
          placeholder="Write a comment..."
          fullWidth
          value={content}
          onChange={handleCommentChange}
          multiline
          autoFocus={true}
        />
        <Button
          disabled={content === comment.content || !content || isLoading}
          label="Save"
          onClick={submitEditComment}
          sx={{ paddingLeft: 3, paddingRight: 3 }}
        />
      </div>
    </ClickAwayListener>
  );
};

// ------------------------------------------------

export default EditComment;

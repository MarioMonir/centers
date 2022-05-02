import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import CreateComment from "../create.comment";
import CommentCard from "./CommentCard";

// ------------------------------------------------

const PostComments = ({ post, expanded }) => {
  const [numberOfComments, setNumberOfComments] = useState(4);
  const [comments, setComments] = useState(
    post?.comments?.list.slice(0, numberOfComments)
  );

  // ------------------------------------------------

  const handleClick = () => {
    setNumberOfComments(
      Math.min(numberOfComments + 4, post?.comments?.list?.length)
    );
  };

  // ------------------------------------------------

  useEffect(() => {
    setComments(post?.comments?.list.slice(0, numberOfComments));
  }, [numberOfComments, post]);

  // ------------------------------------------------

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CreateComment post={post} />

      {comments.map((comment, commentId) => (
        <CommentCard key={commentId} {...{ post, comment, commentId }} />
      ))}

      <IconButton
        disabled={numberOfComments >= post?.comments?.list?.length}
        onClick={handleClick}
        sx={{ margin: 1, marginLeft: 4, marginRight: 4 }}
      >
        <ExpandMoreIcon />
      </IconButton>
    </Collapse>
  );
};

// ------------------------------------------------

export default PostComments;

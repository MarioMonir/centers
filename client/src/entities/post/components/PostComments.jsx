import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
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
      <div
        style={{
          margin: 10,
          marginLeft: 30,
          marginRight: 30,
        }}
      >
        <CreateComment post={post} />

        {comments.map((comment, commentId) => (
          <CommentCard key={commentId} {...{ post, comment, commentId }} />
        ))}

        <Button
          disabled={numberOfComments >= post?.comments?.list?.length}
          onClick={handleClick}
          sx={{
            padding: 2,
            width: "100%",
            display:
              numberOfComments >= post?.comments?.list?.length ? "none" : "",
          }}
        >
          <ExpandMoreIcon />
          See More
        </Button>
      </div>
    </Collapse>
  );
};

// ------------------------------------------------

export default PostComments;

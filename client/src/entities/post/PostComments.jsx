import Collapse from "@mui/material/Collapse";
import CommentCard from "./CommentCard";

// ------------------------------------------------

const PostComments = (post) => {
  return (
    <Collapse in={post.expanded} timeout="auto" unmountOnExit>
      {post?.comments?.list?.map((comment, commentId) => (
        <CommentCard key={commentId} {...{ post, comment, commentId }} />
      ))}
    </Collapse>
  );
};

// ------------------------------------------------

export default PostComments;

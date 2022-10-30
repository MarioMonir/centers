import ErrorIcon from "@mui/icons-material/Error";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import { useUpdate } from "react-admin";

// ------------------------------------------------

const CommentLikeButton = ({ post, comment, commentId }) => {
  // ------------------------------------------------

  const user = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = user?.id;

  // ------------------------------------------------

  const {
    likes: { userIds },
  } = comment;

  const [update, { isLoading, error }] = useUpdate();

  // ------------------------------------------------

  const handleClick = () => {
    // removes userId if exists and adds it if not

    let newUserIds = userIds;
    let newCommentList = post.comments.list;

    if (userIds?.includes(loggedInUserId)) {
      newUserIds = userIds?.filter((id) => id !== loggedInUserId);
    } else {
      newUserIds = userIds?.concat([loggedInUserId]);
    }

    newCommentList[commentId].likes = {
      userIds: newUserIds,
    };

    update("post", {
      id: post.id,
      data: {
        comments: { list: newCommentList },
      },
    });
  };

  // ------------------------------------------------

  if (error) return <ErrorIcon />;

  // ------------------------------------------------

  return (
    <IconButton disabled={isLoading} onClick={handleClick} size="small">
      <ThumbUpIcon
        fontSize="inherit"
        color={userIds?.includes(loggedInUserId) ? "primary" : ""}
      />
    </IconButton>
  );
};

// ------------------------------------------------

export default CommentLikeButton;

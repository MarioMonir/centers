import ErrorIcon from "@mui/icons-material/Error";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import { useUpdate } from "react-admin";

// ------------------------------------------------

const CommentLikeButton = ({ post, comment, commentId }) => {
  // removes userId if exists and adds it if not

  let data = post;
  const loggedInUserId = 1;
  const record = data?.comments?.list[commentId];
  const {
    likes: { userIds, number },
  } = record;

  const [update, { isLoading, error }] = useUpdate("post");

  // ------------------------------------------------

  const handleClick = () => {
    let newNumber = number;
    let newUserIds = userIds;
    let newCommentList = data.comments.list;

    if (userIds?.includes(loggedInUserId)) {
      newNumber -= 1;
      newUserIds = userIds?.filter((id) => id !== loggedInUserId);
      newCommentList[commentId].likes = {
        number: newNumber,
        userIds: newUserIds,
      };
    } else {
      newUserIds = userIds?.concat([loggedInUserId]);
      newNumber = number + 1;
      newCommentList[commentId].likes = {
        number: newNumber,
        userIds: newUserIds,
      };
    }

    update("post", {
      id: data.id,
      data: {
        comments: { list: newCommentList },
      },
    });
  };

  if (error) return <ErrorIcon />;

  // ------------------------------------------------

  return (
    <IconButton
      disabled={isLoading}
      onClick={handleClick}
      aria-label="add to favorites"
      size="small"
    >
      <ThumbUpIcon
        fontSize="inherit"
        color={userIds?.includes(loggedInUserId) ? "primary" : ""}
      />
    </IconButton>
  );
};

// ------------------------------------------------

export default CommentLikeButton;

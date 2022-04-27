import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import { useUpdate } from "react-admin";

// ------------------------------------------------

const PostLikeButton = ({ id, likes: { userIds, number } }) => {
  // removes userId if exists and adds it if not

  const [update, { isLoading, error }] = useUpdate("post");
  const loggedInUserId = 1;

  // ------------------------------------------------

  const handleClick = () => {
    let newNumber = number;
    let newUserIds = userIds;

    if (userIds?.includes(loggedInUserId)) {
      newUserIds = userIds?.filter((id) => id !== loggedInUserId);
      newNumber = number - 1;
    } else {
      newUserIds = userIds?.concat([loggedInUserId]);
      newNumber = number + 1;
    }

    update("post", {
      id,
      data: { likes: { number: newNumber, userIds: newUserIds } },
    });
  };

  // ------------------------------------------------

  if (error) return <ErrorIcon />;

  // ------------------------------------------------

  return (
    <IconButton
      disabled={isLoading}
      onClick={handleClick}
      key={"like" + id}
      aria-label="add to favorites"
    >
      <ThumbUpIcon color={userIds?.includes(loggedInUserId) ? "primary" : ""} />
    </IconButton>
  );
};

// ------------------------------------------------

export default PostLikeButton;

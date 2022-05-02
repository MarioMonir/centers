import ErrorIcon from "@mui/icons-material/Error";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import { useUpdate } from "react-admin";

// ------------------------------------------------

const PostLikeButton = ({ id, likes }) => {
  //console.log(id, likes);
  const [update, { isLoading, error }] = useUpdate();
  const loggedInUserId = 1;
  const { userIds } = likes;

  // ------------------------------------------------

  const handleClick = () => {
    // removes userId if exists and adds it if not

    let newUserIds = userIds;

    if (userIds?.includes(loggedInUserId)) {
      newUserIds = userIds?.filter((id) => id !== loggedInUserId);
    } else {
      newUserIds = userIds?.concat([loggedInUserId]);
    }

    update("post", {
      id,
      data: { likes: { userIds: newUserIds } },
    });
  };

  // ------------------------------------------------

  if (error) return <ErrorIcon />;

  // ------------------------------------------------

  return (
    <IconButton disabled={isLoading} onClick={handleClick}>
      <ThumbUpIcon color={userIds?.includes(loggedInUserId) ? "primary" : ""} />
    </IconButton>
  );
};

// ------------------------------------------------

export default PostLikeButton;

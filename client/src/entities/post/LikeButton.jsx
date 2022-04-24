import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import { useUpdate } from "react-admin";

// ------------------------------------------------

const LikeButton = (record) => {
  const loggedInUserId = 1;
  var diff = {};
  if (record?.likes?.userIds?.includes(loggedInUserId)) {
    diff = {
      likes: {
        number: record?.likes?.number - 1,
        userIds: record?.likes?.userIds?.filter(function (e) {
          return e !== loggedInUserId;
        }),
      },
    };
  } else {
    diff = {
      likes: {
        number: record?.likes.number + 1,
        userIds: record?.likes?.userIds?.concat([loggedInUserId]),
      },
    };
  }

  const [update, { isLoading, error }] = useUpdate("post");

  // ------------------------------------------------

  const handleClick = () => {
    update("post", { id: record?.id, data: diff, previousData: record });
  };
  if (error) {
    return <ErrorIcon />;
  }

  // ------------------------------------------------

  return (
    <IconButton
      disabled={isLoading}
      onClick={handleClick}
      key={"like" + record?.id}
      aria-label="add to favorites"
    >
      <ThumbUpIcon
        color={
          record?.likes?.userIds?.includes(loggedInUserId) ? "secondary" : ""
        }
      />
    </IconButton>
  );
};

// ------------------------------------------------

export default LikeButton;

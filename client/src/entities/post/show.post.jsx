import { LoadingIndicator, useGetOne, useRedirect } from "react-admin";
import { useParams } from "react-router-dom";
import PostCard from "./components/PostCard";

// ------------------------------------------------

const ShowPost = () => {
  const { id } = useParams();
  const redirect = useRedirect();
  const { data, isLoading } = useGetOne(
    "post",
    { id },
    { onError: () => redirect("/post") }
  );

  // ------------------------------------------------

  if (isLoading) return <LoadingIndicator />;

  // ------------------------------------------------

  return <PostCard {...data} />;
};

// ------------------------------------------------

export default ShowPost;

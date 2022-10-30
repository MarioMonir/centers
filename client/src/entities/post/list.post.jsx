import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useGetList } from "react-admin";
import PostCard from "./components/PostCard";
import CreatePost from "./create.post";
import NoRecords from "../../reactAdmin/components/NoRecords";
import config from "../../configs/config";

// =================================================================

const ListPost = ({ groupId }) => {
  const [perPage, setPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [userRelation, setUserRelation] = useState([]);
  const [followId, setFollowId] = useState([]);

  // ---------------------------------------------

  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => setLoggedUser(user), []);

  // ---------------------------------------------

  // Use api (  no harcdocded fetch )
  useEffect(async () => {
    //filter with logged user
    await fetch(`${config.baseUrl}/userrelation`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserRelation(data);
        const followIduser = data.filter(
          (item) => item.followerId === loggedUser.id
        );
        console.log("followIduser", followIduser);

        setFollowId(followIduser.map((item) => item.followingId));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [loggedUser]);

  //filter with logged user

  // ---------------------------------------------
  console.log("userRelation", userRelation);

  // ------------------------------------------------

  const { data, isLoading, refetch, total } = useGetList("post", {
    pagination: { page: 1, perPage: perPage },
    sort: { field: "createdAt", order: "DESC" },
    filter: { userId: [followId].flat(), groupId: groupId }, //filter with followers and enrolments in home.
  });

  // ------------------------------------------------

  useEffect(() => {
    if (!!data?.length) {
      setPosts(data);
    }
  }, [data]);

  // ------------------------------------------------

  const handleClick = () => setPerPage(perPage + 5);

  // ------------------------------------------------

  return (
    <Box gap={2} display="grid" sx={{ maxWidth: 800, marginTop: "30px" }}>
      {loggedUser?.userType?.toLowerCase() === "student" ? (
        <></>
      ) : (
        <CreatePost {...{ refetch, groupId }} />
      )}

      {posts?.length ? (
        posts?.map((record) => <PostCard key={record?.id} {...record} />)
      ) : (
        <NoRecords>
          <h1>No Posts</h1>
        </NoRecords>
      )}
      {posts?.length > 0 && (
        <Button
          disabled={isLoading}
          label="See More"
          onClick={handleClick}
          sx={{ padding: 3, display: perPage > total ? "none" : "" }}
        >
          <ExpandMoreIcon />
          See More
        </Button>
      )}
    </Box>
  );
};

// ------------------------------------------------

export default ListPost;

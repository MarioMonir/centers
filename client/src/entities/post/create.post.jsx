import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import React, { useEffect, useState } from "react";
import { Button, useCreate, useTranslate } from "react-admin";
import Protected from "../../reactAdmin/components/Protected";

// ------------------------------------------------

const CreatePost = ({ refetch, groupId }) => {
  const [loggedUser, setLoggedUser] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => setLoggedUser(user), []);

  const [content, setContent] = useState("");
  const [create, { data: createdPost, isLoading }] = useCreate();

  // - - - - - - - - - - - - - - - - -

  const handlePostChange = (e) => setContent(e?.target?.value);

  // - - - - - - - - - - - - - - - - -

  const submitCreatePost = () => {
    setContent("");
    create("post", { data: { userId: loggedUser.id, groupId, content } });
  };

  // - - - - - - - - - - - - - - - - -

  useEffect(() => {
    if (createdPost) refetch();
  }, [createdPost]);

  // ------------------------------------------------
  const translate = useTranslate();
  return (
    <Card sx={{ padding: 1.5 }}>
      <div style={{ display: "flex" }}>
        <AccountCircleIcon
          color="action"
          sx={{ marginTop: 0.5, fontSize: 45 }}
        />
        <Input
          sx={{ margin: 1 }}
          placeholder={
            groupId
              ? translate("resources.post.fields.shareWithYourFollowers")
              : translate("resources.post.fields.shareWithYourGroup")
          }
          fullWidth
          value={content}
          onChange={handlePostChange}
          id="outlined-basic"
          label="Create Post"
          multiline
        />
        <Button
          disabled={!content || isLoading}
          label={translate("resources.post.name")}
          onClick={submitCreatePost}
        />
      </div>
    </Card>
  );
};

// ------------------------------------------------

export default CreatePost;

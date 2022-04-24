import Collapse from "@mui/material/Collapse";

const PostComments = (data) => {
  //console.log(data.expanded);
  return (
    <Collapse in={data.expanded} timeout="auto" unmountOnExit>
      comments
    </Collapse>
  );
};

export default PostComments;

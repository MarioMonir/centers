import show from "./show.userRelation";
import create from "./create.userRelation";
import edit from "./edit.userRelation";
import list from "./list.userRelation";

export default {
  name: "userRelation",
  label: "UserRelation",
  hide: true,
  create,
  edit,
  list,
  show,
};

import show from "./show.enrollment";
import create from "./create.enrollment";
import edit from "./edit.enrollment";
import list from "./list.enrollment";

export default {
  name: "enrollment",
  label: "Enrollment",
  hide: true,
  create,
  edit,
  list,
  show,
};

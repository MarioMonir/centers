import show from "./show.attendance";
import create from "./create.attendance";
import edit from "./edit.attendance";
import list from "./list.attendance";

export default {
  name: "attendance",
  label: "Attendance",
  hide: true,
  create,
  edit,
  list,
  show,
};

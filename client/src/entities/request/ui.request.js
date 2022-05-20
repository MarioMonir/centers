import show from "./show.request";
import create from "./create.request";
import edit from "./edit.request";
import list from "./list.request";

export default {
  name: "request",
  label: "Request",
  hide: true,
  create,
  edit,
  list,
  show,
};

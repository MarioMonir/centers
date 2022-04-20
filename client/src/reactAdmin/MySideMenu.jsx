import { Sidebar, MenuItemLink, useTranslate } from "react-admin";
import GroupIcon from "@mui/icons-material/Group";
import entities from "../entities/entities";

// ------------------------------------------------

export default function MySideMenu(props) {
  const translate = useTranslate();
  return (
    <Sidebar {...props}>
      {entities
        .filter((e) => !e.hide)
        .map((entity, index) => {
          const { name, label } = entity;
          return (
            <MenuItemLink
              key={name + "-" + index}
              to={`/${name}`}
              resource={entity}
              primaryText={translate(label)}
              leftIcon={<GroupIcon />}
            />
          );
        })}
      {/* <MenuItemLink
        key={"asd"}
        to={`/asd`}
        primaryText={"custom route to 404"}
        leftIcon={<GroupIcon />}
      /> */}
    </Sidebar>
  );
}

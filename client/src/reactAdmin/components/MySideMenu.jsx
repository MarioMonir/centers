import { Sidebar, MenuItemLink, useTranslate } from "react-admin";
import GroupIcon from "@mui/icons-material/Group";
import entities from "../../entities/entities";
import SearchIcon from "@mui/icons-material/Search";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import SubMenu from "./MySubMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import React, { useState, useEffect } from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
// ------------------------------------------------

export default function MySideMenu(props) {
  const translate = useTranslate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [loggedUser, setLoggedUser] = useState([]);

  useEffect(() => {
    setLoggedUser(user);
  }, []);
  const icons = {
    group: <GroupIcon />,
    video: <YouTubeIcon />,
    post: <ViewTimelineIcon />,
  };

  // ------------------------------------------------
  return (
    <Sidebar
      {...props}
      sx={{
        marginTop: 5,
      }}
    >
      <MenuItemLink
        to={`/profile`}
        primaryText={translate("menu.profile")}
        leftIcon={<AccountCircleIcon />}
      />
      {entities
        ?.filter((e) => !e.hide)
        .map((entity, index) => {
          const { name, label } = entity;
          return (
            <MenuItemLink
              key={name + "-" + index}
              to={`/${name}`}
              resource={entity}
              primaryText={translate("menu." + label)}
              leftIcon={icons[name] ? icons[name] : <GroupIcon />}
            />
          );
        })}

      {loggedUser?.userType === "Student" ? (
        <></>
      ) : (
        <>
          <MenuItemLink
            to={`/user/create`}
            resource={"user"}
            primaryText={translate("menu.user")}
            leftIcon={<GroupIcon />}
          />
          <MenuItemLink
            to={`/wallet`}
            primaryText={translate("menu.wallet")}
            leftIcon={<AccountBalanceWalletIcon />}
          />
        </>
      )}

      <MenuItemLink
        to={`/search`}
        primaryText={translate("menu.search")}
        leftIcon={<SearchIcon />}
      />

      {loggedUser?.userType === "Developer" ||
        (loggedUser.userType === "Center" && (
          <MenuItemLink
            to={`/settlement`}
            primaryText={translate("menu.settlement")}
            leftIcon={<CurrencyExchangeIcon />}
          />
        ))}
      <SubMenu name={translate("menu.settings")} icon={<SettingsIcon />}>
        <MenuItemLink
          to={`/restPassword`}
          primaryText={translate("menu.restPassword")}
          leftIcon={<PasswordIcon />}
        />
      </SubMenu>
    </Sidebar>
  );
}

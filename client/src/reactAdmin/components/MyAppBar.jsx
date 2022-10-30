import { Box, Typography } from "@mui/material";
import * as React from "react";
import { AppBar, Logout, UserMenu } from "react-admin";

import NotificationBell from "../../entities/request/components/NotificationBell";
import SwitchLanguage from "./SwitchLanguage";
import ThemeToggler from "./ThemeToggler";
import Avatar from "@mui/material/Avatar";
import Logo from "../../../../server/assets/images/inbound8966086389108990020.png";
// ------------------------------------------------
const MyCustomIcon = () => (
  <Avatar
    sx={{
      height: 30,
      width: 30,
    }}
    src={Logo}
  />
);
// localStorage.getItem("avatar");
const MyUserMenu = (props) => (
  <UserMenu {...props} icon={<MyCustomIcon />}>
    <SwitchLanguage />
    <Logout />
    <ThemeToggler />
  </UserMenu>
);

// ------------------------------------------------

const MyAppBar = (props) => (
  <AppBar
    {...props}
    userMenu={<MyUserMenu />}
    style={{
      backgroundColor: "#013e5a",
      height: 50,
    }}
  >
    <img src="../../../public/logo13.png" height={50} />
    <Box flex="1">
      <Typography variant="h6" id="react-admin-title"></Typography>
    </Box>

    <NotificationBell />
  </AppBar>
);

export default MyAppBar;

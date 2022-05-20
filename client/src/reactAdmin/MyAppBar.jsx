import { Box, Typography } from "@mui/material";
import * as React from "react";
import { AppBar, Logout, UserMenu } from "react-admin";
import NotificationBell from "../entities/request/components/NotificationBell";
import SwitchLanguage from "./SwitchLanguage";
import ThemeToggler from "./ThemeToggler";

// ------------------------------------------------

const MyUserMenu = (props) => (
  <UserMenu {...props}>
    <SwitchLanguage />
    <ThemeToggler />
    <Logout />
  </UserMenu>
);

// ------------------------------------------------

const MyAppBar = (props) => (
  <AppBar {...props} userMenu={<MyUserMenu />} style={{ paddingLeft: 10 }}>
    <Box flex="1">
      <Typography variant="h6" id="react-admin-title"></Typography>
    </Box>

    <NotificationBell />
  </AppBar>
);

export default MyAppBar;

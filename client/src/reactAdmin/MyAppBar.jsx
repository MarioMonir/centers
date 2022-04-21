import { Box, Typography } from "@mui/material";
import * as React from "react";
import { AppBar, Logout, UserMenu } from "react-admin";
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
  <AppBar {...props} userMenu={<MyUserMenu />} style={{ paddingLeft: 10 }} />
);

export default MyAppBar;

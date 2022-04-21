import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
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
  <AppBar {...props} userMenu={<MyUserMenu />} style={{ paddingLeft: 10 }}>
    <Box flex="1">
      <Typography variant="h6" id="react-admin-title"></Typography>
    </Box>
    <Box paddingRight={2} paddingLeft={2}>
      <Badge
        color="primary"
        badgeContent={4562}
        max={999}
        //style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <NotificationsIcon />
      </Badge>
    </Box>
  </AppBar>
);

export default MyAppBar;

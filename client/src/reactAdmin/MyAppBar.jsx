import LanguageIcon from "@mui/icons-material/Language";
import { Box, createTheme, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import {
  AppBar,
  defaultTheme,
  Logout,
  ToggleThemeButton,
  useLocaleState,
  UserMenu,
  useUserMenu,
} from "react-admin";

// ------------------------------------------------

const SwitchLanguage = React.forwardRef((props, ref) => {
  const [locale, setLocale] = useLocaleState();
  const { onClose } = useUserMenu();
  return (
    <MenuItem
      ref={ref}
      {...props}
      sx={{ color: "text.secondary" }}
      onClick={(event) => {
        setLocale(locale === "en" ? "ar" : "en");
        document.dir = locale === "en" ? "rtl" : "ltr";
        onClose(); // Close the menu
      }}
    >
      <ListItemIcon sx={{ minWidth: 5 }}>
        <LanguageIcon />
      </ListItemIcon>
      <ListItemText>{locale === "en" ? "عربي" : "English"}</ListItemText>
    </MenuItem>
  );
});

// ------------------------------------------------

const MyUserMenu = (props) => (
  <UserMenu {...props}>
    <SwitchLanguage />
    <Logout />
  </UserMenu>
);

// ------------------------------------------------

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

// ------------------------------------------------

const MyAppBar = (props) => (
  <AppBar {...props} userMenu={<MyUserMenu />}>
    <Box flex="1">
      <Typography variant="h6" id="react-admin-title"></Typography>
    </Box>

    <ToggleThemeButton lightTheme={defaultTheme} darkTheme={darkTheme} />
  </AppBar>
);

export default MyAppBar;

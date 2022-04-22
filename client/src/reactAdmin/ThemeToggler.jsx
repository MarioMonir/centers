import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { defaultTheme, useTheme, useUserMenu, useTranslate } from "react-admin";

// ------------------------------------------------

const lightTheme = defaultTheme;
const darkTheme = {
  ...defaultTheme,
  palette: {
    mode: "dark",
  },
};

// ------------------------------------------------

const ThemeToggler = React.forwardRef((props, ref) => {
  const [theme, setTheme] = useTheme();
  const translate = useTranslate();
  const { onClose } = useUserMenu();
  return (
    <MenuItem
      ref={ref}
      {...props}
      sx={{ color: "text.secondary" }}
      onClick={() => {
        setTheme(theme?.palette?.mode === "dark" ? lightTheme : darkTheme);
        document.body.style.backgroundColor =
          theme?.palette.mode === "dark" ? "#fafafb" : "#121212";
        onClose(); // Close the menu
      }}
    >
      <ListItemIcon sx={{ minWidth: 5 }}>
        {theme?.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </ListItemIcon>
      <ListItemText>
        {theme?.palette.mode === "dark"
          ? translate("other.light")
          : translate("other.dark")}
      </ListItemText>
    </MenuItem>
  );
});

export default ThemeToggler;

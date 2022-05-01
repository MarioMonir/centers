import { DefaultTheme, configureFonts } from "react-native-paper";

// -------------------------------------------------
const fonts = {
  fontFamily: "sans-serif",
  fontWeight: "normal",
};

// -------------------------------------------------

const fontSizes = {
  regular: fonts,
  medium: fonts,
  light: fonts,
  thin: fonts,
};

// -------------------------------------------------

const fontConfig = {
  web: fontSizes,
  ios: fontSizes,
  android: fontSizes,
};

// -------------------------------------------------

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0AA1DD",
    accent: "green",
    accent: "#0AA1DD",
  },
  fonts: configureFonts(fontConfig),
};

// -------------------------------------------------

export default theme;

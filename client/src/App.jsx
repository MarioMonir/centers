//import { StylesProvider, jssPreset } from "@mui/styles";
//import { create } from "jss";
//import rtl from "jss-rtl";
import React from "react";
import MyAdmin from "./reactAdmin/MyAdmin";
// ------------------------------------------------

// Configure JSS
//const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// ------------------------------------------------

//set initial direction
const locale = JSON.parse(localStorage.getItem("RaStore.locale")) || "en";
document.dir = locale === "en" ? "ltr" : "rtl";

//set initial backgroundColor for dark mode
const initiallyDarkMode = JSON.parse(localStorage.getItem("RaStore.theme"))
  ?.palette?.mode;
console.log(initiallyDarkMode);
document.body.style.backgroundColor =
  initiallyDarkMode === "dark" ? "#121212" : "#fafafb";

// ------------------------------------------------

function App() {
  return (
    //<StylesProvider jss={jss}>
    <MyAdmin />
    //</StylesProvider>
  );
}

// ------------------------------------------------

export default App;

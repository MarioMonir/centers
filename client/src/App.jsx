import MyAdmin from "./reactAdmin/MyAdmin";

// ------------------------------------------------

//set initial direction
const locale = JSON.parse(localStorage.getItem("RaStore.locale")) || "en";
document.dir = locale === "en" ? "ltr" : "rtl";

// ------------------------------------------------

function App() {
  return <MyAdmin />;
}

// ------------------------------------------------

export default App;

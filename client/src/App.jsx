import MyAdmin from "./reactAdmin/MyAdmin";

// ------------------------------------------------

const locale = JSON.parse(localStorage.getItem("RaStore.locale")) || "en";
console.log(locale);
document.dir = locale === "en" ? "ltr" : "rtl";

// ------------------------------------------------

function App() {
  return <MyAdmin />;
}

// ------------------------------------------------

export default App;

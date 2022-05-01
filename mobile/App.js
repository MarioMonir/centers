import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import store from "./src/Store/app.store";
import AppNavigator from "./src/Navigators/App.navigator";
import theme from "./src/Theme/paper.theme";

// ==============================================================

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import store from "./src/Store/app.store";
import AppNavigator from "./src/Navigators/App.navigator";
import theme from "./src/Theme/paper.theme";
import {
  useCreateAuthContext,
  authContext,
} from "./src/Store/AuthContextProvider";

// ==============================================================

export default function App() {
  const authValue = useCreateAuthContext();

  return (
    <authContext.Provider value={authValue}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </authContext.Provider>
  );
}

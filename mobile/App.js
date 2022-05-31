import { I18nManager } from "react-native";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import store from "./src/Store/app.store";
import AppNavigator from "./src/Navigators/App.navigator";
import theme from "./src/Theme/paper.theme";
import Toast from "react-native-toast-message";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import translations from "./src/Config/translations";
import toastConfig from "./src/Config/toast.config";

// ==============================================================

i18n.translations = translations;
i18n.locale = "ar";
//Localization.locale;
i18n.fallbacks = true;

// ==============================================================

export default function App() {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  return (
    <>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}

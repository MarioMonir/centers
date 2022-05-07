import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import ScreensNavigator from "./Screens.navigator";
import { useAuthContext } from "../Store/AuthContextProvider";
import UnAuthorizedNavigator from "./UnAuthorized.navigator";

// ==============================================================

export default function AppNavigator() {
  const { isAuthenticated } = useAuthContext();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuthenticated ? <ScreensNavigator /> : <UnAuthorizedNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

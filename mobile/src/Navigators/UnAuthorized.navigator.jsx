import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Screens/Home/Home.screen";
import MyAppBar from "../Components/MyAppBar";
import { capitalize } from "../Utils/string.util";
import LoginScreen from "../Screens/Auth/Login.screen";
import RegisterScreen from "../Screens/Auth/Register.screen";

const Stack = createNativeStackNavigator();

// ==============================================================

const stackrops = {
  initialRouteName: "Login",
};

const screenOptions = {
  header: (props) => <MyAppBar {...props} />,
};

// ==============================================================

export default function UnAuthorizedNavigator() {
  return (
    <Stack.Navigator {...stackrops}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Regiseter" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

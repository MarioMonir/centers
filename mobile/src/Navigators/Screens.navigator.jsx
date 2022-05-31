import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStatusBar from "../Components/MyStatusBar";
import TabNavigator from "./Tab.navigator";
import CreateGroupScreen from "../Screens/Entities/Group/Create.group.screen";
import ShowGroupScreen from "../Screens/Entities/Group/Show.group.screen";
import EditGroupScreen from "../Screens/Entities/Group/Edit.group.screen";
import DatesGroupScreen from "../Screens/Entities/Group/Dates.group.screen";

// ==============================================================

const Stack = createNativeStackNavigator();

// ==============================================================

const stackrops = {
  initialRouteName: "Tabs",
};

const screenOptions = {
  headerShown: true,
  header: (props) => <MyStatusBar {...props} />,
};

// ==============================================================

export default function ScreensNavigator() {
  return (
    <Stack.Navigator {...stackrops}>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={screenOptions}
      />
      <Stack.Screen
        name="CreateGroupScreen"
        component={CreateGroupScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="ShowGroupScreen"
        component={ShowGroupScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="EditGroupScreen"
        component={EditGroupScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="DatesGroupScreen"
        component={DatesGroupScreen}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}

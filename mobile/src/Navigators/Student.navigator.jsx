import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import MyStatusBar from "../Components/MyStatusBar";
import TabNavigator from "./Tab.navigator";
import CreateGroupScreen from "../Screens/Entities/Group/Create.group.screen";
import ShowGroupScreen from "../Screens/Entities/Group/Show.group.screen";
import EditGroupScreen from "../Screens/Entities/Group/Edit.group.screen";
import DatesGroupScreen from "../Screens/Entities/Group/Dates.group.screen";
import StudentDrawer from "../Screens/Entities/Student/Student.drawer";
// ==============================================================

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// ==============================================================

const stackrops = {
  initialRouteName: "Tabs",
};

const screenOptions = {
  headerShown: true,
  header: (props) => <MyStatusBar {...props} />,
};

// ==============================================================

function StudentScreens() {
  return (
    <Stack.Navigator {...stackrops}>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={screenOptions}
      />
      <Stack.Screen
        name="ShowGroupScreen"
        component={ShowGroupScreen}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}

// ==============================================================

// ==============================================================

// ==============================================================

// ==============================================================

export default function StudentDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeScreen"
      drawerStyle={{ width: wp(70) }}
      edgeWidth={15}
      screenOptions={{ swipeEnabled: true }}
      drawerPosition="right"
      drawerContent={(props) => <StudentDrawer {...props} />}
    >
      <Drawer.Screen name="HomeScreen" component={ScreensNavigator} />
    </Drawer.Navigator>
  );
}

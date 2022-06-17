import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "../Store/redux.hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../Theme/paper.theme";
import MyStatusBar from "../Components/MyStatusBar";
import i18n from "i18n-js";

// -------------------------------------------------------

import TeacherHomeScreen from "../Screens/Entities/Teacher/TeacherHome.screen";
import TeacherProfileScreen from "../Screens/Entities/Teacher/Teacher.profile.screen";

// -------------------------------------------------------

import StudentHomeScreen from "../Screens/Entities/Student/StudentHome.screen";
import SettingsScreen from "../Screens/Generics/Settings.screen";

// -------------------------------------------------------

const Tab = createBottomTabNavigator();

// -------------------------------------------------------

const screenOptions = ({ route: { name } }) => ({
  headerShown: false,
  swipeEnabled: true,
  header: (props) => <MyStatusBar {...props} />,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = "home";

    if (name === i18n.t("home")) {
      iconName = "home";
    } else if (name === i18n.t("settings")) {
      iconName = "tools";
    } else if (name === i18n.t("profile")) {
      iconName = "account";
    }

    return <MaterialCommunityIcons name={iconName} size={26} color={color} />;
  },
  tabBarActiveTintColor: theme.colors.primary,
  tabBarInactiveTintColor: "gray",
  tabBarStyle: { height: hp(9) },
  tabBarItemStyle: { paddingTop: hp(0.5), paddingBottom: hp(1.5) },
  swipeEnabled: true,
  tabBarHideOnKeyboard: true,
});

// -------------------------------------------------------

export default function TabNavigator() {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const userType = useAppSelector((state) => state?.auth?.user?.userType);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return userType === "Teacher" ? (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={i18n.t("home")} component={TeacherHomeScreen} />
      <Tab.Screen name={i18n.t("profile")} component={TeacherProfileScreen} />
      <Tab.Screen name={i18n.t("settings")} component={SettingsScreen} />
    </Tab.Navigator>
  ) : (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={StudentHomeScreen} />
    </Tab.Navigator>
  );
}

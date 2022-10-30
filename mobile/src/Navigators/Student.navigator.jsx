import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyStatusBar from "../Components/MyStatusBar";
import ShowGroupScreen from "../Screens/Entities/Group/Show.group.screen";
import StudentDrawer from "../Screens/Entities/Student/Student.drawer";
import i18n from "i18n-js";
import theme from "../Theme/paper.theme";
import ExploreScreen from "../Screens/Entities/Student/Explore.screen";
import ProfileScreen from "../Screens/Generics/Profile.screen";
import ListGroupScreen from "../Screens/Entities/Group/List.group.screen";
import { useGetListQuery } from "../API/api";
import { useAppDispatch } from "../Store/redux.hooks";
import { setEnrolments } from "../Store/Slices/enrolments.slice";
import { setRequests } from "../Store/Slices/requests.slice";
import { useAppSelector } from "../Store/redux.hooks";
import GroupTabNavigator from "../Screens/Entities/Group/Group.tab.navigator";

// ==============================================================

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// ==============================================================

const stackrops = {
  initialRouteName: "Tabs",
};

const screenOptions = {
  headerShown: true,
  header: (props) => <MyStatusBar {...props} />,
};

// ==============================================================

const screenTabsOptions = ({ route: { name } }) => ({
  headerShown: false,
  swipeEnabled: true,
  header: (props) => <MyStatusBar {...props} />,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = "home";

    if (name === i18n.t("centers")) {
      iconName = "office-building";
    } else if (name === i18n.t("teachers")) {
      iconName = "account-tie-outline";
    } else if (name === "courses") {
      iconName = "bookshelf";
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

// ==============================================================

const ExploreTabs = () => (
  <Tab.Navigator screenOptions={screenTabsOptions}>
    <Tab.Screen
      name={i18n.t("centers")}
      children={() => <ExploreScreen type="Center" />}
    />
    <Tab.Screen
      name={i18n.t("teachers")}
      children={() => <ExploreScreen type="Teacher" />}
    />
    {/* <Tab.Screen
      name={i18n.t("courses")}
      children={() => <ExploreScreen type="course" />}
    /> */}
  </Tab.Navigator>
);

// ==============================================================

const StudentScreensNavigators = () => {
  return (
    <Stack.Navigator {...stackrops}>
      <Stack.Screen
        name="exploreGroups"
        component={ExploreTabs}
        options={screenOptions}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="groups"
        component={ListGroupScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="ShowGroupScreen"
        component={GroupTabNavigator}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

// ==============================================================

export default function StudentDrawerNavigator() {
  // -------------------------------
  /**
   *  Set initial state of requests and enrolments
   */

  // const user = useAppSelector((state) => state?.auth?.user);
  // const dispatch = useAppDispatch();

  // const { data: enrolments, error: enrolmentsError } = useGetListQuery({
  //   entity: "enrolment",
  //   filter: {
  //     studentId: user.id,
  //   },
  // });

  // const { data: requests, error: requestsError } = useGetListQuery({
  //   entity: "request",
  //   filter: {
  //     fromUserId: user?.id,
  //   },
  // });

  // -------------------------------

  // useEffect(() => {
  //   if (enrolments) {
  //     dispatch(setEnrolments(enrolments));
  //   }

  //   if (requests) {
  //     dispatch(setRequests(requests));
  //   }
  // }, [enrolments, requests]);

  // -------------------------------

  return (
    <Drawer.Navigator
      initialRouteName="exploreGroups"
      drawerStyle={{ width: wp(70) }}
      edgeWidth={15}
      screenOptions={{ swipeEnabled: true, headerShown: false }}
      drawerPosition="right"
      drawerContent={(props) => <StudentDrawer {...props} />}
    >
      <Drawer.Screen
        name={i18n.t("exploreGroups")}
        component={StudentScreensNavigators}
      />
    </Drawer.Navigator>
  );
}

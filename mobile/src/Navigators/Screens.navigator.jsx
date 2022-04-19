import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Screens/Home/Home.screen";
import MyStatusBar from "../Components/MyStatusBar";
import { capitalize } from "../Utils/string.util";

// User Screens
import ListUserScreen from "../Screens/Entities/User/List.user.screen";
import ShowUserScreen from "../Screens/Entities/User/Show.user.screen";
import CreateUserScreen from "../Screens/Entities/User/Create.user.screen";
import EditUserScreen from "../Screens/Entities/User/Edit.user.screen";

// UserRelation Screens
import ListUserRelationScreen from "../Screens/Entities/UserRelation/List.userRelation.screen";
import ShowUserRelationScreen from "../Screens/Entities/UserRelation/Show.userRelation.screen";
import CreateUserRelationScreen from "../Screens/Entities/UserRelation/Create.userRelation.screen";
import EditUserRelationScreen from "../Screens/Entities/UserRelation/Edit.userRelation.screen";

// Group Screens
import ListGroupScreen from "../Screens/Entities/Group/List.group.screen";
import ShowGroupScreen from "../Screens/Entities/Group/Show.group.screen";
import CreateGroupScreen from "../Screens/Entities/Group/Create.group.screen";
import EditGroupScreen from "../Screens/Entities/Group/Edit.group.screen";

// Flow Screens
import ListFlowScreen from "../Screens/Entities/Flow/List.flow.screen";
import ShowFlowScreen from "../Screens/Entities/Flow/Show.flow.screen";
import CreateFlowScreen from "../Screens/Entities/Flow/Create.flow.screen";
import EditFlowScreen from "../Screens/Entities/Flow/Edit.flow.screen";

// Attendance Screens
import ListAttendanceScreen from "../Screens/Entities/Attendance/List.attendance.screen";
import ShowAttendanceScreen from "../Screens/Entities/Attendance/Show.attendance.screen";
import CreateAttendanceScreen from "../Screens/Entities/Attendance/Create.attendance.screen";
import EditAttendanceScreen from "../Screens/Entities/Attendance/Edit.attendance.screen";

// Enrollment Screens
import ListEnrollmentScreen from "../Screens/Entities/Enrollment/List.enrollment.screen";
import ShowEnrollmentScreen from "../Screens/Entities/Enrollment/Show.enrollment.screen";
import CreateEnrollmentScreen from "../Screens/Entities/Enrollment/Create.enrollment.screen";
import EditEnrollmentScreen from "../Screens/Entities/Enrollment/Edit.enrollment.screen";

// Request Screens
import ListRequestScreen from "../Screens/Entities/Request/List.request.screen";
import ShowRequestScreen from "../Screens/Entities/Request/Show.request.screen";
import CreateRequestScreen from "../Screens/Entities/Request/Create.request.screen";
import EditRequestScreen from "../Screens/Entities/Request/Edit.request.screen";

// ==============================================================

const Stack = createNativeStackNavigator();

// ==============================================================

const stackrops = {
  initialRouteName: "Home",
  screenOptions: { headerShown: true, headerStyle: { background: "red" } },
};

const screenOptions = {
  headerTintColor: "red",
  headerTitle: (props) => <MyStatusBar {...props} />,
  headerTintColor: "blue",
};

// ==============================================================

const entitiesScreens = [
  {
    name: "user",
    screens: [
      { type: "List", component: ListUserScreen },
      { type: "Show", component: ShowUserScreen },
      { type: "Create", component: CreateUserScreen },
      { type: "Edit", component: EditUserScreen },
    ],
  },

  {
    name: "userRelation",
    screens: [
      { type: "List", component: ListUserRelationScreen },
      { type: "Show", component: ShowUserRelationScreen },
      { type: "Create", component: CreateUserRelationScreen },
      { type: "Edit", component: EditUserRelationScreen },
    ],
  },

  {
    name: "group",
    screens: [
      { type: "List", component: ListGroupScreen },
      { type: "Show", component: ShowGroupScreen },
      { type: "Create", component: CreateGroupScreen },
      { type: "Edit", component: EditGroupScreen },
    ],
  },

  {
    name: "flow",
    screens: [
      { type: "List", component: ListFlowScreen },
      { type: "Show", component: ShowFlowScreen },
      { type: "Create", component: CreateFlowScreen },
      { type: "Edit", component: EditFlowScreen },
    ],
  },

  {
    name: "attendance",
    screens: [
      { type: "List", component: ListAttendanceScreen },
      { type: "Show", component: ShowAttendanceScreen },
      { type: "Create", component: CreateAttendanceScreen },
      { type: "Edit", component: EditAttendanceScreen },
    ],
  },

  {
    name: "enrollment",
    screens: [
      { type: "List", component: ListEnrollmentScreen },
      { type: "Show", component: ShowEnrollmentScreen },
      { type: "Create", component: CreateEnrollmentScreen },
      { type: "Edit", component: EditEnrollmentScreen },
    ],
  },

  {
    name: "request",
    screens: [
      { type: "List", component: ListRequestScreen },
      { type: "Show", component: ShowRequestScreen },
      { type: "Create", component: CreateRequestScreen },
      { type: "Edit", component: EditRequestScreen },
    ],
  },
];

// ==============================================================

export default function ScreensNavigator() {
  return (
    <Stack.Navigator {...stackrops}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          ...screenOptions,
          title: "Home",
        }}
      />
      {entitiesScreens?.map(({ name, screens }) =>
        screens?.map(({ type, component }) => (
          <Stack.Screen
            name={type + capitalize(name) + "Screen"}
            initialParams={{ entity: name }}
            component={component}
            options={{
              ...screenOptions,
              title: type + " " + capitalize(name),
            }}
          />
        ))
      )}
    </Stack.Navigator>
  );
}

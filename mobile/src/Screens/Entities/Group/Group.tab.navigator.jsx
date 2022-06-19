import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import theme from "../../../Theme/paper.theme";
import Attendance from "./GroupAttendance";
import Material from "./GroupMaterial";
import ShowGroupScreen from "./Show.group.screen";
import i18n from "i18n-js";

// ====================================================================

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: "show", title: i18n.t("details") },
    { key: "material", title: i18n.t("material") },
    // { key: "attendance", title: i18n.t("attendance") },
  ]);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const renderScene = SceneMap({
    show: ShowGroupScreen,
    material: Material,
    attendance: Attendance,
  });

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          {...props}
          // onTabPress={onTabPress}
          tabStyle={styles.tabStyle}
          labelStyle={styles.tabLabel}
          indicatorStyle={styles.indicatorStyle}
          getLabelText={({ route }) => route.title}
        />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
// ====================================================================

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: theme.colors.primary,
    marginBottom: hp(0.5),
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  indicatorStyle: {
    height: hp(1),
    backgroundColor: theme.colors.lightgrey,
  },
});

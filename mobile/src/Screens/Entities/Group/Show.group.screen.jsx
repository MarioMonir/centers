import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useGetOneQuery } from "../../../API/api";
import globalStyles from "../../../Theme/global.styles";
import FabGroup from "../../../Components/FabGroup";
import { Card, DataTable } from "react-native-paper";
import i18n from "i18n-js";
import LoadingOrErrorScreen from "../../../Components/LoadingErrorEmpty.screen";
import theme from "../../../Theme/paper.theme";
import { useAppSelector } from "../../../Store/redux.hooks";
import MyText from "../../../Components/MyText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ShowDatesGroupScreen from "./ShowDates.group.tab";

// ====================================================================

function ShowGroupScreen() {
  const userType = useAppSelector((s) => s?.auth?.user?.userType);
  const { params } = useRoute();
  const { id, group } = params;
  const { navigate } = useNavigation();

  console.log({ params });

  // --------------------------------------

  const {
    data: teacher,
    isLoading,
    error,
  } = useGetOneQuery({
    entity: "user",
    id: group?.teacherUserId,
  });

  // --------------------------------------

  const addDateToGroup = () => {};
  const goToEditGroup = () => navigate("EditGroupScreen", { id, group });
  const goToDatesGroup = () => navigate("DatesGroupScreen", { id, group });

  // --------------------------------------

  if (isLoading || error) {
    return <LoadingOrErrorScreen {...{ isLoading, error }} />;
  }

  // --------------------------------------

  const {
    course = "as",
    paymentType,
    location,
    level,
    groupType,
    paymentCost,
    dates = [],
  } = group;

  // --------------------------------------

  const GroupRow = ({ text1, text2 }) => {
    if (!text2) return null;
    return (
      <View style={styles.groupRow}>
        <MyText text={text1} style={styles.text} />
        <MyText text={text2} style={styles.text} />
      </View>
    );
  };

  // --------------------------------------

  const DateRow = ({ from, to, day }) => {
    if (!from || !to || !day) return null;
    return (
      <View style={styles.dateRow}>
        <MyText text={from} style={styles.text2} />
        <MyText text={to} style={styles.text2} />
        <MyText text={day} style={styles.text2} />
      </View>
    );
  };

  // --------------------------------------

  const dataToRender = [
    { text1: i18n.t("groupType"), text2: i18n.t(groupType) },
    { text1: i18n.t("paymentType"), text2: i18n.t(paymentType) },
    { text1: i18n.t("location"), text2: location },
    { text1: i18n.t("level"), text2: level },
    { text1: i18n.t("cost"), text2: paymentCost },
    { text1: i18n.t("Teacher"), text2: teacher?.name },
    ,
  ];

  // --------------------------------------

  return (
    <SafeAreaView style={{ ...globalStyles.screen }}>
      <View style={styles.body}>
        <Card style={styles.card}>
          <Card.Title title={`${id} - ${course}`} />
          <Card.Content>
            {dataToRender?.map((props, key) => (
              <GroupRow key={key} {...props} />
            ))}
          </Card.Content>
        </Card>
      </View>

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      {userType !== "Student" && (
        <FabGroup
          actions={[
            {
              icon: "calendar-clock",
              label: "times",
              onPress: goToDatesGroup,
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
}

// ====================================================================

const renderScene = SceneMap({
  show: ShowGroupScreen,
  dates: ShowDatesGroupScreen,
});

// ====================================================================

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "show", title: i18n.t("name") },
    { key: "dates", title: i18n.t("DatesGroupScreen") },
    // { key: "posts", title: i18n.t("posts") },
  ]);

  // const onTabPress = (props) => {
  //   console.log("hello", props);
  // };

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
  container: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(4),
  },
  key: { fontWeight: "500" },
  row: { flexDirection: "row" },
  card: {
    marginVertical: hp(1),
    width: wp(90),
    alignContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.lightgrey,
    elevation: 4,
  },
  p: {
    marginVertical: 7,
  },
  groupRow: {
    flexDirection: "row",
    paddingVertical: hp(1.5),
    marginVertical: hp(0.5),
    paddingHorizontal: wp(1),
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgrey,
  },
  text: {
    width: wp(40),
    textAlign: "left",
  },
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

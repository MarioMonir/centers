import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useGetOneQuery } from "../../../API/api";
import globalStyles from "../../../Theme/global.styles";
import FabGroup from "../../../Components/FabGroup";
import { Card, DataTable } from "react-native-paper";
import i18n from "i18n-js";
import LoadingOrErrorScreen from "../../../Components/LoadingErrorEmpty.screen";
import theme from "../../../Theme/paper.theme";
import { useAppSelector } from "../../../Store/redux.hooks";

// ====================================================================

export default function ShowGroupScreen() {
  const { params } = useRoute();
  const { id, entity } = params;
  const { navigate } = useNavigation();
  const { data, isLoading, error } = useGetOneQuery({ entity: "group", id });
  const userType = useAppSelector((s) => s?.auth?.user?.userType);

  // --------------------------------------

  const addDateToGroup = () => {};
  const goToEditGroup = () => navigate("EditGroupScreen", { id, data });
  const goToDatesGroup = () => navigate("DatesGroupScreen", { id, data });

  // --------------------------------------

  if (isLoading || error) {
    return <LoadingOrErrorScreen {...{ isLoading, error }} />;
  }

  // --------------------------------------

  const {
    course = "as",
    cost,
    paymentType,
    location,
    public: publicity,
    level,
    groupType,
    dates = [],
  } = data;

  // --------------------------------------

  return (
    <SafeAreaView style={{ ...globalStyles.screen }}>
      <View style={styles.body}>
        <Card style={styles.card}>
          <Card.Title title={`${id} - ${i18n.t(course)}`} />
          <Card.Content>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("groupType")}</DataTable.Cell>
                <DataTable.Cell>{i18n.t(groupType)}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("paymentType")}</DataTable.Cell>
                <DataTable.Cell>{i18n.t(paymentType)}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("location")}</DataTable.Cell>
                <DataTable.Cell>{location}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("level")}</DataTable.Cell>
                <DataTable.Cell>{level}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{i18n.t("cost")}</DataTable.Cell>
                <DataTable.Cell>{cost}</DataTable.Cell>
              </DataTable.Row>
              {/*  */}
            </DataTable>
          </Card.Content>
        </Card>
      </View>
      <ScrollView style={styles.container}></ScrollView>
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
});

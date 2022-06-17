import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRoute } from "@react-navigation/native";
import globalStyles from "../../../Theme/global.styles";
import { Card, Divider } from "react-native-paper";
import theme from "../../../Theme/paper.theme";
import MyText from "../../../Components/MyText";
import NoRecords from "../../../Components/NoRecords.screen";
import i18n from "i18n-js";
// import { useCreateMutation } from "../../../API/api";

// ====================================================================

export default function ShowDatesGroupScreen() {
  const { params } = useRoute();
  const { group } = params;
  const { dates = [] } = group;

  // const [create] = useCreateMutation();
  // const [requestGroup, { data: requestRes, isLoading, error }] = useCreate();

  // --------------------------------------

  const DateRow = ({ from, to, day, requested = i18n.t("request") }) => {
    if (!from || !to || !day) return null;

    const request = () => {
      Alert.alert("Request Group", "your request has been sent to ", [
        // {
        //   text: "Ask me later",
        //   onPress: () => console.log("Ask me later pressed"),
        // },
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        {
          text: i18n.t("yes"),
          onPress: () => {
            // requestGroup({});
          },
        },
        // { text: i18n.t("cancel"), onPress: () => null },
      ]);
    };

    return (
      <View style={styles.dateRow}>
        <MyText text={day} style={styles.text} />
        <MyText text={from} style={styles.text} />
        <MyText text={to} style={styles.text} />
        {/* {!!requested ? (
          <TouchableOpacity style={styles.btn} onPress={request}>
            <MyText text={requested} style={styles.text2} />
          </TouchableOpacity>
        ) : (
          <View style={styles.btn2}></View>
        )} */}
      </View>
    );
  };

  // --------------------------------------

  return (
    <SafeAreaView style={{ ...globalStyles.screen }}>
      {group?.dates?.length ? (
        <Card style={styles.card}>
          <Card.Content>
            <DateRow
              from={i18n.t("from")}
              to={i18n.t("to")}
              day={i18n.t("day")}
              requested=""
            />
            <Divider style={styles.divider} />
            <ScrollView style={styles.container}>
              {dates?.map((props, key) => (
                <DateRow key={key} {...props} />
              ))}
            </ScrollView>
          </Card.Content>
        </Card>
      ) : (
        <NoRecords text="dates" />
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
  card: {
    marginVertical: hp(1),
    width: wp(95),
    alignContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.lightgrey,
    elevation: 4,
  },
  dateRow: {
    width: wp(85),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    paddingHorizontal: wp(1),
  },
  divider: {
    marginTop: hp(3),
    marginBottom: hp(2),
  },
  btn: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 7,
    backgroundColor: theme.colors.primary,
    paddingVertical: hp(1),
    paddingHorizontal: wp(1.5),
    width: wp(23),
  },
  btn2: {
    width: wp(23),
  },
  text2: {
    textAlign: "center",
    color: theme.colors.white,
  },
});

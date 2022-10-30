import React from "react";
import { useRoute } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import MyText from "../../../Components/MyText";
import theme from "../../../Theme/paper.theme";
import i18n from "i18n-js";

// ====================================================================

export default function ShowGroupScreen() {
  // --------------------------------------

  const { params } = useRoute();
  const { group } = params;
  const { dates = [] } = group;

  // --------------------------------------

  return (
    <List.Section title="" style={styles.list}>
      <List.Accordion
        title={i18n.t("DatesGroupScreen")}
        left={(props) => <List.Icon {...props} icon="calendar-clock" />}
      >
        {!dates?.length ? (
          <List.Item title={i18n.t("no") + " " + i18n.t("DatesGroupScreen")} />
        ) : (
          <>
            <List.Item
              title={() => (
                <View style={styles.dateRow}>
                  <MyText text={i18n.t("day")} style={styles.text} />
                  <MyText text={i18n.t("from")} style={styles.text} />
                  <MyText text={i18n.t("to")} style={styles.text} />
                </View>
              )}
            />
            {dates?.length &&
              dates?.map(({ from, to, day }, key) => (
                <List.Item
                  key={key}
                  title={() => (
                    <View style={styles.dateRow}>
                      <MyText text={day} style={styles.text} />
                      <MyText text={from} style={styles.text} />
                      <MyText text={to} style={styles.text} />
                    </View>
                  )}
                />
              ))}
          </>
        )}
      </List.Accordion>
    </List.Section>
  );
}

// ====================================================================

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  list: {
    width: wp(95),
  },
  text: {
    paddingHorizontal: wp(1),
    width: wp(28),
    textAlign: "center",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

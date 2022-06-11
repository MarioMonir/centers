import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRoute } from "@react-navigation/native";
import globalStyles from "../../../Theme/global.styles";
import { Card } from "react-native-paper";
import theme from "../../../Theme/paper.theme";
import MyText from "../../../Components/MyText";

// ====================================================================

export default function ShowDatesGroupScreen() {
  const { params } = useRoute();
  const { group } = params;
  const { dates = [] } = group;

  // --------------------------------------

  const DateRow = ({ from, to, day, requested = "My Group" }) => {
    if (!from || !to || !day) return null;
    return (
      <View style={styles.dateRow}>
        <MyText text={day} style={styles.text} />
        <MyText text={from} style={styles.text} />
        <MyText text={to} style={styles.text} />
        <TouchableOpacity>
          <MyText text={requested} style={styles.text} />
        </TouchableOpacity>
      </View>
    );
  };

  // --------------------------------------

  return (
    <SafeAreaView style={{ ...globalStyles.screen }}>
      {group?.dates?.length && (
        <Card style={styles.card}>
          <Card.Content>
            <DateRow from="from" to="to" day="day" />
            <ScrollView style={styles.container}>
              {dates?.map((props, key) => (
                <DateRow key={key} {...props} />
              ))}
            </ScrollView>
          </Card.Content>
        </Card>
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
    // marginVertical: hp(1),
    // paddingVertical: hp(2),
    // borderBottomWidth: 1,
    // borderBottomColor: theme.colors.lightgrey,
  },
  text: {
    paddingHorizontal: wp(1),
  },
});

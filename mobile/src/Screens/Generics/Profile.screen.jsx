import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../Theme/global.styles";
import MyText from "../../Components/MyText";
import i18n from "i18n-js";
import theme from "../../Theme/paper.theme";
import Button from "../../Components/Form/Button";

// =================================================================

const Row = ({ data, att }) => {
  if (!att) return false;
  return (
    <View style={styles.row}>
      <MyText text={i18n.t(att)} style={styles.text} />
      <MyText text={data[att] ? data[att] : ""} style={styles.text} />
    </View>
  );
};

// =================================================================

export default function ProfileScreen({
  route: {
    params: { item: profile },
  },
}) {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const { navigate } = useNavigation();
  const goToGroups = () => navigate("groups");

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const btnTitle =
    profile?.userType === "Center" ? "centerGroups" : "teacherGroups";

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <SafeAreaView style={{ ...globalStyles, ...styles.container }}>
      <View>
        <Row data={profile} att="name" />
        <Row data={profile} att="email" />
      </View>

      {profile?.userType === "Center" ? <></> : <></>}
      <View>
        <Button icon="bookshelf" text={btnTitle} onPress={goToGroups} />
      </View>
    </SafeAreaView>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: hp(1),
  },
  row: {
    flexDirection: "row",
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: theme.colors.lightgrey,
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
  },
});

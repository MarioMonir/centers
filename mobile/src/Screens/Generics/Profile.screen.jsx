import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../Theme/global.styles";
import MyText from "../../Components/MyText";
import { Avatar } from "react-native-paper";
import Button from "../../Components/Form/Button";

// =================================================================

export default function ProfileScreen({
  route: {
    params: { item: profile },
  },
}) {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const { navigate } = useNavigation();
  const goToGroups = () => navigate("groups", { profile });

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const btnTitle =
    profile?.userType === "Center" ? "centerGroups" : "teacherGroups";

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <SafeAreaView style={{ ...globalStyles, ...styles.container }}>
      <View style={styles.body}>
        <Avatar.Text
          style={styles.icon}
          size={70}
          label={profile.name[0].toUpperCase()}
        />

        <View style={styles.metaData}>
          <MyText text={profile?.name} style={styles.name} />
          <MyText text={profile?.email} style={styles.email} />
        </View>
      </View>

      {profile?.userType !== "Student" ? (
        <View>
          <Button icon="bookshelf" text={btnTitle} onPress={goToGroups} />
        </View>
      ) : null}
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
  body: {
    paddingVertical: hp(2),
    alignItems: "center",
    justifyContent: "center",
  },
  metaData: {
    paddingVertical: hp(2),
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    paddingVertical: hp(2),
    fontWeight: "500",
  },
  email: {
    fontSize: 16,
  },
});

import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../../Theme/global.styles";
import MyText from "../../../Components/MyText";
import { useAppSelector } from "../../../Store/redux.hooks";
import { useNavigation } from "@react-navigation/native";

// ------------------------------------------------------

export default function TeacherHomeScreen() {
  const user = useAppSelector((s) => s?.auth?.user);
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={globalStyles.screen}>
      <MyText text={"Teacher" + JSON.stringify(user, null, 6)} />
    </SafeAreaView>
  );
}

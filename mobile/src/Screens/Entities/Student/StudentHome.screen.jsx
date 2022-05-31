import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../../Theme/global.styles";
import MyText from "../../../Components/MyText";
import { useAppSelector } from "../../../Store/redux.hooks";

// ------------------------------------------------------

export default function StudentHomeScreen() {
  const user = useAppSelector((s) => s?.auth?.user);

  return (
    <SafeAreaView style={globalStyles.screen}>
      <MyText text={"Student" + JSON.stringify(user)} />
    </SafeAreaView>
  );
}

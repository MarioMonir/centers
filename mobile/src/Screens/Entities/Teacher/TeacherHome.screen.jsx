import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../../Theme/global.styles";
import { useAppSelector } from "../../../Store/redux.hooks";
import Fab from "../../../Components/Fab";
import { useNavigation } from "@react-navigation/native";
import { useGetListQuery } from "../../../API/api";
import ListGroupScreen from "../Group/List.group.screen";

// ------------------------------------------------------

export default function TeacherHomeScreen() {
  const user = useAppSelector((s) => s?.auth?.user);
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ListGroupScreen />
    </SafeAreaView>
  );
}

import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../Theme/global.styles";
import MyButton from "../../Components/MyButton";
import MyText from "../../Components/MyText";
import Button from "../../Components/Form/Button";
import { useAppSelector } from "../../Store/redux.hooks";
import { useAuthMe } from "../../Utils/auth.hook";

// ------------------------------------------------------

export default function ProfileScreen() {
  const { navigate } = useNavigation();
  const { logout } = useAuthMe();
  const user = useAppSelector((s) => s?.auth?.user);

  // ------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <MyText text={"profile screen"} />
    </SafeAreaView>
  );
}

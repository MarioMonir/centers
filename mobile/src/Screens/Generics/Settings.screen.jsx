import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../Theme/global.styles";
import MyText from "../../Components/MyText";
import Button from "../../Components/Form/Button";
import { useAppSelector } from "../../Store/redux.hooks";
import { useAuthMe } from "../../Utils/auth.hook";

// ------------------------------------------------------

export default function HomeScreen() {
  const { logout } = useAuthMe();
  const user = useAppSelector((s) => s?.auth?.user);

  // ------------------------------

  return (
    <SafeAreaView style={{ ...globalStyles.screen, justifyContent: "center" }}>
      <Button text="logout" onPress={logout} />
    </SafeAreaView>
  );
}

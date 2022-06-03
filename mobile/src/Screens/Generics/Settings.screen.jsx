import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../Theme/global.styles";
import Button from "../../Components/Form/Button";
import { useAuthMe } from "../../Utils/auth.hook";

// ------------------------------------------------------

export default function HomeScreen() {
  const { logout } = useAuthMe();

  // ------------------------------

  return (
    <SafeAreaView style={{ ...globalStyles.screen, justifyContent: "center" }}>
      <Button text="logout" onPress={logout} />
    </SafeAreaView>
  );
}

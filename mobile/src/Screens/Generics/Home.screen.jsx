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

export default function HomeScreen() {
  const { navigate } = useNavigation();
  const { logout } = useAuthMe();
  const user = useAppSelector((s) => s?.auth?.user);

  // ------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      {entities?.map((entity, idx) => (
        <MyButton key={idx} onPress={() => navigate(entity + "s")}>
          <MyText text={entity} />
        </MyButton>
      ))}
      <MyText text={JSON.stringify(user)} />
      <Button text="logout" mode="outlined" onPress={logout} />
    </SafeAreaView>
  );
}

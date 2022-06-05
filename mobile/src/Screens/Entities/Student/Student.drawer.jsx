import { View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useAuthMe } from "../../../Utils/auth.hook";
import Button from "../../../Components/Form/Button";

// =================================================================

export default function StudentDrawer({
  navigation: { closeDrawer, navigate },
}) {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const { logout } = useAuthMe();

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const btns = [
    {
      name: "search",
      icon: "",
      onPress: () => {
        closeDrawer();
        navigate("exploreGroups");
      },
    },
    { name: "logout", onPress: () => logout() },
  ];

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <View style={styles.container}>
      {btns?.map(({ name, onPress, icon = "" }, key) => (
        <Button
          key={key}
          text={name}
          icon={icon}
          onPress={onPress}
          width={wp(50)}
          maxWidth={wp(50)}
        />
      ))}
    </View>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

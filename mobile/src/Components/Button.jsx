import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Button({
  onPress,
  text = "Submit",
  icon = null,
  mode = "contained",
  width = wp(20),
  ...props
}) {
  return <Button {...{ icon, mode, onPress, ...props }}>{text}</Button>;
}

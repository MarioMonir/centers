import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import i18n from "i18n-js";

// =================================================================

export default function Button({
  text = "Submit",
  onPress = null,
  icon = "check",
  loading = false,
  mode = "contained",
  uppercase = false,
  width = wp(95),
  maxWidth = wp(95),
  disabled = false,
  ...props
}) {
  return (
    <PaperButton
      {...{ icon, mode, onPress, loading, uppercase, disabled, ...props }}
      style={{
        ...styles.container,
        minWidth: width,
        maxWidth,
      }}
      labelStyle={styles.labelStyle}
    >
      {i18n.t(text)}
    </PaperButton>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingVertical: wp(1.5),
    paddingHorizontal: wp(1.5),
    margin: wp(1),
  },
  labelStyle: {
    fontSize: 18,
  },
});

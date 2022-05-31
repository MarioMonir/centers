import { Image, StyleSheet } from "react-native";

// ----------------------------------------------------------------

export default function Logo() {
  return (
    <Image style={styles.logo} source={require("../../assets/logo.png")} />
  );
}

// ----------------------------------------------------------------

const styles = StyleSheet.create({
  logo: {
    marginVertical: 2,
    width: 100,
    height: 80,
  },
});

import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import theme from "../Theme/paper.theme";

// =======================================================

export default function Fab({ onPress, icon = "plus" }) {
  return <FAB style={styles.fab} icon={icon} onPress={onPress} />;
}

// =======================================================

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    backgroundColor: theme.colors.accent,
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import NoRecords from "../../../Components/NoRecords.screen";
import globalStyles from "../../../Theme/global.styles";

// =================================================================

export default function Material() {
  const { params } = useRoute();
  const { group } = params;
  return (
    <SafeAreaView style={{ ...globalStyles.screen }}>
      <NoRecords text="material" />
    </SafeAreaView>
  );
}

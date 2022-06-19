import React from "react";
import { SafeAreaView } from "react-native";
import NoRecords from "../../../Components/NoRecords.screen";
import globalStyles from "../../../Theme/global.styles";

// =================================================================

export default function Atßtendance() {
  // const { params } = useRoute();
  // const { group } = params;
  // const { dates = [] } = group;
  return (
    <SafeAreaView style={{ ...globalStyles.screen }}>
      <NoRecords text="attendance" />
    </SafeAreaView>
  );
}

import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useGetListQuery } from "../../../API/api";
import Card from "../../../Components/Card";
import globalStyles from "../../../Theme/global.styles";
import LoadingOrErrorScreeen from "../../../Components/LoadingOrError.screen";
import { DataTable } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Fab from "../../../Components/Fab";
// ====================================================================

export default function ListUserScreen() {
  const entity = "user";
  const { navigate } = useNavigation();
  const goToCreateEntity = () => navigate("CreateUserScreen");

  // --------------------------------------

  const { data, isFetching, error } = useGetListQuery({ entity });

  // --------------------------------------

  const renderItem = ({ item: row }) => {
    let keys = Object.keys(row); // has to be manually set
    keys.length = 3; // just as example (memory leak)
    return <Card key={row?.id} {...{ entity, keys, row }} />;
  };

  // --------------------------------------

  if (isFetching || error) {
    return <LoadingOrErrorScreeen {...{ error, isFetching }} />;
  }

  // --------------------------------------

  console.log({ data });

  return (
    <SafeAreaView style={globalStyles.screen}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Fab onPress={goToCreateEntity} />
    </SafeAreaView>
  );
}

// --------------------------------------

const styles = StyleSheet.create({});

import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useGetListQuery } from "../../../API/api";
import LoadingOrErrorScreeen from "../../../Components/LoadingOrError.screen";
import CardGroup from "./Card.group";
import Fab from "../../../Components/Fab";

// ====================================================================

export default function ListGroupScreen() {
  const entity = "group";
  const { navigate } = useNavigation();
  const goToCreateEntity = () => navigate("CreateGroupScreen");

  // --------------------------------------

  const { data, isLoading, error } = useGetListQuery({ entity });

  // --------------------------------------

  console.log({ data });

  const renderItem = ({ item: row }) => {
    let keys = Object.keys(row); // has to be manually set
    keys.length = 3; // just as example (memory leak)
    return <CardGroup key={row?.id} {...{ entity, keys, row }} />;
  };

  // --------------------------------------

  if (isLoading || error) {
    return <LoadingOrErrorScreeen {...{ error, isLoading }} />;
  }

  // --------------------------------------

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Fab label="createGroup" onPress={() => navigate("CreateGroupScreen")} />
    </SafeAreaView>
  );
}

// =================================================================
const styles = StyleSheet.create({
  container: {
    marginTop: hp(1),
  },
});

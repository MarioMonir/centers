import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useGetListQuery } from "../../../API/api";
import LoadingErrorEmpty from "../../../Components/LoadingErrorEmpty.screen";
import CardGroup from "./Card.group";
import Fab from "../../../Components/Fab";
import { useAppSelector } from "../../../Store/redux.hooks";
import MyText from "../../../Components/MyText";
// ====================================================================

export default function ListGroupScreen({}) {
  const entity = "group";
  const { navigate } = useNavigation();
  // const goToCreateEntity = () => navigate("CreateGroupScreen");
  const userType = useAppSelector((s) => s?.auth?.user?.userType);

  // --------------------------------------

  const { data, isLoading, error } = useGetListQuery({ entity });

  // --------------------------------------

  const renderItem = ({ item: row }) => {
    let keys = Object.keys(row); // has to be manually set
    keys.length = 3; // just as example (memory leak)
    return <CardGroup key={row?.id} {...{ entity, keys, row }} />;
  };

  // --------------------------------------

  if (isLoading || error || (data && !data.length)) {
    return <LoadingErrorEmpty {...{ error, isLoading, data }} />;
  }

  // --------------------------------------

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {userType !== "Student" && (
        <Fab
          label="createGroup"
          onPress={() => navigate("CreateGroupScreen")}
        />
      )}
    </SafeAreaView>
  );
}

// =================================================================
const styles = StyleSheet.create({
  container: {
    marginTop: hp(1),
    justifyContent: "center",
    alignItems: "center",
  },
});

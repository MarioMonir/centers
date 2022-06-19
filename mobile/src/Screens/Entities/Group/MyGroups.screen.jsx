import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetListQuery } from "../../../API/api";
import LoadingErrorEmpty from "../../../Components/LoadingErrorEmpty.screen";
import CardGroup from "./Card.group";
import Fab from "../../../Components/Fab";
import { useAppSelector } from "../../../Store/redux.hooks";
import { useGetMyGroupsQuery } from "../../../API/api";

// ====================================================================

export default function MyGroupScreen({}) {
  const { navigate } = useNavigation();
  //   const {
  //     params: {
  //       profile: { id, userType: profileUserType },
  //     },
  //   } = useRoute();

  // --------------------------------------

  const { id: studentId } = useAppSelector((s) => s?.auth?.user);

  const { data, isLoading, error } = useGetMyGroupsQuery({ studentId });

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

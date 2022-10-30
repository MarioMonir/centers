import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import globalStyles from "../../../Theme/global.styles";
import i18n from "i18n-js";
import theme from "../../../Theme/paper.theme";
import { useSearchQuery } from "../../../API/api";
import List from "../../../Components/List";
import LoadingOrErrorScreeen from "../../../Components/LoadingErrorEmpty.screen";

// =================================================================

const ExploreList = ({ userType, q }) => {
  const { navigate } = useNavigation();
  const filter = { q, userType };
  const { data, isFetching } = useSearchQuery({ entity: "user", filter });

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  useEffect(() => {}, [data]);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  if (isFetching) return <LoadingOrErrorScreeen {...{ isFetching }} />;

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <View>
      <List
        data={data}
        itemPress={({ item }) =>
          navigate("profile", { title: item.name, item })
        }
        itemTitleField="name"
        icon={userType === "Center" ? "office-building" : "account-tie-outline"}
      />
    </View>
  );
};

// =================================================================

export default function ExploreScreen({ type }) {
  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query.toLowerCase());

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <SafeAreaView style={globalStyles.screen}>
      {type !== "course" ? (
        <View style={styles.filters}>
          <Searchbar
            style={styles.search}
            placeholder={i18n.t("search")}
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
      ) : null}
      <ExploreList {...{ userType: type, q: searchQuery }} />
    </SafeAreaView>
  );
}

// =================================================================

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
  },
  search: {
    marginVertical: hp(1),
    marginHorizontal: wp(1.5),
    borderWidth: 1.5,
    borderColor: theme.colors.lightgrey,
    elevation: 0,
    borderRadius: 5,
    width: wp(95),
  },
});

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
import LoadingOrErrorScreeen from "../../../Components/LoadingOrError.screen";

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
        itemPress={(props) => navigate("profile", { title: props.item.name })}
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
  const onChangeSearch = (query) => setSearchQuery(query);

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <SafeAreaView style={globalStyles.screen}>
      {type !== "course" ? (
        <Searchbar
          style={styles.search}
          placeholder={i18n.t("search")}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      ) : null}
      <ExploreList {...{ userType: type, q: searchQuery }} />
    </SafeAreaView>
  );
}

// =================================================================

const styles = StyleSheet.create({
  search: {
    marginVertical: hp(1.5),
    marginHorizontal: wp(2),
    borderWidth: 1.5,
    borderColor: theme.colors.lightgrey,
  },
});

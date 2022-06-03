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

// =================================================================

export default function ExploreScreen({ type }) {
  const { navigate } = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const { data, isFetching, error } = useSearchQuery({
    entity: "user",
    filter: { q: searchQuery, userType: type },
  });

  // ------------------------------

  useEffect(() => {}, [data]);

  if (data) console.log(data);
  if (isFetching) console.log(isFetching);
  if (error) console.log(error);

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
      <View>
        {data?.map(({ name }, key) => (
          <View key={key}>
            <Text>{name}</Text>
          </View>
        ))}
      </View>
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

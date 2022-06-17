import { useState } from "react";
import { SafeAreaView, View, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import globalStyles from "../../../Theme/global.styles";
import Button from "../../../Components/Form/Button";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import DateTimeRangeInput from "../../../Components/Form/DateTimeRangeInput";

// =================================================================

export default function DatesGroupScreen({}) {
  const { params } = useRoute();
  const { group } = params;
  const [dates, setDates] = useState(group?.dates || []);

  // --------------------------------------------------------

  const addDate = () => setDates([...dates, new Date()]);

  const deleteDate = () => {
    const newDates = dates.slice(0, -1);
    setDates(newDates);
  };

  const saveDates = async () => {
    let newGroup = JSON.parse(JSON.stringify(group));
    newGroup.dates = dates;
  };

  // --------------------------------------------------------

  return (
    <SafeAreaView style={{ ...globalStyles.screen, ...styles.container }}>
      <ScrollView>
        {dates?.map((date, key) => (
          <DateTimeRangeInput
            key={key}
            defaultValue={dates}
            setValue={setDates}
          />
        ))}
      </ScrollView>
      <View>
        <View style={styles.btns}>
          <Button
            text="add"
            mode="outlined"
            icon="plus"
            onPress={addDate}
            width={wp(45)}
            maxWidth={wp(45)}
          />
          <Button
            text="remove"
            mode="outlined"
            icon="delete"
            onPress={deleteDate}
            width={wp(45)}
            maxWidth={wp(45)}
          />
        </View>
        <Button text="save" onPress={saveDates} />
      </View>
    </SafeAreaView>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  btns: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
});

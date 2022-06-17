import { TouchableOpacity, StyleSheet } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Surface,
} from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import i18n from "i18n-js";
import { useNavigation } from "@react-navigation/native";

// =================================================================

export default function CardGroup({
  row: { id, course, level, groupType, cost, courseName },
  row,
}) {
  const { navigate } = useNavigation();

  const goToGroupPage = () =>
    navigate("ShowGroupScreen", { id, entity: "group", group: row });

  // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

  return (
    <TouchableOpacity style={styles.container} onPress={goToGroupPage}>
      <Surface style={styles.surface}>
        <Card>
          <Card.Title title={`${id} - ${courseName}`} subtitle={cost} />
          <Card.Content>
            <Title>{level}</Title>
            <Paragraph>{i18n.t(groupType)}</Paragraph>
          </Card.Content>
        </Card>
      </Surface>
    </TouchableOpacity>
  );
}

// =================================================================

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(1),
    marginHorizontal: wp(2),
    width: wp(85),
  },
  surface: {
    borderRadius: 12,
    elevation: 8,
  },
});

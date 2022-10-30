import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { useCreateMutation, useGetOneQuery } from "../../../API/api";
import FabGroup from "../../../Components/FabGroup";
import Button from "../../../Components/Form/Button";
import LoadingOrErrorScreen from "../../../Components/LoadingErrorEmpty.screen";
import MyText from "../../../Components/MyText";
import GroupDates from "./GroupDates";
import { useGetListQuery } from "../../../API/api";
import { useAppSelector } from "../../../Store/redux.hooks";
import globalStyles from "../../../Theme/global.styles";
import theme from "../../../Theme/paper.theme";
import i18n from "i18n-js";

// ====================================================================

const GroupRow = ({ text1, text2 }) => {
  if (!text2) return null;
  return (
    <View style={styles.groupRow}>
      <MyText text={text1} style={styles.text} />
      <MyText text={text2} style={styles.text} />
    </View>
  );
};

// ====================================================================

export default function ShowGroupScreen() {
  // --------------------------------------

  const { params } = useRoute();
  const { id, group } = params;
  const { navigate } = useNavigation();
  const { id: fromUserId, userType } = useAppSelector((s) => s?.auth?.user);

  // --------------------------------------

  const [request] = useCreateMutation();

  // --------------------------------------

  const {
    data: teacher,
    isLoading,
    error,
  } = useGetOneQuery({
    entity: "user",
    id: group?.teacherUserId,
  });

  // --------------------------------------

  const {
    data: enrolments,
    error: enrolmentsError,
    isFetching: isFetchingEnrolments,
    refetch: refetchEnrolments,
  } = useGetListQuery({
    entity: "enrolment",
    filter: {
      studentId: fromUserId,
    },
  });

  // --------------------------------------

  const {
    data: requests,
    isFetching: isFetchingRequests,
    error: requestsError,
    refetch: refetechRequests,
  } = useGetListQuery({
    entity: "request",
    filter: {
      fromUserId,
    },
  });

  // --------------------------------------

  useEffect(() => {
    refetchEnrolments();
    refetechRequests();
  }, []);

  // --------------------------------------

  const groupRequest = requests?.find(
    (req) => fromUserId === req.fromUserId && req.toGroupId === id
  );

  const groupEnrolment = enrolments?.find(
    ({ groupId, studentId }) => fromUserId === studentId && groupId === id
  );

  const disabledRequest =
    groupRequest?.requestStatus === "Pending" ||
    groupRequest?.requestStatus === "Refused"
      ? true
      : false;

  const requestMessage = groupRequest?.requestStatus
    ? groupRequest?.requestStatus
    : "request";

  // --------------------------------------

  const {
    paymentType,
    location,
    level,
    groupType,
    courseName,
    paymentCost,
    ownerUserId,
  } = group;

  // --------------------------------------

  const requestToJoinGroup = async () => {
    const res = await request({
      entity: "request",
      body: {
        fromUserId,
        toUserId: ownerUserId,
        toGroupId: id,
      },
    }).unwrap();

    if (res?.id) {
      Toast.show({
        type: "success",
        text1: "your request has been successfully sent",
      });
    }

    refetechRequests();
  };

  // --------------------------------------

  if (isLoading || error) {
    return <LoadingOrErrorScreen {...{ isLoading, error }} />;
  }

  // --------------------------------------

  const dataToRender = [
    { text1: i18n.t("groupType"), text2: i18n.t(groupType) },
    { text1: i18n.t("paymentType"), text2: i18n.t(paymentType) },
    { text1: i18n.t("location"), text2: location },
    { text1: i18n.t("level"), text2: level },
    { text1: i18n.t("cost"), text2: paymentCost },
    { text1: i18n.t("Teacher"), text2: teacher?.name },
    { text1: i18n.t("courseName"), text2: courseName },
    ,
  ];

  // --------------------------------------

  let name = `${i18n.t("details")} ${i18n.t("group")}  ${id} - ${courseName}`;

  // --------------------------------------

  // -------------------------------------

  return (
    <SafeAreaView style={{ ...globalStyles.screen }}>
      <ScrollView>
        <List.Section title="" style={styles.list}>
          <List.Accordion
            title={name}
            left={(props) => <List.Icon {...props} icon="calendar-clock" />}
          >
            {dataToRender?.map((props, key) => (
              <GroupRow key={key} {...props} />
            ))}
          </List.Accordion>
        </List.Section>
        <GroupDates />
      </ScrollView>

      {/* ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ */}

      {userType === "Student" ? (
        !groupEnrolment?.id && (
          <Button
            loading={isFetchingRequests || isFetchingEnrolments}
            text={requestMessage}
            disabled={disabledRequest}
            style={styles.btn}
            icon="account-arrow-left"
            onPress={requestToJoinGroup}
          />
        )
      ) : (
        <FabGroup
          actions={[
            {
              icon: "calendar-clock",
              label: "times",
              // onPress: goToDatesGroup,
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
}

// ====================================================================

const styles = StyleSheet.create({
  groupRow: {
    flexDirection: "row",
    paddingVertical: hp(2),
    marginVertical: hp(0.5),
    paddingHorizontal: wp(10),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightgrey,
  },
  text: {
    width: wp(40),
    textAlign: "left",
  },
  btn: {
    alignSelf: "flex-end",
    marginBottom: hp(5),
  },
});

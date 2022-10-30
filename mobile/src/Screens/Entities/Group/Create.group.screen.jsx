import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../../Theme/global.styles.js";
import Form from "../../../Components/Form/Form";
import Input from "../../../Components/Form/Input";
import Select from "../../../Components/Form/Select";
import {
  groupTypes,
  paymentTypes,
  courses,
} from "../../../Config/constants.js";
import { useCreateMutation } from "../../../API/api.js";
import { useAppSelector } from "../../../Store/redux.hooks";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

// ===========================================================

export default function CreateGroupScreen() {
  // -------------------------------------

  const [createGroup] = useCreateMutation();
  const user = useAppSelector((s) => s?.auth?.user);
  const { navigate } = useNavigation();

  // -------------------------------------

  const defaultValues = {
    course: "",
    cost: "",
    location: "",
    groupType: "",
    paymentType: "",
    ownerUserId: user?.id,
    collectorUserId: user?.id,
    teacherId: user?.id,
  };

  // -------------------------------------

  const onSubmit = async (values) => {
    const { data } = await createGroup({
      entity: "group",
      body: { ...values, cost: +values.cost },
    });

    if (data?.id) {
      Toast.show({ type: "success", text1: "Successfully Created" });
      return navigate("Tabs");
    }
  };

  // -------------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Form
        {...{
          // isLoading
          defaultValues,
          onSubmit,
          title: "",
          submitText: "addNewGroup",
          submitIcon: "flask-plus-outline",
        }}
      >
        <Select
          name="course"
          placeholder="chooseGroupSubject"
          choices={courses}
        />
        <Select
          name="groupType"
          placeholder="chooseGroupType"
          choices={groupTypes}
        />
        <Select
          name="paymentType"
          placeholder="choosePaymentType"
          choices={paymentTypes}
        />
        <Input name="level" icon="book-account" />
        <Input name="cost" icon="currency-usd" keyboardType="number-pad" />
        <Input name="location" icon="google-maps" />
      </Form>
    </SafeAreaView>
  );
}

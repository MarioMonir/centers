import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../Theme/global.styles";
import Logo from "../../Components/Logo";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import Select from "../../Components/Form/Select";
import { userTypes } from "../../Config/constants";
import { useRegisterMutation } from "../../API/api";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

// =================================================================

export default function RegisterScreen() {
  // ------------------------------

  const { navigate } = useNavigation();
  const [register] = useRegisterMutation();

  // ------------------------------

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  };

  // ------------------------------

  const onSubmit = async (values) => {
    if (!values?.userType) {
      return Toast.show({ type: "error", text1: "user type are required" });
    }

    if (values.confirmPassword !== values.password) {
      return Toast.show({ type: "error", text1: "passwords do not match" });
    }

    const { data } = await register(values);

    if (data?.user?.id) {
      Toast.show({ type: "success", text1: "Successfully registered" });
      return navigate("login");
    }
  };

  // ------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Logo />
      <Form
        title=""
        {...{
          defaultValues,
          onSubmit,
          cancelButton: false,
          submitText: "register",
          submitIcon: "account-plus",
        }}
      >
        <Input name="name" label="name" icon="account" />
        <Input name="email" label="Email" icon="email" />
        <Input name="password" label="Password" secureTextEntry />
        <Input
          name="confirmPassword"
          label="confirmPassword"
          secureTextEntry
          icon="lock-check"
        />
        <Select
          name="userType"
          placeholder="ChooseUserType"
          choices={userTypes}
        />
      </Form>
    </SafeAreaView>
  );
}

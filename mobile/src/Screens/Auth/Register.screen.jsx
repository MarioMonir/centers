import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import globalStyles from "../../Theme/global.styles";
import Logo from "../../Components/Logo";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import Select from "../../Components/Form/Select";
import { userTypes, levels } from "../../Config/constants";
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
    userType: "Student",
    phone: "",
    parentPhone: "",
  };

  // ------------------------------

  const onSubmit = async (values) => {
    if (!values?.userType) {
      return Toast.show({ type: "error", text1: "user type are required" });
    }

    if (values.confirmPassword !== values.password) {
      return Toast.show({ type: "error", text1: "passwords do not match" });
    }

    const payload = {
      name: values.name,
      email: values.email,
      level: values.level,
      password: values.password,
      userType: values.userType,
      info: {
        phone: values.phone,
        parentPhone: values.parentPhone,
      },
    };

    const { data } = await register(payload);

    if (data?.user?.id) {
      Toast.show({ type: "success", text1: "Successfully registered" });
      return navigate("login");
    }
  };

  // ------------------------------

  const Depend = (props) => {
    const userType = props.getValues()?.userType;
    if (userType !== "Student") return null;
    return <Input name="phone" label="phone" icon="phone" {...props} />;
  };

  // ------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      {/* <Logo /> */}
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
        <Input name="email" label="email" icon="email" />
        <Input name="password" label="password" secureTextEntry />
        <Input
          name="confirmPassword"
          label="confirmPassword"
          secureTextEntry
          icon="lock-check"
        />
        <Input name="phone" label="phone" icon="cellphone" />
        <Input
          name="parentPhone"
          label="parentPhone"
          icon="card-account-phone-outline"
        />
        <Select name="level" placeholder="level" choices={levels} />
        {/* <Select
          name="userType"
          placeholder="ChooseUserType"
          choices={userTypes}
        /> */}
        {/* <Depend /> */}
      </Form>
    </SafeAreaView>
  );
}

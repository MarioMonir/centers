import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Form from "../../Components/Form/Form";
import Input from "../../Components/Form/Input";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLoginMutation } from "../../API/api";
import { useAppDispatch } from "../../Store/redux.hooks";
import { setAuthUser } from "../../Store/Slices/auth.slice";
import Logo from "../../Components/Logo";
import globalStyles from "../../Theme/global.styles";

// =================================================================

export default function LoginScreen() {
  const { navigate } = useNavigation();
  const [login, { data, isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  // -------------------------------------

  const defaultValues = {
    email: "mario1@mario.com",
    password: "123456",
  };

  // -------------------------------------

  const onSubmit = (values) => login(values);

  // -------------------------------------

  useEffect(() => {
    (async () => {
      if (data && data?.user && data?.accessToken) {
        await AsyncStorage.setItem("accessToken", data?.accessToken);
        dispatch(setAuthUser(data));
      }
    })();
  }, [data]);

  // -------------------------------------

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Logo />
      <Form
        {...{
          isLoading,
          error,
          onCancel: () => navigate("register"),
          defaultValues,
          onSubmit,
          cancelButton: true,
          cancelText: "register",
          cancelIcon: "account-plus-outline",
          title: "",
          submitText: "login",
          submitIcon: "login",
        }}
      >
        <Input name="email" label="email" icon="email" />
        <Input name="password" label="password" secureTextEntry />
      </Form>
    </SafeAreaView>
  );
}

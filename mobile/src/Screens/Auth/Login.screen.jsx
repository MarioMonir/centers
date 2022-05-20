import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Input from "../../Components/Input";
import globalStyles from "../../Theme/global.styles";
import Button from "../../Components/Button";

export default function Login() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Input
        name="email"
        label="Email"
        // placeholder="user@example.com"
        control={control}
        errors={errors}
      />
      <Input
        name="password"
        label="Password"
        // placeholder="user@example.com"
        control={control}
        errors={errors}
      />
      <Button onPress={() => {}} />
<<<<<<< HEAD
    </SafeAreaView>
=======
    </SafeAreaView> 
>>>>>>> c52a0f24eab7719730402293952eb1ab4917380c
  );
}

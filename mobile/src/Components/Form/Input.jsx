import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Controller } from "react-hook-form";
import theme from "../../Theme/paper.theme";
import i18n from "i18n-js";

// ========================================================

export default function Input(props) {
  const {
    name,
    control,
    errors,
    numberOfLines = 1,
    required = true,
    inputWidth = 90,
    icon = name === "password" ? "lock" : "account",
    mode = "outlined",
    autoCorrect = false,
    autoCapitalize = "none",
    secureTextEntry = null,
    label,
  } = props;

  // --------------------------------------------

  const [passwordVisible, setPasswordVisible] = useState(true);
  const widthStyle = { width: wp(inputWidth + "%") };
  const styleTextArea =
    numberOfLines > 1
      ? { textAlignVertical: "top" }
      : { textAlignVertical: "center" };

  // --------------------------------------------

  const toggleVisible = () => setPasswordVisible(!passwordVisible);
  // --------------------------------------------

  const requiredBorder = errors ? (errors[name] ? "red" : null) : null;

  // --------------------------------------------

  const render = ({ field: { onChange: onChangeText, onBlur, value } }) => (
    <TextInput
      style={{
        ...styles.input,
        ...styleTextArea,
        borderRaduis: 20,
      }}
      {...{
        mode,
        autoCorrect,
        autoCapitalize,
        onChangeText,
        value,
        onBlur,
        outlineColor: requiredBorder,
        // label: i18n.t(label),
        ...props,
        secureTextEntry: secureTextEntry ? passwordVisible : null,
        label: i18n.t(label || name),
      }}
      // theme={{ roundness: 15 }}
      placeholderTextColor={theme.colors.accent}
      textBreakStrategy={"balanced"}
      left={<TextInput.Icon name={icon} color={theme.colors.grey} />}
      right={
        secureTextEntry ? (
          <TextInput.Icon
            name={passwordVisible ? "eye" : "eye-off"}
            onPress={toggleVisible}
          />
        ) : null
      }
    />
  );

  // --------------------------------------------

  return (
    <View style={{ ...styles.inputContainer, ...widthStyle }}>
      <Controller {...{ name, control, render }} rules={{ required }} />
      {errors && errors[name] ? (
        <HelperText
          type="error"
          visible={errors[name]}
          style={{ textAlign: "right" }}
        >
          {i18n.t("required")}
        </HelperText>
      ) : null}
    </View>
  );
}

// ========================================================

const styles = StyleSheet.create({
  info: {},
  txtIcon: {},
  placeholder: {},
  inputContainer: {
    alignSelf: "center",
    marginVertical: hp("1.2%"),
  },
  input: {
    borderRadius: 15,
  },
  error: {},
  requiredBorder: {
    backgroundColor: "green",
    borderColor: "red",
  },
});
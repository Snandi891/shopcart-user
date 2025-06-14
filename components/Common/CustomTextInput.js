import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";

const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  icon,
  type,
  keyboardType,
}) => {
  return (
    <View
      style={{
        width: "85%",
        height: 50,
        borderWidth: 0.8,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Image source={icon} style={{ width: 24, height: 24 }} />
      <TextInput
        value={value}
        keyboardType={keyboardType ? keyboardType : "default"}
        onChangeText={(txt) => {
          onChangeText(txt);
        }}
        style={{ paddingLeft: 20 }}
        placeholder={placeholder}
        secureTextEntry={type ? true : false}
      />
    </View>
  );
};

export default CustomTextInput;

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AnimatedTost from "../animated/AnimatedTost";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const New = () => {
  const [visible, setVisible] = useState(false);
  const showTost = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          showTost();
        }}
        style={{
          width: "90%",
          height: 50,
          borderRadius: 8,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>show me</Text>
      </TouchableOpacity>
      <AnimatedTost
        visible={visible}
        type={"SUCSESS"}
        message={"Order Placed"}
      />
    </View>
  );
};

export default New;

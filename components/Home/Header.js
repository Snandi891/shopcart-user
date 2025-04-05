import { View, Text, TextInput, Image } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

export default function Header() {
  return (
    <View
      style={{
        padding: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Entypo name="menu" size={34} color="black" style={{}} />
        </View>
        <View style={{}}>
          <Image
            source={require("../../Images/home.png")}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "600", paddingLeft: 4 }}>
          Discover
        </Text>
      </View>
    </View>
  );
}

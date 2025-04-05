import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const data = useSelector((state) => state);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: "Home",
          tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: "Home",
          tabBarIcon: () => (
            <AntDesign name="profile" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: () => (
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="pluscircle" size={24} color="black" />
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "red",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: 1,
                  right: 1,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  {data.Reducers.length}
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: () => (
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="pluscircle" size={24} color="black" />
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "red",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: 1,
                  right: 1,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  {data.Reducers2.length}
                </Text>
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: "Home",
          tabBarIcon: () => <Ionicons name="cart" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}

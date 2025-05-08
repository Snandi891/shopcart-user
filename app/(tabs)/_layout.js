import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector } from "react-redux";
import Entypo from "@expo/vector-icons/Entypo";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import TabBar from "../../components/Bar/TabBar";

export default function TabLayout() {
  const data = useSelector((state) => state);

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: false }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                width: 44,
                height: 34,
                borderRadius: 22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="home"
                size={focused ? 35 : size}
                color={focused ? "#950dd9" : "#fff"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                width: 44,
                height: 34,
                borderRadius: 22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="person"
                size={focused ? 35 : size}
                color={focused ? "#950dd9" : "#fff"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                width: 44,
                height: 34,
                borderRadius: 22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign
                name="pluscircle"
                size={focused ? 35 : size}
                color={focused ? "#950dd9" : "#fff"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                width: 44,
                height: 34,
                borderRadius: 22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo
                name="shopping-cart"
                size={focused ? 35 : size}
                color={focused ? "#950dd9" : "#fff"}
              />
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "red",
                  borderRadius: moderateScale(10),
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
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                width: 44,
                height: 34,
                borderRadius: 22,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign
                name="heart"
                size={focused ? 35 : size}
                color={focused ? "#950dd9" : "#fff"}
              />
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "red",
                  borderRadius: moderateScale(10),
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
    </Tabs>
  );
}

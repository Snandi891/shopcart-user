import { View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import CategoryList from "../../components/Home/CategoryList";
import Busness from "../../components/Home/Busness";
import { LinearGradient } from "expo-linear-gradient";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Traveler from "../../components/Home/Traveler";

export default function home() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{}}>
      <View
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          alignContent: "center",
          alignSelf: "center",
        }}
      >
        <LinearGradient
          colors={["rgba(194, 174, 241, 0.4)", "transparent"]}
          style={{
            flex: 1,
            elevation: 30,
          }}
          className="rounded-full"
        >
          <Header />

          <View style={{}}>
            <Slider />
            <CategoryList />
            <View
              style={{
                marginLeft: moderateScale(13),
                paddingBottom: moderateScale(7),
              }}
            >
              <Busness />
            </View>
            <View
              style={{
                marginLeft: moderateScale(13),
                // paddingBottom: moderateScale(7),
              }}
            >
              <Traveler />
            </View>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

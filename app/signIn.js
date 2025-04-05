// onPress={() => router.push("/home")}

import { View, Text, ImageBackground, Dimensions } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import ElevatedView from "react-native-elevated-view";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const { height } = Dimensions.get("window");
const signIn = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <View>
        <ImageBackground
          resizeMode="cover"
          source={require("../Images/home.png")}
          style={{ height: height }}
        >
          <View style={{ height: height }}>
            <View style={{ paddingHorizontal: 20, paddingTop: 40 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#111",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                Enjoy the trip with
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  color: "#760eb3",
                  textAlign: "left",
                  fontWeight: "800",
                  marginTop: 10,
                }}
              >
                Good Moments
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: "#360c4f",
                  textAlign: "left",
                  fontWeight: "600",
                }}
              >
                So Let's start your jurney ,chosse destination - then Choose
                Traveler and Go for trip
              </Text>
            </View>
            <View
              style={{
                aspectRatio: 1,
                height: 400,
                margin: 10,
                // paddingLeft: 20,
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <LottieView
                style={{
                  flex: 1,
                }}
                source={require("../animation/Animation - 1743839196977.json")}
                autoPlay
                loop
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 80,
                bottom: 40,
                position: "absolute",
                left: 0,
                right: 0,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("/home")}
                style={{ paddingTop: moderateScale(75) }}
              >
                <ElevatedView
                  style={{
                    width: scale(100),
                    borderRadius: 60,
                    height: verticalScale(50),
                    margin: 10,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "blue",
                    shadowOffset: {
                      width: 0,
                      height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,
                    elevation: 24,
                  }}
                >
                  <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                    Enter
                  </Text>
                </ElevatedView>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default signIn;

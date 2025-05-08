// onPress={() => router.push("/home")}

import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import ElevatedView from "react-native-elevated-view";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";

const AnimatedBn = Animatable.createAnimatableComponent(TouchableOpacity);

const { height } = Dimensions.get("window");
const SignIn = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <View>
        <ImageBackground
          source={require("../Images/home.png")}
          style={{ height: height, resizeMode: "cover" }}
        >
          <View style={{ height: height }}>
            <View style={{ paddingHorizontal: 20, paddingTop: 40 }}>
              <Animatable.Text
                style={{
                  fontSize: moderateScale(20),
                  color: "#fff",
                  textAlign: "left",
                  fontWeight: "800",
                }}
                animation={"fadeInUp"}
                delay={0}
              >
                Enjoy the trip with
              </Animatable.Text>
              <Animatable.Text
                style={{
                  fontSize: 30,
                  color: "#760eb3",
                  textAlign: "left",
                  fontWeight: "800",
                  marginTop: moderateScale(7),
                }}
                animation={"fadeInUp"}
                delay={300}
              >
                Good Moments
              </Animatable.Text>
              <Animatable.Text
                style={{
                  fontSize: 18,
                  color: "#e7d5f5",
                  textAlign: "left",
                  fontWeight: "600",
                }}
                animation={"fadeInUp"}
                delay={600}
              >
                So Let's start your journey, choose destination - then choose
                Traveler and go for trip.
              </Animatable.Text>
            </View>
            <View
              style={{
                aspectRatio: 1,
                height: 400,
                margin: moderateScale(10),
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
              <AnimatedBn
                onPress={() => router.push("/splash")}
                style={{ paddingTop: moderateScale(75) }}
                animation="fadeInUp"
                delay={200}
              >
                <ElevatedView
                  style={{
                    width: scale(100),
                    borderRadius: 60,
                    height: verticalScale(50),
                    margin: moderateScale(10),
                    backgroundColor: "#7b26bd",
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
                  <Text
                    style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}
                  >
                    Enter
                  </Text>
                </ElevatedView>
              </AnimatedBn>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default SignIn;

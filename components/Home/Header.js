import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CircularProgress from "react-native-circular-progress-indicator";
import * as Animatable from "react-native-animatable";
import Voice from "./Voice";
import Weather from "./Weather";

const AnimatedBn = Animatable.createAnimatableComponent(TouchableOpacity);
export default function Header() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 40); // control speed (e.g., 40ms per step)

    return () => clearInterval(interval); // clean up when unmounting
  }, []);

  const router = useRouter();

  return (
    <View
      style={{
        padding: moderateScale(5),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/contect-list/contect-page")}
        >
          <Entypo name="menu" size={44} color="black" style={{}} />
        </TouchableOpacity>

        <View style={{ paddingRight: moderateScale(2) }}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              width: scale(40),
              height: verticalScale(35),
              borderRadius: moderateScale(10),
            }}
          />
        </View>
      </View>

      <View>
        <Animatable.View animation={"fadeInDown"} delay={0}>
          <Voice />
        </Animatable.View>
        <View style={{ flexDirection: "row" }}>
          <AnimatedBn
            animation={"fadeInDown"}
            onPress={() => router.push("/ai-list/ai-page")}
            style={{
              width: "70%",
              height: verticalScale(40),
              borderRadius: 20,
              // margin: moderateScale(5),
              backgroundColor: "#64e4f5",
              alignItems: "center",
              flexDirection: "row",
              marginLeft: 5,
            }}
          >
            {/* CircularProgress with Image inside */}
            <View
              style={{
                width: 80,
                height: 80,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress
                value={progress}
                radius={40}
                progressValueColor={"transparent"}
                activeStrokeColor={"#2465FD"}
                activeStrokeSecondaryColor={"#C25AFF"}
                inActiveStrokeColor={"#9b59b6"}
                inActiveStrokeOpacity={0.5}
                inActiveStrokeWidth={35.5}
                activeStrokeWidth={24.5}
                duration={40}
                maxValue={100}
              />
              <Image
                source={require("../../Images/aibot.png")}
                style={{
                  width: scale(40),
                  height: verticalScale(40),
                  borderRadius: moderateScale(50),
                  position: "absolute",
                }}
              />
            </View>

            {/* Text beside progress */}
            <View
              style={{ marginLeft: moderateScale(10), flexDirection: "row" }}
            >
              <Text
                style={{
                  fontSize: moderateScale(20),
                  fontWeight: "600",
                  textShadowColor: "white",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 1,
                }}
              >
                Travel Bot
              </Text>
            </View>
          </AnimatedBn>
          <AnimatedBn animation={"fadeInDown"} style={{ marginLeft: 10 }}>
            <Weather />
          </AnimatedBn>
        </View>
      </View>
    </View>
  );
}

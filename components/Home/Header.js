import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CircularProgress from "react-native-circular-progress-indicator";
import * as Animatable from "react-native-animatable";

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
          <Entypo name="menu" size={34} color="black" style={{}} />
        </TouchableOpacity>
        <View style={{ paddingRight: moderateScale(2) }}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              width: scale(40),
              height: verticalScale(40),
              borderRadius: moderateScale(50),
            }}
          />
        </View>
      </View>
      <View>
        <Animatable.View
          animation={"slideInLeft"}
          delay={0}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Text
            style={{
              fontSize: moderateScale(20),
              fontWeight: "600",
              paddingLeft: moderateScale(4),
            }}
          >
            Hello Sir
          </Text>
          <Image
            source={require("../../Images/map.png")}
            style={{ width: scale(40), height: verticalScale(40) }}
          />
        </Animatable.View>
        <Animatable.View
          animation={"slideInUp"}
          style={{
            width: "80%",
            height: verticalScale(40),
            borderRadius: 20,
            margin: moderateScale(5),
            backgroundColor: "#64e4f5",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: 10,
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
            duration={40} // should match the interval time
            maxValue={100}
          />
          <View style={{ marginLeft: moderateScale(10) }}>
            <Text style={{ fontSize: moderateScale(20), fontWeight: "600" }}>
              TravelPoll
            </Text>
          </View>
        </Animatable.View>
      </View>
    </View>
  );
}

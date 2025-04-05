import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedTost = ({ type, message, visible }) => {
  const YValue = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      YValue.value = withTiming(-150, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      setTimeout(() => {
        YValue.value = withTiming(150, {
          duration: 300,
          easing: Easing.in(Easing.ease),
        });
      }, 3000);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: YValue.value }],
    };
  });

  return (
    <Animated.View style={[styles.animatedTost, animatedStyle]}>
      <View
        style={[
          {
            backgroundColor: type == "SUCSESS" ? "#8fed85" : "#2f98f5",
          },
          styles.animatedTost2,
        ]}
      ></View>
      <View
        style={[
          styles.animatedCercle,
          {
            backgroundColor: type == "SUCSESS" ? "#8fed85" : "#2f98f5",
          },
        ]}
      >
        <Image
          source={
            type == "SUCSESS" ? require("../Images/check-mark.png") : "#2f98f5"
          }
          style={{ width: 24, height: 24 }}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "800",
          color: "#000",
          marginLeft: 10,
        }}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

export default AnimatedTost;

const styles = StyleSheet.create({
  animatedTost: {
    width: Dimensions.get("window").width - 175,
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 17,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { x: 5, y: 0 },
    position: "absolute",
    bottom: -60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    overflow: "hidden",
  },
  animatedTost2: {
    width: 10,
    height: "100%",
  },
  animatedCercle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

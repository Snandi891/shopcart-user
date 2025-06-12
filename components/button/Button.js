import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const BUTTON_WIDTH = width * 0.6;
const SWIPE_THRESHOLD = BUTTON_WIDTH - 70;

export default function Button() {
  const router = useRouter();

  const translateX = useSharedValue(0);
  const isSwiped = useSharedValue(false);

  const rippleScales = [
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
  ];
  const rippleOpacities = [
    useSharedValue(0.7),
    useSharedValue(0.7),
    useSharedValue(0.7),
  ];

  useEffect(() => {
    rippleScales.forEach((scale, i) => {
      scale.value = withDelay(
        i * 400,
        withRepeat(withTiming(2, { duration: 1500 }), -1)
      );
    });
    rippleOpacities.forEach((opacity, i) => {
      opacity.value = withDelay(
        i * 400,
        withRepeat(withTiming(0, { duration: 1500 }), -1)
      );
    });
  }, []);

  const onSwipeSuccess = () => {
    // Replace alert with navigation or any logic
    alert("Swipe Success!");
  };

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      if (!isSwiped.value) {
        translateX.value = Math.min(
          Math.max(0, event.translationX),
          SWIPE_THRESHOLD
        );
      }
    },
    onEnd: () => {
      if (translateX.value > SWIPE_THRESHOLD - 20) {
        translateX.value = withSpring(SWIPE_THRESHOLD);
        isSwiped.value = true;
        runOnJS(onSwipeSuccess)();
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: 1 - translateX.value / SWIPE_THRESHOLD,
  }));

  const getRippleStyle = (index) =>
    useAnimatedStyle(() => ({
      transform: [{ scale: rippleScales[index].value }],
      opacity: rippleOpacities[index].value,
    }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["blue", "purple", "red", "white"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        >
          <BlurView intensity={80} tint="dark" style={styles.frostedInner}>
            <Animated.Text style={[styles.swipeText, textStyle]}>
              See more
            </Animated.Text>

            <PanGestureHandler onGestureEvent={gestureHandler}>
              <Animated.View style={[styles.thumbContainer, thumbStyle]}>
                {rippleScales.map((_, i) => (
                  <Animated.View
                    key={i}
                    style={[styles.ripple, getRippleStyle(i)]}
                  />
                ))}
                <View>
                  <Image
                    source={require("../../Images/detail.png")}
                    style={styles.thumb}
                  />
                </View>
              </Animated.View>
            </PanGestureHandler>
          </BlurView>
        </LinearGradient>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "white",
  },
  gradientBorder: {
    width: BUTTON_WIDTH,
    height: 65,
    borderRadius: 40,
    padding: 3,
    backgroundColor: "transparent",
    shadowColor: "#fff", // white glowing border
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 5,
  },
  frostedInner: {
    flex: 1,
    borderRadius: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  swipeText: {
    position: "absolute",
    alignSelf: "center",
    fontSize: 20,
    color: "#eee",
    fontWeight: "bold",
  },
  thumbContainer: {
    width: 50,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  ripple: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#a855f7",
    zIndex: 0,
  },
  thumb: {
    width: 50,
    height: 50,

    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    shadowColor: "#fff", // white glowing thumb
    shadowOpacity: 0.8,
    elevation: 10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  arrow: {
    fontSize: 24,
    color: "#fff",
  },
});

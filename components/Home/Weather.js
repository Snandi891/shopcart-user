import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

const Weather = () => {
  const router = useRouter();
  let buttonRef = null;

  const handlePress = () => {
    if (buttonRef) buttonRef.bounce(500);
    setTimeout(() => {
      router.push("/weather-details/weather-page");
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Animatable.View ref={(ref) => (buttonRef = ref)}>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
          <LinearGradient
            colors={["#00f0ff", "#8f00ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Weather</Text>
          </LinearGradient>
          <Image
            style={{
              height: 60,
              width: 60,
              //   top: -10,
              alignSelf: "center",
              position: "absolute",
              top: -35,
            }}
            source={require("../../Images/cloud.png")}
          />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // transparent background
    // padding: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 17,
    borderRadius: 30,
    // top: -50,
  },
  buttonText: {
    color: "#fff", // or white "#fff" depending on your preference
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    bottom: -6,
    // bottom: -,
  },
});

export default Weather;

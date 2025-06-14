import { View, Image } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ScreenCapture from "expo-screen-capture";

const Splash = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      getData();
    }, 3000);

    return () => clearTimeout(timeout); // cleanup timeout
  }, []);

  // 👇 Block screenshots on mount, allow on unmount
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  const getData = async () => {
    const email = await AsyncStorage.getItem("EMAIL");
    if (email !== null) {
      router.replace("/home"); // 👈 route to /home
    } else {
      router.replace("/login"); // 👈 route to /login
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../Images/gpt1.png")}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
      />
    </View>
  );
};

export default Splash;

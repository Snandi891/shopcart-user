import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router"; // 👈 import router
import Loader from "../components/Common/Loader";
import CommonButton from "../components/Common/CommonButton";
import CustomTextInput from "../components/Common/CustomTextInput";
import * as ScreenCapture from "expo-screen-capture";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // 👇 Block screenshots on mount, allow on unmount
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  const handleLogin = () => {
    setModalVisible(true);
    if (email === "") {
      setModalVisible(false);
      setBadEmail(true);
      return;
    }
    setBadEmail(false);

    if (password === "") {
      setModalVisible(false);
      setBadPassword(true);
      return;
    }
    setBadPassword(false);

    setTimeout(() => {
      getData();
    }, 2000);
  };

  const getData = async () => {
    const mEmail = await AsyncStorage.getItem("EMAIL");
    const mPass = await AsyncStorage.getItem("PASSWORD");

    if (email === mEmail && password === mPass) {
      setModalVisible(false);
      router.replace("/home"); // 👈 navigate to Home
    } else {
      setModalVisible(false);
      alert("Incorrect email or password.");
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Image
        source={require("../Images/gpt1.png")}
        style={{
          width: 60,
          height: 60,
          alignSelf: "center",
          marginTop: 100,
          borderRadius: 10,
        }}
      />
      <Text
        style={{
          marginTop: 50,
          alignSelf: "center",
          fontSize: 24,
          fontWeight: "600",
          color: "#000",
        }}
      >
        Login
      </Text>

      <CustomTextInput
        placeholder="Enter email id"
        icon={require("../Images/gmail.png")}
        value={email}
        onChangeText={setEmail}
      />
      {badEmail && (
        <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
          Please enter email
        </Text>
      )}

      <CustomTextInput
        type="password"
        placeholder="Enter password"
        icon={require("../Images/lock.png")}
        value={password}
        onChangeText={setPassword}
      />
      {badPassword && (
        <Text style={{ marginTop: 10, alignSelf: "center", color: "red" }}>
          Please enter password
        </Text>
      )}

      <CommonButton
        title="Login"
        bgColor="#000"
        textColor="#fff"
        onPress={handleLogin}
      />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 20,
          alignSelf: "center",
          textDecorationLine: "underline",
          color: "#000",
        }}
        onPress={() => {
          router.push("/signup"); // 👈 navigate to Signup page
        }}
      >
        Create New Account
      </Text>

      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default login;

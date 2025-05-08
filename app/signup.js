import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import CustomTextInput from "../components/Common/CustomTextInput";
import CommonButton from "../components/Common/CommonButton";

const Signup = () => {
  const [profileImage, setProfileImage] = useState(null);

  const [name, setName] = useState("");
  const [badName, setBadName] = useState(false);

  const [mobile, setMobile] = useState("");
  const [badMobile, setBadMobile] = useState(false);

  const [email, setEmail] = useState("");
  const [badEmail, setBadEmail] = useState(false);

  const [address, setAddress] = useState("");
  const [badAddress, setBadAddress] = useState(false);

  const [password, setPassword] = useState("");
  const [badPassword, setBadPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [badConfirmPassword, setBadConfirmPassword] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSignup = () => {
    setButtonDisabled(true);
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    const emailLower = email.toLowerCase();
    setEmail(emailLower);

    if (!profileImage) {
      Alert.alert("Profile Photo", "Please upload a profile photo.");
      setButtonDisabled(false);
      return;
    }

    if (name.trim() === "") {
      setBadName(true);
      setButtonDisabled(false);
      return;
    }
    setBadName(false);

    if (emailLower.trim() === "" || !emailRegex.test(emailLower)) {
      setBadEmail(true);
      setButtonDisabled(false);
      return;
    }
    setBadEmail(false);

    if (mobile.trim() === "" || mobile.length < 10) {
      setBadMobile(true);
      setButtonDisabled(false);
      return;
    }
    setBadMobile(false);

    if (address.trim() === "") {
      setBadAddress(true);
      setButtonDisabled(false);
      return;
    }
    setBadAddress(false);

    if (password.trim() === "") {
      setBadPassword(true);
      setButtonDisabled(false);
      return;
    }
    setBadPassword(false);

    if (confirmPassword.trim() === "" || password !== confirmPassword) {
      setBadConfirmPassword(true);
      setButtonDisabled(false);
      return;
    }
    setBadConfirmPassword(false);

    saveData();
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("PROFILE_IMAGE", profileImage || "");
      await AsyncStorage.setItem("NAME", name);
      await AsyncStorage.setItem("EMAIL", email);
      await AsyncStorage.setItem("MOBILE", mobile);
      await AsyncStorage.setItem("ADDRESS", address);
      await AsyncStorage.setItem("PASSWORD", password);

      console.log("✅ Data saved to AsyncStorage");
      router.back();
    } catch (error) {
      console.log("❌ Error saving data", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
            marginTop: 30,
            alignSelf: "center",
            fontSize: 24,
            fontWeight: "600",
            color: "#000",
          }}
        >
          Create New Account
        </Text>

        {/* Profile Image Picker styled like input */}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            // flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            padding: 12,
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../Images/camera.png")
            }
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 10,

              marginRight: 10,
            }}
          />
          <Text style={{ color: "#555", fontSize: 16 }}>
            {profileImage ? "Change Profile Photo" : "Upload Profile Photo"}
          </Text>
        </TouchableOpacity>

        <CustomTextInput
          placeholder="Enter your name"
          icon={require("../Images/tag.png")}
          value={name}
          onChangeText={setName}
        />
        {badName && <Text style={errorText}>Please enter your name</Text>}

        <CustomTextInput
          placeholder="Enter phone number"
          icon={require("../Images/tag.png")}
          value={mobile}
          keyboardType="number-pad"
          onChangeText={setMobile}
        />
        {badMobile && (
          <Text style={errorText}>Please enter a valid mobile number</Text>
        )}

        <CustomTextInput
          placeholder="Enter email id"
          icon={require("../Images/tag.png")}
          value={email}
          onChangeText={setEmail}
        />
        {badEmail && <Text style={errorText}>Please enter a valid email</Text>}

        <CustomTextInput
          placeholder="Enter your address"
          icon={require("../Images/tag.png")}
          value={address}
          onChangeText={setAddress}
        />
        {badAddress && <Text style={errorText}>Please enter your address</Text>}

        <CustomTextInput
          placeholder="Enter password"
          icon={require("../Images/tag.png")}
          value={password}
          onChangeText={setPassword}
        />
        {badPassword && <Text style={errorText}>Please enter a password</Text>}

        <CustomTextInput
          placeholder="Enter confirm password"
          icon={require("../Images/tag.png")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {badConfirmPassword && (
          <Text style={errorText}>Passwords do not match</Text>
        )}

        <CommonButton
          title="Signup"
          bgColor={buttonDisabled ? "#8e8e8e" : "#000"}
          textColor="#fff"
          onPress={handleSignup}
          disabled={buttonDisabled}
        />

        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginTop: 20,
            alignSelf: "center",
            textDecorationLine: "underline",
            marginBottom: 70,
            color: "#000",
          }}
          onPress={() => {
            router.back();
          }}
        >
          Already have an account
        </Text>
      </View>
    </ScrollView>
  );
};

const errorText = {
  marginTop: 10,
  alignSelf: "center",
  color: "red",
};

export default Signup;

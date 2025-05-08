import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import AnimatedTost from "../../animated/AnimatedTost";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    profileImage: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(userData);
  const [visible, setVisible] = useState(false);
  const showTost = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const name = await AsyncStorage.getItem("NAME");
        const email = await AsyncStorage.getItem("EMAIL");
        const mobile = await AsyncStorage.getItem("MOBILE");
        const address = await AsyncStorage.getItem("ADDRESS");
        const profileImage = await AsyncStorage.getItem("PROFILE_IMAGE");

        const data = {
          name: name || "",
          email: email || "",
          mobile: mobile || "",
          address: address || "",
          profileImage: profileImage || "",
        };

        setUserData(data);
        setForm(data);
      } catch (error) {
        console.log("❌ Error reading data", error);
      }
    };

    getData();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("NAME", form.name);
      await AsyncStorage.setItem("EMAIL", form.email);
      await AsyncStorage.setItem("MOBILE", form.mobile);
      await AsyncStorage.setItem("ADDRESS", form.address);
      await AsyncStorage.setItem("PROFILE_IMAGE", form.profileImage);

      setUserData(form);
      setEditMode(false);
      console.log("✅ Profile updated");
    } catch (error) {
      console.log("❌ Error saving data", error);
    }
  };

  const handleProfileImageChange = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need permission to access your photo library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setForm((prev) => ({ ...prev, profileImage: selectedImageUri }));
    }
  };

  const renderProfileField = (labelText, fieldKey) => (
    <View style={{ marginBottom: 10 }}>
      <Text style={label}>{labelText}:</Text>
      {editMode ? (
        <TextInput
          style={input}
          value={form[fieldKey]}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, [fieldKey]: text }))
          }
        />
      ) : (
        <Text style={value}>{userData[fieldKey]}</Text>
      )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Profile
        </Text>

        {form.profileImage ? (
          <Image
            source={{ uri: form.profileImage }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 10,
              borderWidth: 2,
              borderColor: "#ccc",
            }}
          />
        ) : (
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#ccc",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text>No Photo</Text>
          </View>
        )}

        {editMode && (
          <TouchableOpacity onPress={handleProfileImageChange}>
            <Text
              style={{
                color: "#007bff",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Change Profile Photo
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {renderProfileField("Name", "name")}
      {renderProfileField("Email", "email")}
      {renderProfileField("Mobile", "mobile")}
      {renderProfileField("Address", "address")}

      <View style={{ marginTop: 20 }}>
        {editMode ? (
          // <Button title="Save Changes" onPress={handleSave}   />
          <Button
            title="Save Changes"
            onPress={() => {
              showTost();
              handleSave();
            }}
          />
        ) : (
          <TouchableOpacity onPress={() => setEditMode(true)}>
            <View
              style={{
                backgroundColor: "#007bff",
                padding: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <AnimatedTost
        visible={visible}
        type={"SUCSESS"}
        message={"changes saved"}
      />
    </ScrollView>
  );
};

const label = {
  fontSize: 16,
  fontWeight: "600",
  color: "#333",
};

const value = {
  fontSize: 16,
  color: "#555",
};

const input = {
  borderWidth: 1,
  borderColor: "#ccc",
  padding: 10,
  borderRadius: 5,
  fontSize: 16,
};

export default Profile;

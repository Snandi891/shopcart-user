import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Sample = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const name = await AsyncStorage.getItem("NAME");
        const email = await AsyncStorage.getItem("EMAIL");
        const mobile = await AsyncStorage.getItem("MOBILE");
        const address = await AsyncStorage.getItem("ADDRESS");

        setUserData({
          name: name || "",
          email: email || "",
          mobile: mobile || "",
          address: address || "",
        });

        console.log("📦 Retrieved data:", { name, email, mobile });
      } catch (error) {
        console.log("❌ Error reading data", error);
      }
    };

    getData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Stored User Data:
      </Text>
      <Text>Name: {userData.name}</Text>
      <Text>Email: {userData.email}</Text>
      <Text>Mobile: {userData.mobile}</Text>

      <Text>address: {userData.address}</Text>
    </ScrollView>
  );
};

export default Sample;

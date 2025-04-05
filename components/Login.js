import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

const Login = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 3000);
  }, []);

  //   const getData = async () => {
  //     const email = await AsyncStorage.getItem("EMAIL");
  //     if (email !== null) {
  //       navigation.navigate("home");
  //     } else {
  //       navigation.navigate("Login");
  //     }
  //   };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("./../../Images/images.png")}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default Login;

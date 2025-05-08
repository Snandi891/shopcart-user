// ContactScreen.js
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";

const ContactScreen = () => {
  const handleEmail = () => {
    Linking.openURL("mailto:nsouvik555@gmail.com");
  };

  const handleCall = () => {
    Linking.openURL("tel:+8918960117");
  };

  const handleSMS = () => {
    Linking.openURL("sms:+8918960117");
  };

  return (
    <ImageBackground
      source={require("../../Images/contect.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>
          Sir, if you face any issues while using this app, feel free to reach
          out — we're here to help you anytime!
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleEmail}>
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCall}>
          <Text style={styles.buttonText}>Call Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSMS}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.3)", // optional overlay
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ffffff88",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "80%",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#eee",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});

export default ContactScreen;

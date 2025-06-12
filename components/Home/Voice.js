import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

export default function Voice() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const subtitle = "Welcome sir, have a great day ";
  const title = "Travelpoll";
  const subtitleWords = subtitle.split(" ");
  const titleWords = title.split(" ");
  const allWords = [...subtitleWords, ...titleWords];

  const fadeAnims = useRef(allWords.map(() => new Animated.Value(0))).current;
  const widthAnim = useRef(new Animated.Value(160)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const borderPulseAnim = useRef(new Animated.Value(0)).current;

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./../../audio/voice.mp3"),
      {
        shouldPlay: true,
        isLooping: false,
        staysActiveInBackground: true,
      }
    );
    setSound(sound);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        fadeOutAndReset();
      }
    });
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const animateWords = () => {
    allWords.forEach((_, index) => {
      setTimeout(() => {
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, index * 350);
    });
  };

  const animateButtonWidth = (toValue, callback) => {
    Animated.timing(widthAnim, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start(callback);
  };

  const startGlow = () => {
    glowAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const startBorderPulse = () => {
    borderPulseAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderPulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(borderPulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const fadeOutAndReset = () => {
    Animated.stagger(
      100,
      fadeAnims.map((anim) =>
        Animated.timing(anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      )
    ).start(() => {
      resetScreen();
    });
  };

  const handleToggle = async () => {
    if (isPlaying) {
      await stopSound();
      animateButtonWidth(160);
      fadeOutAndReset();
    } else {
      animateButtonWidth(260);
      setIsPlaying(true);
      playSound();
      animateWords();
      startGlow();
      startBorderPulse();
    }
  };

  const resetScreen = () => {
    setIsPlaying(false);
    glowAnim.stopAnimation();
    borderPulseAnim.stopAnimation();
    borderPulseAnim.setValue(0);
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });

    return () => {
      if (sound) sound.unloadAsync();
      glowAnim.stopAnimation();
      borderPulseAnim.stopAnimation();
    };
  }, []);

  const ringGlow = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 18],
  });

  const ringOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const borderColor = borderPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255, 255, 255, 0.6)", "rgba(139, 92, 246, 1)"],
  });

  const shadowColor = borderPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(15, 14, 14, 0.6)", "rgba(139, 92, 246, 1)"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.glowRing,
          {
            shadowRadius: ringGlow,
            shadowOpacity: ringOpacity,
            width: widthAnim,
            borderColor: borderColor,
            shadowColor: shadowColor,
            borderWidth: isPlaying ? 3 : 0,
          },
        ]}
      >
        <LinearGradient
          colors={["#9a4dff", "#00bfff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.button, { width: "100%" }]}
        >
          <TouchableOpacity
            onPress={handleToggle}
            style={styles.touchableArea}
            activeOpacity={0.8}
            accessible
            accessibilityLabel={isPlaying ? "Stop voice" : "Play voice"}
          >
            <Text style={styles.buttonText}>
              {isPlaying ? "Stop" : "Guide"}
            </Text>
            <Image
              source={require("./../../Images/map.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      {isPlaying && (
        <View style={styles.textContainer}>
          <View style={styles.line}>
            {subtitleWords.map((word, index) => (
              <Animated.Text
                key={`subtitle-${index}`}
                style={[styles.subtitle, { opacity: fadeAnims[index] }]}
              >
                {word + " "}
              </Animated.Text>
            ))}
          </View>

          <View style={styles.line}>
            {titleWords.map((word, index) => (
              <Animated.Text
                key={`title-${index}`}
                style={[
                  styles.title,
                  { opacity: fadeAnims[subtitleWords.length + index] },
                ]}
              >
                {word + " "}
              </Animated.Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    elevation: 19,
    shadowColor: "black",
    paddingHorizontal: 20,
  },
  glowRing: {
    backgroundColor: "#8b5cf6",
    height: 45,
    top: -40,
    borderRadius: 999,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  button: {
    height: "100%",
    borderRadius: 999,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  touchableArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
    fontWeight: "600",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 6,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  line: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 4,
  },
  subtitle: {
    color: "#555",
    fontSize: 20,
    top: -10,
  },
  title: {
    color: "#000",
    fontSize: 28,
    fontWeight: "bold",
    top: -10,
  },
});

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../button/Button";

const { width, height } = Dimensions.get("window");

export default function AnimalSlider() {
  const [animals, setAnimals] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const soundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const res = await fetch(
          "https://project-x-five-smoky.vercel.app/api/laptop"
        );
        const data = await res.json();
        setAnimals(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching animals:", err);
        setLoading(false);
      }
    }
    fetchAnimals();
  }, []);

  const startWaveAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../audio/temple.mp3"),
        { isLooping: true, volume: 1.0 }
      );
      soundRef.current = sound;
    }
    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    async function loadClickSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../../audio/click.mp3")
      );
      clickSoundRef.current = sound;
    }
    loadClickSound();

    return () => {
      if (clickSoundRef.current) {
        clickSoundRef.current.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    if (soundRef.current && !isMuted) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
      startWaveAnimation();
    }
  };

  const pauseSound = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const toggleMute = async () => {
    const shouldMute = !isMuted;
    setIsMuted(shouldMute);
    if (soundRef.current) {
      await soundRef.current.setIsMutedAsync(shouldMute);
      if (shouldMute) {
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
        startWaveAnimation();
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (soundRef.current && !isMuted) {
        soundRef.current.playAsync();
        setIsPlaying(true);
        startWaveAnimation();
      }

      const interval = setInterval(() => {
        if (animals.length > 0) {
          setSelectedIndex((prev) => (prev + 1) % animals.length);
        }
      }, 5000);

      return () => {
        clearInterval(interval);
        if (soundRef.current) {
          soundRef.current.pauseAsync();
          setIsPlaying(false);
        }
      };
    }, [isMuted, animals])
  );

  const playClickSound = async () => {
    try {
      if (clickSoundRef.current) {
        await clickSoundRef.current.replayAsync();
      }
    } catch (e) {
      console.log("Click sound error", e);
    }
  };

  const prevAnimal = async () => {
    await playClickSound();
    setSelectedIndex((prev) => (prev === 0 ? animals.length - 1 : prev - 1));
  };

  const nextAnimal = async () => {
    await playClickSound();
    setSelectedIndex((prev) => (prev === animals.length - 1 ? 0 : prev + 1));
  };

  const selectAnimal = async (index) => {
    await playClickSound();
    setSelectedIndex(index);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <LottieView
          source={require("../../animation/Animation - 1746197477833.json")}
          autoPlay
          loop
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            marginTop: "50%",
          }}
        />
      </View>
    );
  }

  const selected = animals[selectedIndex];

  return (
    <SafeAreaView style={styles.safe}>
      <Animatable.Image
        key={selected._id}
        source={{ uri: selected.images[0] }}
        style={styles.background}
        resizeMode="cover"
        animation="fadeInUp"
        duration={600}
      />

      <View style={styles.gradientOverlay} />
      <View style={styles.darkenOverlay} />

      <View style={styles.container}>
        <Animatable.View
          key={`text-${selected._id}`}
          animation="fadeInLeft"
          duration={600}
          style={styles.textContent}
        >
          <View
            style={{
              backgroundColor: "#ffffff30",
              paddingVertical: 8,
              paddingHorizontal: 12,
              // width: 100,
              borderRadius: 8,
            }}
          >
            <Text style={styles.brand}>{selected.traveler}</Text>
            <Text style={styles.title}>{selected.title}</Text>
            <Text style={styles.subtitle}>{selected.price}</Text>
          </View>

          <Text style={styles.description}>{selected.place}</Text>

          <View style={styles.audioControls}>
            <TouchableOpacity onPress={toggleMute} style={styles.muteButton}>
              <MaterialIcons
                name={isMuted ? "volume-off" : "volume-up"}
                size={28}
                color="#000"
              />
            </TouchableOpacity>

            {isPlaying && (
              <Animated.View
                style={[
                  styles.wave,
                  {
                    transform: [
                      {
                        scale: waveAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.5],
                        }),
                      },
                    ],
                  },
                ]}
              />
            )}
          </View>

          <View style={styles.buttons}>
            <Link href={`/laptop-details/${selected._id}`} asChild>
              <TouchableOpacity style={styles.btnPrimary}>
                <Button />
              </TouchableOpacity>
            </Link>
          </View>
        </Animatable.View>

        <View style={styles.slider}>
          <TouchableOpacity onPress={prevAnimal} style={styles.navButton}>
            <Entypo name="chevron-left" size={28} color="white" />
          </TouchableOpacity>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardScroll}
          >
            {animals.map((item, index) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => selectAnimal(index)}
                style={[
                  styles.card,
                  selected._id === item._id && styles.cardSelected,
                ]}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.place}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={nextAnimal} style={styles.navButton}>
            <Entypo name="chevron-right" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.dots}>
          {animals.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === selectedIndex && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  background: {
    position: "absolute",
    width,
    height,
    top: 0,
    left: 0,
    zIndex: 0,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  darkenOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    zIndex: 5,
    paddingVertical: 40,
  },
  textContent: {
    paddingHorizontal: 20,
    maxWidth: 420,
  },
  brand: {
    color: "#000",
    fontWeight: "bold",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: 22,
    marginBottom: 3,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  subtitle: {
    color: "red",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 3,
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  description: {
    color: "white",
    marginTop: 12,
    fontSize: 26,
    marginBottom: 10,
    elevation: 10,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  buttons: { flexDirection: "row", gap: 10, marginTop: 16 },
  btnPrimary: {
    paddingTop: 20,
  },
  btnPrimaryText: { color: "#000", fontWeight: "600" },
  slider: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    top: 90,
  },
  navButton: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 100,
    marginHorizontal: 4,
  },
  cardScroll: { paddingHorizontal: 10 },
  card: {
    width: 140,
    marginHorizontal: 5,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: "#a855f7",
  },
  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
  },
  cardTitle: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  dots: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#999",
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
  },
  centered: {
    flex: 1,
    backgroundColor: "#000",
  },
  audioControls: {
    position: "absolute",
    bottom: 100,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  muteButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 100,
  },
  wave: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#34D399",
    marginTop: 6,
  },
});

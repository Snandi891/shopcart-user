import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function AnimalSlider() {
  const [animals, setAnimals] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const soundRef = useRef(null);

  // Fetch animal data from API
  useEffect(() => {
    async function fetchAnimals() {
      try {
        const res = await fetch(
          "https://project-x-five-smoky.vercel.app/api/shoes"
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

  // Load single sound once
  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("./../../audio/sound-1-167181.mp3")
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

  // Play sound on slide change
  useEffect(() => {
    if (soundRef.current && animals.length > 0) {
      soundRef.current.replayAsync();
    }
  }, [selectedIndex]);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % animals.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [animals]);

  const prevAnimal = () => {
    setSelectedIndex((prev) => (prev === 0 ? animals.length - 1 : prev - 1));
  };

  const nextAnimal = () => {
    setSelectedIndex((prev) => (prev === animals.length - 1 ? 0 : prev + 1));
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
          <Text style={styles.brand}>LUNDEV</Text>
          <Text style={styles.title}>DESIGN SLIDER</Text>
          <Text style={styles.subtitle}>ANIMAL</Text>
          <Text style={styles.description}>{selected.place}</Text>
          <View style={styles.buttons}>
            <Link href={`/shoes-details/${selected._id}`} asChild>
              <TouchableOpacity style={styles.btnPrimary}>
                <Text style={styles.btnPrimaryText}>SEE MORE</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity style={styles.btnOutline}>
              <Text style={styles.btnOutlineText}>SUBSCRIBE</Text>
            </TouchableOpacity>
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
                onPress={() => setSelectedIndex(index)}
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
              style={[
                styles.dot,
                index === selectedIndex ? styles.activeDot : {},
              ]}
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
    width: width,
    height: height,
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
  brand: { color: "#ccc", letterSpacing: 2, fontSize: 12, marginBottom: 6 },
  title: { color: "#fff", fontSize: 34, fontWeight: "bold" },
  subtitle: {
    color: "#f97316",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 6,
  },
  description: {
    color: "white",
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttons: { flexDirection: "row", gap: 10, marginTop: 16 },
  btnPrimary: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnPrimaryText: { color: "#000", fontWeight: "600" },
  btnOutline: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnOutlineText: { color: "#fff", fontWeight: "600" },
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
  cardDesc: { color: "#ccc", fontSize: 12 },
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
});

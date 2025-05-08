import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import {
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Link } from "expo-router";
import { moderateScale } from "react-native-size-matters";
import LottieView from "lottie-react-native";

const { width, height: screenHeight } = Dimensions.get("window");

function Traveler() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const imageSize = 120;
  const centerOffset = width / 2 - imageSize / 2;

  const animationStyle = useCallback(
    (value) => {
      "worklet";

      const visibleRange = 5;
      const inputRange = Array.from(
        { length: visibleRange * 2 + 1 },
        (_, i) => i - visibleRange
      );

      const itemGap = interpolate(
        value,
        inputRange,
        inputRange.map((i) => i * 6)
      );

      const translateX =
        interpolate(value, [-1, 0, 1], [-imageSize, 0, imageSize]) +
        centerOffset -
        itemGap;

      const translateY = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [90, 55, 40, 55, 90]
      );

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.8, 0.85, 1.1, 0.85, 0.8]
      );

      return {
        transform: [{ translateX }, { translateY }, { scale }],
      };
    },
    [centerOffset]
  );

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    const endpoints = [
      "https://project-x-five-smoky.vercel.app/api/banner",
      "https://project-x-five-smoky.vercel.app/api/shirt",
      "https://project-x-five-smoky.vercel.app/api/jins",
      "https://project-x-five-smoky.vercel.app/api/phone",
      "https://project-x-five-smoky.vercel.app/api/laptop",
      "https://project-x-five-smoky.vercel.app/api/products",
    ];

    try {
      const responses = await Promise.all(
        endpoints.map(async (url) => {
          try {
            const response = await axios.get(url);
            return response.data;
          } catch (error) {
            console.error(`Error fetching from ${url}:`, error);
            return [];
          }
        })
      );

      const combinedData = responses.flatMap((res) =>
        res.map((item) => ({
          traveler: item.traveler,
          description: item.description || "",
          price: item.price || 0,
          images: item.images || [],
        }))
      );

      const uniqueData = Array.from(
        new Map(combinedData.map((item) => [item.traveler, item])).values()
      );

      setProducts(uniqueData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <LottieView
        source={require("../../animation/Animation - 1746201883317.json")}
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          marginTop: "50%",
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: moderateScale(20),
        }}
      >
        <View
          style={{
            elevation: 10,
            backgroundColor: "white",
            padding: moderateScale(4),
            borderRadius: 10,
            marginBottom: moderateScale(10),
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>All Traveler</Text>
        </View>

        <Carousel
          width={imageSize}
          height={imageSize + moderateScale(30)}
          autoPlay
          autoPlayInterval={2000}
          loop
          data={products}
          customAnimation={animationStyle}
          style={{ width: width, height: screenHeight * 0.5 }}
          renderItem={({ item }) => (
            <Link
              href={`/traveler-details/${encodeURIComponent(item.traveler)}`}
              asChild
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: moderateScale(10),
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    borderRadius: imageSize / 2,
                    overflow: "hidden",
                    borderWidth: 2,
                    borderColor: "#ccc",
                    width: imageSize,
                    height: imageSize,
                    justifyContent: "center",
                    elevation: 10,
                    shadowColor: "blue",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item?.images[0] }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>
                <Text
                  style={{
                    marginTop: moderateScale(8),
                    fontSize: 14,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {item.traveler}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      </ScrollView>
    </View>
  );
}

export default Traveler;

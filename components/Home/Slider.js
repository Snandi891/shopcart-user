import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  useSharedValue,
  Extrapolation,
  interpolate,
} from "react-native-reanimated";
import { Link } from "expo-router";

import Carousel, { Pagination } from "react-native-reanimated-carousel";
import * as Animatable from "react-native-animatable";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import LottieView from "lottie-react-native"; // Import Lottie

const width = Dimensions.get("window").width;

function Slider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state
  const ref = useRef(null);
  const progress = useSharedValue(0);

  const onPressPagination = (index) => {
    if (ref.current) {
      ref.current.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const URL = `https://project-x-five-smoky.vercel.app/api/banner`;
    try {
      const response = await axios.get(URL);
      if (response.data.length === 0) {
        setError(true); // No data found
      } else {
        setProducts(response.data);
        setLoading(false); // Data fetched
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(true); // Error fetching data
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("../../animation/Animation - 1746201883317.json")} // Add your Lottie loading animation file
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Wait Sir, we are updating...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        autoPlayInterval={4000}
        data={products}
        height={240}
        autoPlay={true}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={width}
        style={{ width: width }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.89,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        ref={ref}
        renderItem={({ item, index }) => (
          <Animatable.View
            animation="slideInUp"
            duration={1000 + (index + 1) * 10}
            style={{
              flex: 1,
              justifyContent: "center",
              borderRadius: 20,
              marginTop: moderateScale(7),
              backgroundColor: "white",
            }}
          >
            <Link href={`/slider-details/${item._id}`} asChild>
              <TouchableOpacity>
                <View
                  style={{
                    position: "absolute",
                    height: "100%",
                    zIndex: 1,
                    width: "100%",
                    backgroundColor: "transparent",
                    justifyContent: "flex-end",
                    padding: moderateScale(10),
                  }}
                >
                  <View
                    style={{
                      padding: moderateScale(10),
                      borderRadius: moderateScale(10),
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "800",
                        marginLeft: moderateScale(10),
                        paddingTop: moderateScale(5),
                        maxWidth: 200,
                        fontSize: 18,
                      }}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={{
                        alignItems: "flex-end",
                        paddingTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "#00ffff",
                          padding: moderateScale(5),
                          borderRadius: 7,
                          color: "black",
                          fontWeight: "600",
                        }}
                      >
                        {item.price}
                      </Text>
                    </View>
                  </View>
                </View>

                <Image
                  source={{ uri: item?.images[0] }}
                  style={{
                    width: width,
                    height: "100%",
                    borderRadius: 20,
                    backgroundColor: "white",
                  }}
                />
              </TouchableOpacity>
            </Link>
          </Animatable.View>
        )}
      />

      <Pagination.Custom
        progress={progress}
        data={products}
        size={10}
        dotStyle={{
          borderRadius: 16,
          width: 15,
          height: 3,
          backgroundColor: "red",
        }}
        activeDotStyle={{
          borderRadius: 4,
          width: 60,
          height: 7,
          overflow: "hidden",
          backgroundColor: "black",
        }}
        containerStyle={{
          gap: 5,
          marginBottom: moderateScale(10),
          alignItems: "center",
          height: 10,
        }}
        horizontal
        onPress={onPressPagination}
        customReanimatedStyle={(progress, index, length) => {
          let val = Math.abs(progress - index);
          if (index === 0 && progress > length - 1) {
            val = Math.abs(progress - length);
          }

          return {
            transform: [
              {
                translateY: interpolate(
                  val,
                  [0, 1],
                  [0, 0],
                  Extrapolation.CLAMP
                ),
              },
            ],
          };
        }}
      />
    </View>
  );
}

export default Slider;

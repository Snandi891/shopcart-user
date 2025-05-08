import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "expo-router";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";

const AnimatedBn = Animatable.createAnimatableComponent(TouchableOpacity);
const Width = Dimensions.get("window").width;

const LaptopBusiness = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const URL = `https://project-x-five-smoky.vercel.app/api/laptop`;
      const response = await axios.get(URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching laptops:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {products?.length > 0 && !isLoading ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ index, item }) => (
            <Link href={`/laptop-details/${item._id}`} asChild>
              <AnimatedBn
                animation="slideInLeft"
                duration={1000 + (index + 1) * 100}
                style={{
                  width: Width * 0.94,
                  alignSelf: "center",
                  height: Width * 0.6,
                  overflow: "hidden",
                  borderRadius: 20,
                  margin: moderateScale(10),
                }}
              >
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
                      backgroundColor: "#edeff561",
                      borderRadius: moderateScale(10),
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../../Images/tag.png")}
                        style={{
                          height: verticalScale(30),
                          width: scale(30),
                        }}
                      />
                      <Text
                        style={{
                          fontSize: moderateScale(17),
                          color: "black",
                          fontWeight: "700",
                          marginLeft: moderateScale(10),
                          paddingTop: moderateScale(7),
                        }}
                      >
                        {item?.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: moderateScale(5),
                      }}
                    >
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          color: "black",
                          fontWeight: "500",
                          marginLeft: moderateScale(10),
                          paddingTop: moderateScale(5),
                          maxWidth: 200,
                          fontSize: moderateScale(15),
                        }}
                      >
                        {item?.short}
                      </Text>

                      <Text
                        style={{
                          backgroundColor: "#00ffff",
                          padding: moderateScale(10),
                          borderRadius: 7,
                          fontSize: moderateScale(20),
                          fontWeight: "600",
                          color: "black",
                        }}
                      >
                        {item?.price}
                      </Text>
                    </View>
                  </View>
                </View>
                <Image
                  source={{ uri: item?.images[0] }}
                  style={{ width: "100%", height: "100%" }}
                />
              </AnimatedBn>
            </Link>
          )}
        />
      ) : isLoading ? (
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
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: moderateScale(2),
            margin: moderateScale(10),
          }}
        >
          <Text style={{ fontSize: moderateScale(20), fontWeight: "bold" }}>
            No Product Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default LaptopBusiness;

const styles = StyleSheet.create({});

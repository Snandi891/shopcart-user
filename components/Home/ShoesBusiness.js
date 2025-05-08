import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "expo-router";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";

const AnimatedBn = Animatable.createAnimatableComponent(TouchableOpacity);

const ShoesBusiness = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const URL = `https://project-x-five-smoky.vercel.app//api/shoes`;
      const response = await axios.get(URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching shoes:", error);
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
            <Link href={`/shoes-details/${item._id}`} asChild>
              <AnimatedBn
                animation={"slideInLeft"}
                duration={1000 + (index + 1) * 100}
                style={{
                  padding: moderateScale(10),
                  margin: moderateScale(10),
                  borderRadius: 15,
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <View
                  style={{
                    width: 163,
                    height: 160,
                    borderRadius: 19,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item?.images[0] }}
                    style={{
                      width: "130",
                      height: "100%",
                      resizeMode: "contain",
                    }}
                  />
                </View>

                <View style={{ gap: 7, flex: 1 }}>
                  <Text style={{ fontWeight: "800", fontSize: 16 }}>
                    {item.title}
                  </Text>
                  <Text>{"Price : " + item.price}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        paddingTop: moderateScale(10),
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        source={require("../../Images/star.png")}
                        style={{
                          width: scale(15),
                          height: verticalScale(15),
                        }}
                      />
                      <Text
                        style={{
                          fontSize: moderateScale(15),
                          fontWeight: "600",
                          paddingLeft: moderateScale(10),
                          paddingBottom: moderateScale(5),
                        }}
                      >
                        4.5
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      backgroundColor: "green",
                      padding: moderateScale(10),
                      textAlign: "center",
                      color: "#fff",
                      fontSize: moderateScale(15),
                      borderRadius: 15,
                    }}
                  >
                    Buy Now
                  </Text>
                </View>
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

export default ShoesBusiness;

const styles = StyleSheet.create({});

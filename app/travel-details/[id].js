import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import AnimatedTost from "../../animated/AnimatedTost";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  addToWishlist,
} from "../../components/redux/actions/Actions";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native";
import { Alert } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";

const Width = Dimensions.get("window").width;
const AnimatedBn = Animatable.createAnimatableComponent(TouchableOpacity);

const travel = () => {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  // console.log("Product Id", id);

  const [product, setProduct] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const endpoints = [
          "https://project-x-five-smoky.vercel.app/api/banner",
          "https://project-x-five-smoky.vercel.app/api/shirt",
          "https://project-x-five-smoky.vercel.app/api/jins",
          "https://project-x-five-smoky.vercel.app/api/phone",
          "https://project-x-five-smoky.vercel.app/api/laptop",
          "https://project-x-five-smoky.vercel.app/api/products",
        ];

        const responses = await Promise.all(
          endpoints.map((url) => axios.get(url))
        );

        const allProducts = responses.flatMap((res) => res.data);

        const found = allProducts.find((item) => item._id === id);

        setProduct(found || null);
      } catch (err) {
        console.error("Error fetching product by ID:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductById();
    }
  }, [id]);

  const router = useRouter();

  const updateModel = (product) => {
    setShowModel(true);
    setSelectedUser(product);
  };

  const showAlert = () => {
    Alert.alert(
      "Hello!",
      "Your packege is added in wishlist",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>No product found with this ID.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <Animatable.View
          animation="fadeInUpBig"
          duration={1200}
          style={{
            width: "100%",
            height: Width * 0.9,
            overflow: "hidden",
            marginRight: moderateScale(20),
            borderBottomRightRadius: moderateScale(19),
            borderBottomLeftRadius: moderateScale(19),
          }}
        >
          <View
            style={{
              position: "absolute",
              height: "100%",
              zIndex: 1,
              width: "100%",
              backgroundColor: "transparent",
              justifyContent: "space-between",
              padding: moderateScale(10),
            }}
          >
            <View
              style={{
                padding: moderateScale(5),
                borderRadius: moderateScale(50),
                flexDirection: "row",
                zIndex: 1,
                justifyContent: "space-between",
                padding: moderateScale(10),
              }}
            >
              <AnimatedBn
                animation={"slideInLeft"}
                delay={1000}
                duration={1000}
                onPress={() => router.back()}
                style={{}}
              >
                <Ionicons
                  name="arrow-back-circle-sharp"
                  size={34}
                  color="black"
                />
              </AnimatedBn>
              <AnimatedBn
                animation={"slideInRight"}
                delay={1000}
                duration={1000}
                onPress={() => {
                  dispatch(addToWishlist(product));
                }}
              >
                <Ionicons name="heart-outline" size={34} color="white" />
              </AnimatedBn>
            </View>
            <View
              style={{
                margin: moderateScale(10),
                backgroundColor: "#edeff561",
                borderRadius: moderateScale(10),
                padding: moderateScale(10),
                marginBottom: moderateScale(10),
              }}
            >
              <Animatable.View
                animation={"fadeInLeft"}
                delay={1000}
                duration={2000}
                // entering={FadeInLeft.delay(1000).duration(2000)}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Image
                  source={require("../../Images/location.png")}
                  style={{ height: verticalScale(30), width: scale(30) }}
                />
                <Text
                  style={{
                    fontSize: moderateScale(23),
                    color: "black",
                    fontWeight: "700",
                    marginLeft: moderateScale(8),
                    borderColor: "white",
                    borderRadius: 0.2,
                    paddingTop: moderateScale(7),
                  }}
                >
                  {product?.title}
                </Text>
              </Animatable.View>
              <Animatable.View
                animation={"fadeInLeft"}
                delay={1000}
                duration={2000}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: moderateScale(7),
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../Images/details.png")}
                  style={{
                    height: verticalScale(25),
                    width: scale(25),
                    paddingTop: moderateScale(6),
                  }}
                />
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    color: "white",
                    fontWeight: "400",
                    marginLeft: moderateScale(10),
                    marginLeft: moderateScale(6),
                  }}
                >
                  {product?.short}
                </Text>
              </Animatable.View>
            </View>
          </View>
          <Image
            source={{ uri: product?.images[0] }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </Animatable.View>

        <View
          style={{
            padding: moderateScale(15),
            backgroundColor: "#fff",
            marginBottom: moderateScale(10),
          }}
        >
          <Animatable.View
            animation={"fadeInLeft"}
            delay={2000}
            duration={1000}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ padding: moderateScale(10) }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: moderateScale(20), fontWeight: "700" }}
                >
                  Only{" "}
                </Text>
                <Text
                  className="text-gray-500"
                  style={{
                    fontSize: moderateScale(23),
                    fontWeight: "700",
                    color: "green",
                  }}
                >
                  ₹{+product?.price}
                </Text>
                <Text
                  className="text-red-700"
                  style={{
                    fontSize: moderateScale(17),
                    paddingTop: moderateScale(5),
                  }}
                >
                  /person
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                padding: moderateScale(10),
              }}
            >
              <Text style={{ fontSize: moderateScale(17), fontWeight: "bold" }}>
                Saller Rating
              </Text>
              <View
                style={{
                  // paddingLeft: moderateScale(10),
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../Images/star.png")}
                  style={{ width: scale(15), height: verticalScale(15) }}
                />
                <Image
                  source={require("../../Images/star.png")}
                  style={{ width: scale(15), height: verticalScale(15) }}
                />
                <Image
                  source={require("../../Images/star.png")}
                  style={{ width: scale(15), height: verticalScale(15) }}
                />
                <Image
                  source={require("../../Images/star.png")}
                  style={{ width: scale(15), height: verticalScale(15) }}
                />
                <Text
                  style={{
                    fontSize: moderateScale(17),
                    fontWeight: "600",
                    paddingLeft: moderateScale(10),
                    paddingBottom: moderateScale(5),
                  }}
                  className="text-green-500"
                >
                  4.5
                </Text>
              </View>
            </View>
          </Animatable.View>
          <LinearGradient
            colors={["aqua", "white"]}
            style={{
              fontFamily: "outfit",
              // backgroundColor: "green",
              padding: moderateScale(10),
              margin: moderateScale(4),
              borderRadius: moderateScale(25),

              borderColor: "#000",
              elevation: 30,
              color: "#fff",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                padding: moderateScale(2),
                fontSize: moderateScale(20),
                color: "black",
                fontWeight: "700",
              }}
            >
              -----:Hurry Up Guyes:-----
            </Text>
          </LinearGradient>

          <Animatable.View
            animation={"fadeInLeft"}
            delay={2000}
            duration={1000}
            style={{
              paddingTop: moderateScale(10),
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                paddingTop: moderateScale(7),
                fontWeight: "600",
              }}
            >
              Packege Price :
            </Text>
            <Text
              style={{
                fontSize: 19,
                paddingTop: moderateScale(7),
                fontWeight: "800",
                color: "green",
              }}
            >
              {"   ₹" + product?.offer}
            </Text>
          </Animatable.View>
          <Animatable.View
            animation={"fadeInLeft"}
            delay={2200}
            duration={1000}
            style={{
              paddingTop: moderateScale(10),
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: moderateScale(20),
                paddingTop: moderateScale(7),
                fontWeight: "600",
              }}
            >
              Limited Offer :
            </Text>
            <Text
              style={{
                fontSize: 19,
                paddingTop: moderateScale(7),
                fontWeight: "800",
                color: "red",
              }}
            >
              {"  ₹" + product?.price}
            </Text>
          </Animatable.View>
          <View
            style={{
              marginBottom: moderateScale(20),
              marginTop: moderateScale(7),
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  shadowColor: "black",
                  shadowOffset: { width: 5, height: verticalScale(7) },
                  shadowRadius: 5,
                  shadowOpacity: 0.2,
                  padding: moderateScale(5),
                  borderRadius: 5,
                  marginRight: moderateScale(20),
                  elevation: 10,
                }}
              >
                <Image
                  source={require("../../Images/processing.png")}
                  style={{
                    height: verticalScale(45),
                    width: scale(45),
                    backgroundColor: "#00ffff",
                    borderRadius: 30,
                  }}
                />
              </View>
              <View style={{ marginRight: moderateScale(20) }}>
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: moderateScale(5),
                    textTransform: "uppercase",
                  }}
                >
                  Duration
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {product?.days}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  shadowColor: "black",
                  shadowOffset: { width: 5, height: verticalScale(7) },
                  shadowRadius: 5,
                  shadowOpacity: 0.2,
                  padding: moderateScale(7),
                  borderRadius: 5,
                  marginRight: moderateScale(10),
                  elevation: 10,
                }}
              >
                <Image
                  source={require("../../Images/destination.png")}
                  style={{
                    height: verticalScale(45),
                    width: scale(45),
                    backgroundColor: "#00ffff",
                    borderRadius: 30,
                    padding: moderateScale(10),
                  }}
                />
              </View>
              <View style={{ marginRight: moderateScale(20) }}>
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: moderateScale(5),
                    textTransform: "uppercase",
                  }}
                >
                  Travel Mode
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {product?.mode}
                </Text>
              </View>
            </View>
          </View>

          <Animatable.View
            animation={"fadeInLeft"}
            delay={4000}
            duration={1000}
            style={{
              paddingTop: moderateScale(10),
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
                elevation: 20,
                backgroundColor: "white",
                borderRadius: moderateScale(10),
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  fontWeight: "bold",
                  padding: moderateScale(10),
                  color: "black",
                  fontSize: moderateScale(17),
                }}
              >
                Traveler Name :-
              </Text>
            </View>
            <Text
              style={{
                fontSize: moderateScale(17),
                paddingTop: moderateScale(7),
                paddingLeft: moderateScale(4),
                fontWeight: "600",
                color: "black",
              }}
            >
              {" " + product?.traveler}
            </Text>
          </Animatable.View>

          <Animatable.View
            animation={"fadeInLeft"}
            delay={4200}
            duration={1000}
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              paddingTop: moderateScale(15),
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                backgroundColor: "#f1e4f561",
                padding: moderateScale(10),
                color: "black",
                fontSize: moderateScale(17),
                fontWeight: "bold",
                borderRadius: moderateScale(10),
                paddingTop: moderateScale(10),
              }}
            >
              Food's by This Packege :-
            </Text>
          </Animatable.View>
          <Animatable.Text
            animation={"fadeInLeft"}
            delay={4400}
            duration={1000}
            style={{
              fontSize: moderateScale(15),
              padding: moderateScale(7),

              color: "black",
            }}
          >
            {product?.food}
          </Animatable.Text>
          <Animatable.View
            animation={"fadeInLeft"}
            delay={4600}
            duration={1000}
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                backgroundColor: "#f1e4f561",
                padding: moderateScale(10),
                color: "black",
                fontSize: moderateScale(17),
                borderRadius: moderateScale(10),
                fontWeight: "bold",
                paddingTop: moderateScale(10),
              }}
            >
              Nearby Places :-
            </Text>
          </Animatable.View>

          <Animatable.Text
            animation={"fadeInLeft"}
            delay={4800}
            duration={1000}
            style={{
              padding: moderateScale(10),
              marginBottom: moderateScale(5),
              fontSize: moderateScale(15),
            }}
          >
            {product?.nearby}
          </Animatable.Text>

          <Animatable.View
            animation={"fadeInLeft"}
            delay={5000}
            duration={1000}
            style={{
              display: "flex",
              flexDirection: "row",
              elevation: 10,
              backgroundColor: "white",
              borderRadius: moderateScale(10),
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  fontWeight: "bold",
                  padding: moderateScale(10),
                  color: "black",
                  fontSize: moderateScale(17),
                }}
              >
                Traveler's Phone No.:-
              </Text>
            </View>
            <Text
              style={{
                fontSize: moderateScale(17),
                paddingTop: moderateScale(7),
                fontWeight: "600",
                color: "black",
              }}
            >
              {" " + product?.phone}
            </Text>
          </Animatable.View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingTop: moderateScale(20),
              paddingBottom: moderateScale(10),
            }}
          >
            {/* First Button */}
            <TouchableOpacity
              onPress={() => updateModel(product)}
              style={{ alignItems: "center" }}
            >
              <View
                style={{
                  position: "relative",
                  width: moderateScale(150),
                  height: moderateScale(50), // Increased height
                  borderRadius: moderateScale(12),
                  overflow: "hidden",
                }}
              >
                <LottieView
                  source={require("../../animation/Animation - 1746430298706.json")}
                  autoPlay
                  loop
                  resizeMode="cover"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: moderateScale(24), // Increased font size
                    }}
                  >
                    Book Now
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Second Button */}
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                dispatch(addItemToCart(product));
                showAlert();
              }}
            >
              <View
                style={{
                  position: "relative",
                  width: moderateScale(150),
                  height: moderateScale(50), // Increased height
                  borderRadius: moderateScale(12),
                  overflow: "hidden",
                }}
              >
                <LottieView
                  source={require("../../animation/Animation - 1746427538924.json")}
                  autoPlay
                  loop
                  resizeMode="cover"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: moderateScale(24), // Increased font size
                    }}
                  >
                    Add Cart
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: moderateScale(7),
              paddingBottom: 7,
            }}
          >
            <View>
              <Image
                source={require("../../Images/images.png")}
                style={{ height: verticalScale(35), width: scale(35) }}
              />
            </View>
            <View
              style={{
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  padding: moderateScale(10),
                  color: "black",
                  fontSize: moderateScale(15),
                }}
              >
                Some Photos about this destination:-
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: moderateScale(20) }}
          >
            {[0, 2, 3, 4].map((index, i) => (
              <View key={index} style={{ flexDirection: "row" }}>
                <View style={styles.containers}>
                  <Animatable.View
                    animation="fadeInUp"
                    delay={2000 * (i + 1)}
                    duration={1000}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.7)",
                      padding: moderateScale(3),
                      borderRadius: moderateScale(15),
                    }}
                  >
                    <Image
                      source={{ uri: product?.images[index] }}
                      style={styles.coverImage}
                    />
                  </Animatable.View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View>
            <Animatable.View
              animation="fadeInDown"
              delay={4500}
              duration={1000}
              style={{
                marginTop: moderateScale(70),
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {/* All your dot and icon Image Views go here */}

              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                }}
              >
                <Image
                  source={require("../../Images/location.png")}
                  style={{ height: verticalScale(35), width: scale(35) }}
                />
              </View>

              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                  bottom: moderateScale(20),
                }}
              >
                <Image
                  source={require("../../Images/dot.png")}
                  style={{ height: verticalScale(7), width: scale(7) }}
                />
              </View>

              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                  bottom: moderateScale(38),
                }}
              >
                <Image
                  source={require("../../Images/dot.png")}
                  style={{ height: verticalScale(7), width: scale(7) }}
                />
              </View>
              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                  bottom: moderateScale(50),
                }}
              >
                <Image
                  source={require("../../Images/dot.png")}
                  style={{ height: verticalScale(7), width: scale(7) }}
                />
              </View>
              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                  bottom: moderateScale(58),
                }}
              >
                <Image
                  source={require("../../Images/dot.png")}
                  style={{ height: verticalScale(7), width: scale(7) }}
                />
              </View>
              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                  bottom: moderateScale(64),
                }}
              >
                <Image
                  source={require("../../Images/start.png")}
                  style={{ height: verticalScale(20), width: 20 }}
                />
              </View>
              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                  bottom: moderateScale(58),
                }}
              >
                <Image
                  source={require("../../Images/dot.png")}
                  style={{ height: verticalScale(7), width: scale(7) }}
                />
              </View>
              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                  bottom: moderateScale(50),
                }}
              >
                <Image
                  source={require("../../Images/dot.png")}
                  style={{ height: verticalScale(7), width: scale(7) }}
                />
              </View>
              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                  bottom: moderateScale(38),
                }}
              >
                <Image
                  source={require("../../Images/dot.png")}
                  style={{ height: verticalScale(7), width: scale(7) }}
                />
              </View>
              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                  bottom: moderateScale(20),
                }}
              >
                <Image
                  source={require("../../Images/dot.png")}
                  style={{ height: verticalScale(7), width: scale(7) }}
                />
              </View>

              <View
                style={{
                  padding: moderateScale(3),
                  borderRadius: moderateScale(10),
                }}
              >
                <Image
                  source={require("../../Images/location.png")}
                  style={{ height: verticalScale(35), width: scale(35) }}
                />
              </View>
            </Animatable.View>

            <Animatable.View
              animation="fadeInUp"
              delay={5000}
              duration={1000}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: moderateScale(10),
              }}
            >
              <View
                style={{
                  borderRadius: moderateScale(10),
                  padding: moderateScale(3),
                  height: 80,
                  width: 80,
                }}
              >
                <Text>{product?.sroute}</Text>
              </View>
              <View
                style={{
                  borderRadius: moderateScale(10),
                  padding: moderateScale(3),
                  height: 80,
                  width: 80,
                }}
              >
                <Text>{product?.route}</Text>
              </View>
              <View
                style={{
                  borderRadius: moderateScale(10),
                  padding: moderateScale(3),
                  height: 80,
                  width: 80,
                }}
              >
                <Text>{product?.eroute}</Text>
              </View>
            </Animatable.View>
          </View>
          <Text
            style={{
              fontFamily: "outfit",
              backgroundColor: "#f1e4f561",
              padding: moderateScale(10),
              color: "black",
              fontSize: moderateScale(17),
              borderRadius: moderateScale(10),
              fontWeight: "bold",
              paddingTop: moderateScale(10),
            }}
          >
            All Details :-
          </Text>
          <Text
            style={{
              color: "dimgrey",
              fontSize: moderateScale(15),
              padding: moderateScale(10),
            }}
          >
            {product?.description}
          </Text>
        </View>
        <Modal visible={showModel} transparent={true}>
          <UserModel setShowModel={setShowModel} selectedUser={selectedUser} />
        </Modal>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  coverImage: {
    height: verticalScale(200),
    width: scale(270),
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0,7)",
  },
  containers: {
    padding: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

const UserModel = (props) => {
  const [visible, setVisible] = useState(false);
  const showTost = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  const postApiUrl = "https://project-x-five-smoky.vercel.app/api/order";

  const [responseMessage, setResponseMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ardhar, setArdhar] = useState("");
  const [error, setError] = useState("");
  const [ardharError, setArdharError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const validateArdhar = (text) => {
    const digitsOnly = text.replace(/[^0-9]/g, "");
    setArdhar(digitsOnly);

    if (digitsOnly.length !== 12) {
      setArdharError("Aadhaar  12 digits");
    } else {
      setArdharError("");
    }
  };

  // const validatePhone = (text) => {
  //   const digitsOnly = text.toString().replace(/[^0-9]/g, "");
  //   setPhone(digitsOnly);

  //   if (digitsOnly.length !== 10) {
  //     setError("Phone number 10 digits");
  //   } else {
  //     setError("");
  //   }
  // };

  const sendPostRequest = async () => {
    try {
      const data = {
        title: props.selectedUser.title,
        description: props.selectedUser.description,
        price: props.selectedUser.price,
        traveler: props.selectedUser.traveler,
        name: userData.name,
        email: userData.email,
        place: props.selectedUser.place,
        address: userData.address,
        phone: userData.phone,
        ardhar: ardhar,
        images: props.selectedUser.images[0],
      };

      const response = await fetch(postApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_TOKEN", // If required
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setResponseMessage(JSON.stringify(result));

      setTimeout(() => {
        props.setShowModel(false);
      }, 2000);

      // showTost();

      console.log("POST Success:", result);
      // alert("order Placed");
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error in sending request");
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const name = await AsyncStorage.getItem("NAME");
        const phone = await AsyncStorage.getItem("MOBILE");
        const address = await AsyncStorage.getItem("ADDRESS");
        const email = await AsyncStorage.getItem("EMAIL");
        setUserData({ name, phone, address, email });
      } catch (err) {
        console.log("Error loading user data:", err);
      }
    };
    loadUserData();
  }, []);

  // console.warn(props.selectedUser);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BlurView
        intensity={140}
        tint="systemUltraThinMaterialDark"
        style={{
          flex: 1,
          textAlign: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: moderateScale(2),
            borderRadius: moderateScale(10),
            shadowColor: "#000",
            shadowOpacity: 0.3,
            elevation: 5,
            margin: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              gap: 15,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{ uri: props.selectedUser.images[0] }}
              style={{
                width: 120,
                height: 160,
                resizeMode: "cover",
                marginTop: moderateScale(7),
                borderRadius: 20,
                backgroundColor: "#fff",
                alignSelf: "center",
                elevation: 10,
                shadowColor: "cyan",
              }}
            />
            <View style={{ gap: 10, paddingTop: moderateScale(10) }}>
              <Text
                numberOfLines={2}
                style={{
                  numberOfLines: 0.1,
                  ellipsizeMode: "tail",
                  maxWidth: 200,
                  fontSize: moderateScale(15),
                }}
              >
                {props.selectedUser.title}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  numberOfLines: 0.1,
                  ellipsizeMode: "tail",
                  maxWidth: 200,
                  fontSize: moderateScale(15),
                }}
              >
                {props.selectedUser.traveler}
              </Text>
              {/* 👇 Display Signup Data from AsyncStorage */}
              <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  User Info:
                </Text>
                <Text>Name: {userData.name}</Text>
                <Text>Phone: {userData.phone}</Text>
                <Text
                  numberOfLines={1}
                  style={{
                    numberOfLines: 0.1,
                    ellipsizeMode: "tail",
                    maxWidth: 200,
                  }}
                >
                  Address: {userData.address}
                </Text>
              </View>
              <View style={{ padding: moderateScale(10), marginRight: 10 }}>
                <Text style={{ fontSize: 18 }}>Enter your details</Text>

                {/* <TextInput
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: moderateScale(10),
                    marginBottom: moderateScale(10),
                    borderRadius: 5,
                  }}
                /> */}

                <TextInput
                  placeholder="Aadhaar number"
                  value={ardhar}
                  onChangeText={validateArdhar}
                  maxLength={12}
                  keyboardType="numeric"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: moderateScale(10),
                    marginBottom: moderateScale(10),
                    borderRadius: 5,
                  }}
                />
                {ardharError ? (
                  <Text style={{ color: "red" }}>{ardharError}</Text>
                ) : null}

                {/* <TextInput
                  placeholder="Phone"
                  value={phone}
                  onChangeText={validatePhone}
                  maxLength={10}
                  keyboardType="phone-pad"
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: moderateScale(10),
                    marginBottom: moderateScale(20),
                    borderRadius: 5,
                  }}
                /> */}
              </View>
              <Text style={{ fontSize: moderateScale(20), fontWeight: "bold" }}>
                Price : {" ₹ " + props.selectedUser.price}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              gap: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: moderateScale(10),
                padding: moderateScale(10),
                backgroundColor: "peru",
                marginTop: moderateScale(20),
                elevation: 10,
              }}
              onPress={() => props.setShowModel(false)}
            >
              <Text style={{ fontSize: moderateScale(20), fontWeight: "bold" }}>
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!error && !ardharError && ardhar) {
                  sendPostRequest();
                  showTost();
                } else {
                  setError("Please fill all fields correctly");
                }
              }}
              disabled={!!error || !ardhar}
              style={{
                borderRadius: moderateScale(10),
                padding: moderateScale(10),
                backgroundColor: !!error || !ardhar ? "gray" : "lime",
                marginTop: moderateScale(20),
                elevation: 10,
              }}
            >
              <Text style={{ fontSize: moderateScale(20), fontWeight: "bold" }}>
                Book Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
      <AnimatedTost
        visible={visible}
        type={"SUCSESS"}
        message={"Order Placed"}
      />
    </View>
  );
};

export default travel;
